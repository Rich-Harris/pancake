<script>
	import { getChartContext } from './Chart.svelte';

	const { x, y } = getChartContext();

	export let data;

	$: d = 'M' + data
		.map(point => `${$x(point.x)},${$y(point.y)}`)
		.join('L');
</script>

<slot {d}></slot>