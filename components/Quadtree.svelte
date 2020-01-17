<script>
	import { getChartContext } from './Chart.svelte';
	import Quadtree from '../utils/Quadtree.mjs'

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	const { pointer } = getChartContext();

	$: quadtree = new Quadtree(data, _x, _y);
	$: closest = $pointer.x !== undefined ? quadtree.find($pointer.x, $pointer.y) : null;
</script>

<slot {closest}></slot>