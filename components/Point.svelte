<script>
	import { getChartContext } from './Chart.svelte';

	const { x, y } = getChartContext();

	let px;
	let py;

	export { px as x, py as y };

	$: left = $x(px);
	$: top = $y(py);
</script>

<pancake-point style="left: {left}%; top: {top}%">
	<slot></slot>
</pancake-point>

<style>
	pancake-point {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>