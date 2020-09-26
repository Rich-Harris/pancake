<script>
	import { createEventDispatcher } from 'svelte';
	import { getChartContext } from './Chart.svelte';
	import Quadtree from '../utils/Quadtree.mjs'
	import { default_x, default_y } from '../utils/accessors.mjs';

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let radius = Infinity;

	// exposing the prop lets consumers use let: or bind:
	export let closest = undefined;
	export let maxLevels = undefined;

	const { pointer, x_scale, y_scale, x_scale_inverse, y_scale_inverse, width, height } = getChartContext();
	const dispatch = createEventDispatcher();

	$: quadtree = new Quadtree(data, maxLevels);
	$: quadtree.update(x, y, $x_scale, $y_scale);

	// track reference changes, to trigger updates sparingly
	let prev_closest;
	let next_closest;

	$: next_closest = $pointer !== null
		? quadtree.find($pointer.left, $pointer.top, $width, $height, radius)
		: null;

	$: if (next_closest !== prev_closest) {
		closest = prev_closest = next_closest;
	}
</script>

<slot {closest}></slot>
