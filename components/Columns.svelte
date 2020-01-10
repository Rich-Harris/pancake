<script>
	import { getChartContext } from './Chart.svelte';
	import { get_ticks } from '../utils/ticks.mjs';

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	const { x1, y1, x2, y2, x: x_scale, y: y_scale } = getChartContext();

	$: style = d => {
		const x = _x(d);
		const y = _y(d);

		const left = $x_scale(x - 0.5);
		const right = $x_scale(x + 0.5);
		const top = $y_scale(y);
		const bottom = 0;

		const width = right - left;

		console.log({ x, y, top });

		return `left: ${left}%; width: ${right - left}%; bottom: 0; height: ${100 - top}%;`;
	}
</script>

<pancake-columns>
	{#each data as d, i}
		<pancake-column style={style(d)}>
			<slot value={d} first={i === 0} last={i === data.length - 1}></slot>
		</pancake-column>
	{/each}
</pancake-columns>

<style>
	pancake-columns {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	pancake-column {
		position: absolute;
	}
</style>