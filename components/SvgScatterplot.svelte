<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;

	$: d = data.map((d, i) => {
		const _x = $x_scale(x(d, i));
		const _y = $y_scale(y(d, i));

		return `M${_x} ${_y} A0 0 0 0 1 ${_x + 0.0001} ${_y + 0.0001}`;
	}).join(' ');
</script>

<slot {d}></slot>