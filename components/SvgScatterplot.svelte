<script>
	import { getChartContext } from './Chart.svelte';

	const { x: x_scale, y: y_scale } = getChartContext();

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	$: d = data.map(d => {
		const x = $x_scale(_x(d));
		const y = $y_scale(_y(d));

		return `M${x} ${y} A0 0 0 0 1 ${x} ${y}`;
	}).join(' ');
</script>

<slot {d}></slot>