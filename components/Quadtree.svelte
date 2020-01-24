<script>
	import { getChartContext } from './Chart.svelte';
	import Quadtree from '../utils/Quadtree.mjs'
	import { default_x, default_y } from '../utils/accessors.mjs';

	export let data;
	export let x = default_x;
	export let y = default_y;

	// exposing the prop lets consumers use let: or bind:
	export let closest = undefined;

	const { pointer } = getChartContext();

	$: quadtree = new Quadtree(data, x, y);
	$: closest = $pointer.x !== undefined ? quadtree.find($pointer.x, $pointer.y) : null;
</script>

<slot {closest}></slot>