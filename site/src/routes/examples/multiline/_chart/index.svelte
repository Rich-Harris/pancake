<script>
	import * as Pancake from '../../../../../../index.mjs';
	import data from './data.js';

	let x1 = Infinity;
	let x2 = -Infinity;

	data.forEach(d => {
		if (d.month < x1) x1 = d.month;
		if (d.month > x2) x2 = d.month;
	});

	const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

	const format_x = x => {
		const d = new Date(x);
		const month = months[d.getMonth()];

		return `${month} ${d.getDate()}`;
	};

	const colors = {
		apples: '#ffe4b8',
		bananas: '#ffb3c0',
		cherries: '#ff7ac7',
		dates: '#ff00cc'
	};

	const series = Object.keys(data[0])
		.filter(key => key !== 'month')
		.map(key => {
			return {
				key,
				values: data.map(d => ({
					month: d.month,
					value: d[key]
				})).sort((a, b) => a.month - b.month)
			}
		});
</script>

<div class="chart">
	<Pancake.Chart {x1} {x2} y1={0} y2={4000}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal" class:first><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical ticks="{data.map(d => d.month)}" let:value>
			<span class="x-label">{format_x(value)}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			{#each series as s}
				<Pancake.SvgLine data={s.values} x="month" y="value" let:d>
					<path class="data" style="stroke: {colors[s.key]}" {d}></path>
				</Pancake.SvgLine>
			{/each}
		</Pancake.Svg>

		{#each series as s}
			<Pancake.Point x={x2} y={s.values[s.values.length-1].value}>
				<span class="series-label">{s.key}</span>
			</Pancake.Point>
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 1em 2em 2em;
		margin: 0 0 36px 0;
		overflow: hidden;
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

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
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
		stroke: black;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 4px;
		fill: none;
	}
</style>