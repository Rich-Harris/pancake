<script context="module">
	import { getContext } from 'svelte';

	const key = {};

	export function getChartContext() {
		return getContext(key);
	}
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import * as yootils from 'yootils';

	export let x1;
	export let y1;
	export let x2;
	export let y2;

	let providers = [];

	const _x1 = writable();
	const _y1 = writable();
	const _x2 = writable();
	const _y2 = writable();

	$: _x1.set(x1);
	$: _y1.set(y1);
	$: _x2.set(x2);
	$: _y2.set(y2);

	const x = derived([_x1, _x2], ([$x1, $x2]) => {
		return yootils.linearScale([$x1, $x2], [0, 100]);
	});

	const y = derived([_y1, _y2], ([$y1, $y2]) => {
		return yootils.linearScale([$y1, $y2], [100, 0]);
	});

	setContext(key, {
		x1: _x1,
		y1: _y1,
		x2: _x2,
		y2: _y2,
		x,
		y
	});
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