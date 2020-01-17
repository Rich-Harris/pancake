/*
Adapted from https://github.com/d3/d3-quadtree
Released under BSD license
*/

class Quad {
	constructor(node, x0, y0, x1, y1) {
		this.node = node;
		this.x0 = x0;
		this.y0 = y0;
		this.x1 = x1;
		this.y1 = y1;
	}
}

export default class Quadtree {
	constructor(nodes, _x, _y) {
		this._x = _x;
		this._y = _y;
		this._x0 = NaN;
		this._y0 = NaN;
		this._x1 = NaN;
		this._y1 = NaN;
		this._root = undefined;

		this.addAll(nodes);
	}

	addAll(data) {
		var d,
			i,
			n = data.length,
			x,
			y,
			xz = new Array(n),
			yz = new Array(n),
			x0 = Infinity,
			y0 = Infinity,
			x1 = -Infinity,
			y1 = -Infinity;

		// Compute the points and their extent.
		for (i = 0; i < n; ++i) {
			if (
				isNaN((x = +this._x.call(null, (d = data[i])))) ||
				isNaN((y = +this._y.call(null, d)))
			)
				continue;
			xz[i] = x;
			yz[i] = y;
			if (x < x0) x0 = x;
			if (x > x1) x1 = x;
			if (y < y0) y0 = y;
			if (y > y1) y1 = y;
		}

		// If there were no (valid) points, abort.
		if (x0 > x1 || y0 > y1) return this;

		// Expand the tree to cover the new points.
		this.cover(x0, y0).cover(x1, y1);

		// Add the new points.
		for (i = 0; i < n; ++i) {
			this._add(xz[i], yz[i], data[i]);
		}

		return this;
	}

	cover(x, y) {
		if (isNaN((x = +x)) || isNaN((y = +y))) return this; // ignore invalid points

		var x0 = this._x0,
			y0 = this._y0,
			x1 = this._x1,
			y1 = this._y1;

		// If the quadtree has no extent, initialize them.
		// Integer extent are necessary so that if we later double the extent,
		// the existing quadrant boundaries don’t change due to floating point error!
		if (isNaN(x0)) {
			x1 = (x0 = Math.floor(x)) + 1;
			y1 = (y0 = Math.floor(y)) + 1;
		}

		// Otherwise, double repeatedly to cover.
		else {
			var z = x1 - x0,
				node = this._root,
				parent,
				i;

			while (x0 > x || x >= x1 || y0 > y || y >= y1) {
				i = ((y < y0) << 1) | (x < x0);
				(parent = new Array(4)), (parent[i] = node), (node = parent), (z *= 2);
				switch (i) {
					case 0:
						(x1 = x0 + z), (y1 = y0 + z);
						break;
					case 1:
						(x0 = x1 - z), (y1 = y0 + z);
						break;
					case 2:
						(x1 = x0 + z), (y0 = y1 - z);
						break;
					case 3:
						(x0 = x1 - z), (y0 = y1 - z);
						break;
				}
			}

			if (this._root && this._root.length) this._root = node;
		}

		this._x0 = x0;
		this._y0 = y0;
		this._x1 = x1;
		this._y1 = y1;
		return this;
	}

	find(x, y, radius) {
		var data,
			x0 = this._x0,
			y0 = this._y0,
			x1,
			y1,
			x2,
			y2,
			x3 = this._x1,
			y3 = this._y1,
			quads = [],
			node = this._root,
			q,
			i;

		if (node) quads.push(new Quad(node, x0, y0, x3, y3));
		if (radius == null) radius = Infinity;
		else {
			(x0 = x - radius), (y0 = y - radius);
			(x3 = x + radius), (y3 = y + radius);
			radius *= radius;
		}

		while ((q = quads.pop())) {
			// Stop searching if this quadrant can’t contain a closer node.
			if (
				!(node = q.node) ||
				(x1 = q.x0) > x3 ||
				(y1 = q.y0) > y3 ||
				(x2 = q.x1) < x0 ||
				(y2 = q.y1) < y0
			)
				continue;

			// Bisect the current quadrant.
			if (node.length) {
				var xm = (x1 + x2) / 2,
					ym = (y1 + y2) / 2;

				quads.push(
					new Quad(node[3], xm, ym, x2, y2),
					new Quad(node[2], x1, ym, xm, y2),
					new Quad(node[1], xm, y1, x2, ym),
					new Quad(node[0], x1, y1, xm, ym)
				);

				// Visit the closest quadrant first.
				if ((i = ((y >= ym) << 1) | (x >= xm))) {
					q = quads[quads.length - 1];
					quads[quads.length - 1] = quads[quads.length - 1 - i];
					quads[quads.length - 1 - i] = q;
				}
			}

			// Visit this point. (Visiting coincident points isn’t necessary!)
			else {
				var dx = x - +this._x.call(null, node.data),
					dy = y - +this._y.call(null, node.data),
					d2 = dx * dx + dy * dy;
				if (d2 < radius) {
					var d = Math.sqrt((radius = d2));
					(x0 = x - d), (y0 = y - d);
					(x3 = x + d), (y3 = y + d);
					data = node.data;
				}
			}
		}

		return data;
	}

	_add(x, y, d) {
		if (isNaN(x) || isNaN(y)) return this; // ignore invalid points

		var parent,
			node = this._root,
			leaf = { data: d },
			x0 = this._x0,
			y0 = this._y0,
			x1 = this._x1,
			y1 = this._y1,
			xm,
			ym,
			xp,
			yp,
			right,
			bottom,
			i,
			j;

		// If the tree is empty, initialize the root as a leaf.
		if (!node) return (this._root = leaf), this;

		// Find the existing leaf for the new point, or add it.
		while (node.length) {
			if ((right = x >= (xm = (x0 + x1) / 2))) x0 = xm;
			else x1 = xm;
			if ((bottom = y >= (ym = (y0 + y1) / 2))) y0 = ym;
			else y1 = ym;
			if (((parent = node), !(node = node[(i = (bottom << 1) | right)])))
				return (parent[i] = leaf), this;
		}

		// Is the new point is exactly coincident with the existing point?
		xp = +this._x.call(null, node.data);
		yp = +this._y.call(null, node.data);
		if (x === xp && y === yp)
			return (
				(leaf.next = node),
				parent ? (parent[i] = leaf) : (this._root = leaf),
				this
			);

		// Otherwise, split the leaf node until the old and new point are separated.
		do {
			parent = parent
				? (parent[i] = new Array(4))
				: (this._root = new Array(4));
			if ((right = x >= (xm = (x0 + x1) / 2))) x0 = xm;
			else x1 = xm;
			if ((bottom = y >= (ym = (y0 + y1) / 2))) y0 = ym;
			else y1 = ym;
		} while (
			(i = (bottom << 1) | right) === (j = ((yp >= ym) << 1) | (xp >= xm))
		);

		return (parent[j] = node), (parent[i] = leaf), this;
	}
}