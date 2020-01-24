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

	export let x1 = 0;
	export let y1 = 0;
	export let x2 = 1;
	export let y2 = 1;
	export let clip = false;

	let chart;

	const _x1 = writable();
	const _y1 = writable();
	const _x2 = writable();
	const _y2 = writable();

	const pointer = writable({
		left: undefined,
		top: undefined,
		x: undefined,
		y: undefined
	});

	// $: console.log({ x: $pointer.x, y: $pointer.y });

	const handle_mousemove = e => {
		const bcr = chart.getBoundingClientRect();
		const left = e.clientX - bcr.left;
		const top = e.clientY - bcr.top;

		const x = $x_inverse(100 * left / (bcr.right - bcr.left));
		const y = $y_inverse(100 * top / (bcr.bottom - bcr.top));

		pointer.set({ x, y });
	};

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

	const x_inverse = derived(x, $x => $x.inverse());
	const y_inverse = derived(y, $y => $y.inverse());

	setContext(key, {
		x1: _x1,
		y1: _y1,
		x2: _x2,
		y2: _y2,
		x,
		y,
		pointer
	});
</script>

<pancake-chart bind:this={chart} on:mousemove={handle_mousemove} class:clip>
	<slot></slot>
</pancake-chart>

<style>
	pancake-chart {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	.clip {
		overflow: hidden;
	}
</style>