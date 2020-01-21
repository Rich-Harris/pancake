<script>
	import * as Pancake from '../../../../../../index.mjs';
	import points from './points.js';

	const fruits = ['apples', 'bananas', 'cherries', 'dates'];
	const colors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const stacks = Pancake.stacks(points, fruits, 'year');

	const max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.end)), 0);
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={max} y1={2015.5} y2={2019.5}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal"><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={10} let:value>
			<div class="grid-line vertical"></div>
			<span class="x-label">{value}</span>
		</Pancake.Grid>

		{#each stacks as stack, i}
			{#each stack.values as d}
				<Pancake.Box
					x1="{d.start}"
					x2="{d.end}"
					y1="{d.i - 0.5}"
					y2="{d.i + 0.5}"
				>
					<div class="box" style="background-color: {colors[i]}"></div>
				</Pancake.Box>
			{/each}
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 0 2em 3em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 3em);
		left: -3em;
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: -0.5em;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		line-height: 1;
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

	.box {
		position: absolute;
		left: 0;
		top: 2px;
		width: 100%;
		height: calc(100% - 4px);
		border-radius: 2px;
	}
</style>