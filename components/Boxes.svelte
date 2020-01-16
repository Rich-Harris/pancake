<script>
	import { getChartContext } from './Chart.svelte';
	import { get_ticks } from '../utils/ticks.mjs';

	export let data;
	export let y2 = d => d.y2;
	export let x1 = d => d.x1;
	export let x2 = d => d.x2;
	export let y1 = d => d.y1;

	$: _y2 = typeof y2 === 'string' ? d => d[y2] : y2;
	$: _x1 = typeof x1 === 'string' ? d => d[x1] : x1;
	$: _x2 = typeof x2 === 'string' ? d => d[x2] : x2;
	$: _y1 = typeof y1 === 'string' ? d => d[y1] : y1;

	const { x: x_scale, y: y_scale } = getChartContext();

	$: style = d => {
		const x1 = $x_scale(_x1(d) || 0);
		const x2 = $x_scale(_x2(d));
		const y1 = $y_scale(_y1(d) || 0);
		const y2 = $y_scale(_y2(d));

		const left = Math.min(x1, x2);
		const right = Math.max(x1, x2);
		const top = Math.min(y1, y2);
		const bottom = Math.max(y1, y2);

		const width = right - left;
		const height = bottom - top;

		return `left: ${left}%; bottom: ${100 - bottom}%; width: ${right - left}%; height: ${height}%;`;
	};
</script>

<pancake-boxes>
	{#each data as d, i}
		<pancake-box style={style(d)}>
			<slot value={d} first={i === 0} last={i === data.length - 1}></slot>
		</pancake-box>
	{/each}
</pancake-boxes>

<style>
	pancake-boxes {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	pancake-box {
		position: absolute;
	}
</style>