<script>
	import { getChartContext } from './Chart.svelte';

	export let x1 = 0;
	export let x2 = 1;
	export let y1 = 0;
	export let y2 = 1;

	const { x_scale, y_scale } = getChartContext();

	let style; $: {
		const _x1 = $x_scale(x1);
		const _x2 = $x_scale(x2);
		const _y1 = $y_scale(y1);
		const _y2 = $y_scale(y2);

		const left   = Math.min(_x1, _x2);
		const right  = Math.max(_x1, _x2);
		const top    = Math.min(_y1, _y2);
		const bottom = Math.max(_y1, _y2);

		const width = right - left;
		const height = bottom - top;

		style = `left: ${left}%; bottom: ${100 - bottom}%; width: ${right - left}%; height: ${height}%;`;
	};
</script>

<div class="pancake-box" style={style}>
	<slot></slot>
</div>

<style>
	.pancake-box {
		position: absolute;
	}
</style>