<script>
	import { getChartContext } from './Chart.svelte';

	const { x: x_scale, y: y_scale } = getChartContext();

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	$: d = 'M' + data
		.map(d => `${$x_scale(_x(d))},${$y_scale(_y(d))}`)
		.join('L');
</script>

<slot {d}></slot>