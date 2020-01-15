<script>
	import { getChartContext } from './Chart.svelte';
	import { get_ticks } from '../utils/ticks.mjs';

	export let data;
	export let top = d => d.top;
	export let left = d => d.left;
	export let right = d => d.right;
	export let bottom = d => d.bottom;

	$: _top = typeof top === 'string' ? d => d[top] : top;
	$: _left = typeof left === 'string' ? d => d[left] : left;
	$: _right = typeof right === 'string' ? d => d[right] : right;
	$: _bottom = typeof bottom === 'string' ? d => d[bottom] : bottom;

	const { x1, y1, x2, y2, x: x_scale, y: y_scale } = getChartContext();

	$: style = d => {
		const top = $y_scale(_top(d));
		const left = $x_scale(_left(d) || 0);
		const right = $x_scale(_right(d));
		const bottom = $y_scale(_bottom(d) || 0);

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