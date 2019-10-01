<script context="module">
	import { getContext } from 'svelte';

	const key = {};

	export function getChartContext() {
		return getContext(key);
	}
</script>

<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import * as yootils from 'yootils';

	export let x1 = 0;
	export let y1 = 0;
	export let x2 = 1;
	export let y2 = 1;

	const context = {
		x1: writable(x1),
		y1: writable(y1),
		x2: writable(x2),
		y2: writable(y2)
	};

	context.x = derived([context.x1, context.x2], ([$x1, $x2]) => {
		return yootils.linearScale([$x1, $x2], [0, 100]);
	});

	context.y = derived([context.y1, context.y2], ([$y1, $y2]) => {
		return yootils.linearScale([$y1, $y2], [100, 0]);
	});

	$: context.x1.set(x1);
	$: context.y1.set(y1);
	$: context.x2.set(x2);
	$: context.y2.set(y2);

	setContext(key, context);
</script>

<pancake-chart>
	<slot></slot>
</pancake-chart>

<style>
	pancake-chart {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}
</style>