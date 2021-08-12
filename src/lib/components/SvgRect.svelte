<script>
	import { getChartContext } from './Chart.svelte';

	export let x1 = 0;
	export let x2 = 1;
	export let y1 = 0;
	export let y2 = 1;

	const { x_scale, y_scale } = getChartContext();

	$: left = $x_scale(x1);
	$: right = $x_scale(x2);
	$: top = $y_scale(y1);
	$: bottom = $y_scale(y2);
</script>

<slot
	x={Math.min(left, right)}
	y={Math.min(top, bottom)}
	width={Math.abs(right - left)}
	height={Math.abs(bottom - top)}
></slot>