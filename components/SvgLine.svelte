<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	const { x: x_scale, y: y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;

	$: d = 'M' + data
		.map(d => `${$x_scale(x(d))},${$y_scale(y(d))}`)
		.join('L');
</script>

<slot {d}></slot>