<script>
	import { getChartContext } from './Chart.svelte';

	const { x: x_scale, y: y_scale } = getChartContext();

	export let x;
	export let y;
</script>

<pancake-point style="left: {$x_scale(x)}%; top: {$y_scale(y)}%">
	<slot></slot>
</pancake-point>

<style>
	pancake-point {
		position: absolute;
		width: 0;
		height: 0;
	}
</style>