<script>
	import { getChartContext } from './Chart.svelte';

	const { x_scale, y_scale } = getChartContext();

	export let x;
	export let y;

	let d; $: {
		const _x = $x_scale(x);
		const _y = $y_scale(y);

		d = `M${_x} ${_y} A0 0 0 0 1 ${_x + 0.0001} ${_y + 0.0001}`;
	}
</script>

<slot {d}></slot>