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

	export let x1 = undefined;
	export let y1 = undefined;
	export let x2 = undefined;
	export let y2 = undefined;

	let providers = [];

	const context = {
		x1: writable(x1),
		y1: writable(y1),
		x2: writable(x2),
		y2: writable(y2),

		add: provider => {
			providers = [...providers, provider];
			console.log(providers);

			onDestroy(() => {
				providers = providers.filter(p => p !== provider);
			});
		}
	};

	context.x = derived([context.x1, context.x2], ([$x1, $x2]) => {
		return yootils.linearScale([$x1, $x2], [0, 100]);
	});

	context.y = derived([context.y1, context.y2], ([$y1, $y2]) => {
		return yootils.linearScale([$y1, $y2], [100, 0]);
	});

	$: {
		let _x1 = x1;
		let _y1 = y1;
		let _x2 = x2;
		let _y2 = y2;

		if (x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined) {
			// we need to calculate extents from our data providers
			let min_x = Infinity;
			let min_y = Infinity;
			let max_x = -Infinity;
			let max_y = -Infinity;

			providers.forEach(provider => {
				const [x1, y1, x2, y2] = provider.bounds();

				if (x1 < min_x) min_x = x1;
				if (x2 > max_x) max_x = x2;
				if (y1 < min_y) min_y = y1;
				if (y2 > max_y) max_y = y2;
			});

			if (_x1 === undefined) _x1 = min_x;
			if (_y1 === undefined) _y1 = min_y;
			if (_x2 === undefined) _x2 = max_x;
			if (_y2 === undefined) _y2 = max_y;
		}

		context.x1.set(_x1);
		context.y1.set(_y1);
		context.x2.set(_x2);
		context.y2.set(_y2);
	};

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