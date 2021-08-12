<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';
	import { line, curveLinear } from 'd3-shape';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let curve = curveLinear;

	$: scaled = data.map((d, i) => [$x_scale(x(d, i)), $y_scale(y(d, i))]);
	$: d = line().curve(curve)(scaled);
</script>

<slot {d}></slot>