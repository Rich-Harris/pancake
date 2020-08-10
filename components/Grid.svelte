<script>
	import { getChartContext } from './Chart.svelte';
	import { get_ticks } from '../utils/ticks.mjs';

	export let count = undefined;
	export let ticks = undefined;
	export let horizontal = false;
	export let vertical = false;

	const { x1, y1, x2, y2, x_scale, y_scale } = getChartContext();

	const VERTICAL = {};
	const HORIZONTAL = {};

	$: orientation = vertical ? VERTICAL : HORIZONTAL;

	$: if (horizontal && vertical) {
		console.error(`<Grid> must specify either 'horizontal' or 'vertical' orientation`);
	}

	$: _ticks = ticks || (orientation === HORIZONTAL
		? get_ticks($y1, $y2, count)
		: get_ticks($x1, $x2, count));

	$: style = orientation === HORIZONTAL
		? (n, i) => `width: 100%; height: 0; top: ${$y_scale(n, i)}%`
		: (n, i) => `width: 0; height: 100%; left: ${$x_scale(n, i)}%`;
</script>

<div class="pancake-grid">
	{#each _ticks as tick, i}
		<div class="pancake-grid-item" style={style(tick, i)}>
			<slot value={tick} first={i === 0} last={i === _ticks.length - 1}></slot>
		</div>
	{/each}
</div>

<style>
	.pancake-grid-item {
		position: absolute;
		left: 0;
		top: 0;
	}
</style>