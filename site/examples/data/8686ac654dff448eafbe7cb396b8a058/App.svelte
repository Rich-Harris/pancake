<script>
	import * as Pancake from '@sveltejs/pancake'; 
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import data from './data.js';

	const age1 = Math.max(...data.map(d => d.age));
	const year0 = Math.min(...data.map(d => d.year));
	const year1 = Math.max(...data.map(d => d.year));
	const max = Math.max(...data.map(d => d.people));

	const birth_years = range(year0 - age1, year1, 5);
	const ages = range(0, age1, 5);

	let year = year1;
	let el;
	let w = 320;

	function range(a, b, step) {
		const array = [];
		for (; a <= b; a += step) array.push(a);
		return array;
	}

	function format(num) {
		return num ? `${num / 1e6}M` : '';
	}

	function get_populations (year, sex) {
		return birth_years.map(birth_year => {
			const d = selection.find(d => d.sex === sex && d.age === year - birth_year);
			return {
				x: birth_year,
				y: d ? d.people : 0
			};
		});
	}

	const x1 = spring();
	const x2 = spring();
	const m = spring();
	const f = spring();

	$: $x2 = year;
	$: $x1 = year - age1;
	$: selection = data.filter(d => d.year === year);
	$: $m = get_populations(year, 1);
	$: $f = get_populations(year, 2);
	$: size = w < 480 ? 'small' : w < 640 ? 'medium' : 'large';

	const handle_pointerdown = e => {
		if (!e.isPrimary) return;

		const start_x = e.clientX;
		const start_value = year;

		const handle_pointermove = e => {
			if (!e.isPrimary) return;

			const d = e.clientX - start_x;

			const step = Math.min(10, d > 0
				? (window.innerWidth - start_x) / (year1 - start_value)
				: start_x / (start_value - year0));

			const n = Math.round(d / step);
			year = Math.max(year0, Math.min(year1, start_value + Math.round(n * 0.1) * 10));
		};

		const handle_pointerup = e => {
			if (!e.isPrimary) return;

			window.removeEventListener('pointermove', handle_pointermove);
			window.removeEventListener('pointerup', handle_pointerup);
		};

		window.addEventListener('pointermove', handle_pointermove);
		window.addEventListener('pointerup', handle_pointerup);
	};

	const handle_resize = () => {
		// normally we'd just use bind:clientWidth={w} on the element,
		// but that fails in the REPL because of iframe restrictions
		w = el.clientWidth;
	};

	onMount(handle_resize);
</script>

<svelte:window on:resize={handle_resize}/>

<div class="chart {size}" bind:this={el}>
	<div class="background">
		<Pancake.Chart x1="{$x1 - 2.5}" x2="{$x2 + 2.5}" y1={0} y2={max} clip>
			<!-- men -->
			<Pancake.Columns data={$m} width={5}>
				<div class="column m"></div>
			</Pancake.Columns>

			<!-- women -->
			<Pancake.Columns data={$f} width={5}>
				<div class="column f"></div>
			</Pancake.Columns>

			<Pancake.Grid vertical ticks={birth_years} let:value>
				<span class="x label">{size === 'large' ? value : `'${String(value).slice(2)}`}</span>
			</Pancake.Grid>
		</Pancake.Chart>
	</div>

	<div class="foreground">
		<Pancake.Chart x1="{90 + 2.5}" x2="{0 - 2.5}" y1={0} y2={max}>
			<Pancake.Grid horizontal count={5} let:value let:first>
				<div class="grid-line horizontal"></div>
				<span class="y label">{format(value)}</span>
			</Pancake.Grid>

			<Pancake.Grid vertical count="{size === 'large' ? 20 : 10}" let:value>
				<span class="x label">
					{value}
					{#if value === 0}<span style="position: absolute; left: 2.5em">yrs old</span>{/if}
				</span>
			</Pancake.Grid>
		</Pancake.Chart>
	</div>

	<div class="slider-container">
		<!-- TODO this should be componentised, but there's a bug in Svelte that prevents it -->
		<!-- <NumberSlider min={year0} max={year1} step={10} bind:value={year}/> -->
		<button disabled="{year === year0}" on:click="{() => year -= 10}">&larr;</button>
		<span on:pointerdown={handle_pointerdown}>{year}</span>
		<button disabled="{year === year1}" on:click="{() => year += 10}">&rarr;</button>
	</div>
</div>

<p class="credit">
	Source: <a href="https://ipums.org/">IPUMS</a>. Based on <a href="https://bl.ocks.org/mbostock/4062085">Population Pyramid by Mike Bostock</a> 
</p>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 300px;
		margin: 0 0 36px 0;
	}

	.background, .foreground {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 3em 3em 2em 0;
		box-sizing: border-box;
	}

	.slider-container {
		display: flex;
		position: absolute;
		left: 0;
		top: 0;
		user-select: none;
		-moz-user-select: none;
		color: #333;
	}

	.slider-container span {
		display: block;
		font-size: 2em;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white;
		cursor: ew-resize;
	}

	.slider-container button {
		background: none;
		border: none;
		font-size: 2em;
		margin: 0;
		padding: 0 0.2em;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: 100%;
		left: 0;
		border-bottom: 1px solid rgba(0,0,0,0.05);
	}

	.label {
		position: absolute;
		font-size: 14px;
		color: #666;
		line-height: 1;
		white-space: nowrap;
	}

	.y.label {
		left: calc(100% + 1em);
		bottom: -0.5em;
		line-height: 1;
	}

	.x.label {
		width: 4em;
		left: -2em;
		bottom: 5px;
		text-align: center;
	}

	.background .x.label {
		color: white;
		font-size: 10px;
	}

	.foreground .x.label {
		bottom: -22px;
	}

	.column {
		position: absolute;
		/* left: 1px;
		width: calc(100% - 2px); */
		left: 0;
		width: 100%;
		border-left: 1px solid rgba(255,255,255,0.4);
		border-right: 1px solid rgba(255,255,255,0.4);
		box-sizing: border-box;
		height: 100%;
		opacity: 0.6;
		border-radius: 2px 2px 0 0;
	}

	.column.m {
		background-color: #1f77b4;
	}

	.column.f {
		background-color: #e377c2;
	}
	
	.credit {
		font-size: 14px;
	}

	.medium .slider-container span {
		font-size: 3.5em;
	}

	.large .slider-container span {
		font-size: 5em;
	}
</style>