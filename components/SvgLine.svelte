<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;

	$: d = 'M' + data
		.map((d, i) => `${$x_scale(x(d, i))},${$y_scale(y(d, i))}`)
		.join('L');
</script>

<slot {d}></slot>