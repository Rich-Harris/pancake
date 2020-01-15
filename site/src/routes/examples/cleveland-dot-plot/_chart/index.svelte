<script>
	import * as Pancake from '../../../../../../index.mjs';
	import data from './data.js';

	const colors = ['#f0c', '#00bbff', '#00e047', '#ffdd57'];

	const fruits = Object.keys(data[0])
		.filter(key => key !== 'year')
		.map((key, i) => {
			const values = data.map(d => ({
				year: d.year,
				value: d[key]
			}));

			return {
				key,
				color: colors[i],
				values
			};
		});

	const years = data.map(d => {
		const values = Object.keys(d)
			.filter(key => key !== 'year')
			.map(key => d[key]);

		const min = Math.min(...values);
		const max = Math.max(...values);

		return {
			year: d.year,
			min,
			max
		}
	});
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={4000} y1={2015.5} y2={2019.5}>
		<Pancake.Grid horizontal count={3} let:value let:first>
			<span class="year">{value}</span>
		</Pancake.Grid>

		<Pancake.Grid vertical count={10} let:value>
			<div class="grid-line vertical"></div>
			<span class="value">{value}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			{#each years as d}
				<Pancake.SvgLine data={[{x:d.min,y:d.year},{x:d.max,y:d.year}]} let:d>
					<path class="line" {d}/>
				</Pancake.SvgLine>
			{/each}

			{#each fruits as fruit}
				<Pancake.SvgScatterplot data={fruit.values} x="value" y="year" let:d>
					<path class="halo" {d}/>
					<path class="data" style="stroke: {fruit.color}" {d}/>
				</Pancake.SvgScatterplot>
			{/each}
		</Pancake.Svg>
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 1em 2em 4em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.year {
		position: absolute;
		left: -4em;
		transform: translate(0,-50%);
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}

	.value {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -2em;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	path.line {
		stroke: black;
		stroke-width: 1px;
	}

	path.halo {
		stroke: black;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 14px;
		fill: none;
	}

	path.data {
		stroke: rgb(171, 0, 214);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 12px;
		fill: none;
	}
</style>