<script>
	import * as Pancake from '../../../../../index.mjs';
	import { countries, years } from './data.js';

	let x1 = +Infinity;
	let x2 = -Infinity
	let y1 = +Infinity;
	let y2 = -Infinity;

	countries.forEach(country => {
		country.data.forEach(d => {
			if (d.x < x1) x1 = d.x;
			if (d.x > x2) x2 = d.x;
			if (d.y < y1) y1 = d.y;
			if (d.y > y2) y2 = d.y;
		});
	});

	let closest;
	let filter = '';

	$: regex = filter ? new RegExp(filter, 'i') : null;
	$: filtered = regex ? countries.filter(country => regex.test(country.name)) : countries;

	$: points = filtered.reduce((points, country) => {
		return points.concat(country.data.map(d => ({
			x: d.x,
			y: d.y,
			country
		})));
	}, []);
</script>

<input placeholder="Type to filter" bind:value={filter}>

<div class="chart">
	<Pancake.Chart {x1} {x2} y1={y1} y2={y2}>
		<Pancake.Grid horizontal count={5} let:value>
			<div class="grid-line horizontal"><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<span class="x-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			{#each filtered as country}
				<Pancake.SvgLine data={country.data} let:d>
					<path class="data" {d}></path>
				</Pancake.SvgLine>
			{/each}

			{#if closest}
				<Pancake.SvgLine data={closest.country.data} let:d>
					<path class="highlight" {d}></path>
				</Pancake.SvgLine>
			{/if}
		</Pancake.Svg>

		{#if closest}
			<Pancake.Point x={closest.x} y={closest.y}>
				<span class="annotation-point"></span>
				<div class="annotation" style="transform: translate(-{100 * ((closest.x - x1) / (x2 - x1))}%,0)">
					<strong>{closest.country.name}</strong>
					<span>{closest.x}: {closest.y} years</span>
				</div>
			</Pancake.Point>
		{/if}

		<Pancake.Quadtree data={points} bind:closest/>
	</Pancake.Chart>
</div>

<p>Source: <a href="https://data.worldbank.org/indicator/SP.DYN.LE00.IN?end=2017&start=1960">The World Bank</a>. Based on <a href="http://projects.flowingdata.com/life-expectancy/">Life Expectancy by Nathan Yau</a>.</p>

<style>
	.chart {
		height: 400px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
	}

	input {
		font-size: inherit;
		font-family: inherit;
		padding: 0.5em;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
		border-bottom: 1px dashed #ccc;
	}

	.grid-line.first {
		border-bottom: 1px solid #333;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 2px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}

	.series-label {
		position: absolute;
		display: inline-block;
		bottom: 0;
		right: 0;
	}

	.x-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	path.data {
		stroke: rgba(0,0,0,0.2);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1px;
		fill: none;
	}

	.highlight {
		stroke: #ff3e00;
		fill: none;
		stroke-width: 2;
	}

	.annotation {
		position: absolute;
		white-space: nowrap;
		bottom: 1em;
		line-height: 1.2;
		background-color: rgba(255,255,255,0.9);
		padding: 0.2em 0.4em;
		border-radius: 2px;
	}

	.annotation-point {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #ff3e00;
		border-radius: 50%;
		transform: translate(-50%,-50%);
	}

	.annotation strong {
		display: block;
		font-size: 20px;
	}

	.annotation span {
		display: block;
		font-size: 14px;
	}
</style>