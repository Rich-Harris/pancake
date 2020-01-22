<script>
	import * as Pancake from '@sveltejs/pancake';
	import data from './data.js';

	const fruits = ['apples', 'bananas', 'cherries', 'dates'];

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

	const colors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	const stacks = Pancake.stacks(data, fruits, 'month');

	const max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.end)), 0);

	const area = values => values.map(d => ({ x: d.i, y: d.end })).concat(
		values.map(d => ({ x: d.i, y: d.start })).reverse()
	);
</script>

<div class="chart">
	<Pancake.Chart {x1} {x2} y1={0} y2={max}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal" class:first><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical ticks="{data.map(d => d.month)}" let:value>
			<span class="x-label">{format_x(value)}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			{#each stacks as s, i}
				<Pancake.SvgPolygon data={area(s.values)} let:d>
					<path class="data" style="fill: {colors[i]}" {d}></path>
				</Pancake.SvgPolygon>
			{/each}
		</Pancake.Svg>
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
		stroke: none;
	}
</style>