<script>
	import { getChartContext } from './Chart.svelte';

	const { x: x_scale, y: y_scale, add } = getChartContext();

	export let data;
	export let floor = 0;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	add({
		bounds: () => {
			let x1 = Infinity;
			let y1 = Infinity;
			let x2 = -Infinity;
			let y2 = -Infinity;

			data.forEach(d => {
				const x = _x(d);
				const y = _y(d);

				if (x < x1) x1 = x;
				if (y < y1) y1 = y;
				if (x > x2) x2 = x;
				if (y > y2) y2 = y;
			});

			return [x1, y1, x2, y2];
		}
	});

	$: d = data.length === 0
		? ''
		: `M${$x_scale(_x(data[0]))},${$y_scale(floor)}M` + data
		.map(d => `${$x_scale(_x(d))},${$y_scale(_y(d))}`)
		.join('L') + `L${$x_scale(_x(data[data.length - 1]))},${$y_scale(floor)}L${$x_scale(_x(data[0]))},${$y_scale(floor)}Z`;
</script>

<slot {d}></slot>