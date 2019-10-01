<script>
	import { getChartContext } from './Chart.svelte';
	import { get_ticks } from '../utils/ticks.mjs';

	export let count = undefined;
	export let spacing = undefined; // TODO alternative to count
	export let horizontal;
	export let vertical;

	const { x1, y1, x2, y2, x, y } = getChartContext();

	const VERTICAL = {};
	const HORIZONTAL = {};

	$: orientation = vertical ? VERTICAL : HORIZONTAL;

	$: if (horizontal && vertical) {
		console.error(`<Grid> must specify either 'horizontal' or 'vertical' orientation`);
	}

	$: ticks = orientation === HORIZONTAL
		? get_ticks($y1, $y2, count)
		: get_ticks($x1, $x2, count);

	$: style = orientation === HORIZONTAL
		? y => `width: 100%; height: 0; top: ${$y(y)}%`
		: x => `width: 0; height: 100%; left: ${$x(x)}%`;

	$: translate = orientation === HORIZONTAL
		? y => `0,${$y(y)}%`
		: x => `${$x(x)}%,0`;
</script>

<pancake-grid>
	{#each ticks as tick, i}
		<pancake-grid-item style={style(tick)}>
			<slot value={tick} first={i === 0} last={i === ticks.length - 1}></slot>
		</pancake-grid-item>
	{/each}
</pancake-grid>

<style>
	pancake-grid-item {
		position: absolute;
		left: 0;
		top: 0;
	}
</style>