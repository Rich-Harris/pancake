<script>
	import * as Pancake from '../../../../../../index.mjs';
	import points from './points.js';
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={18} y1={1978.5} y2={1983.5}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<span class="y-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<div class="grid-line vertical"></div>
			<span class="x-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Bars data={points} x="{d => d.value}" y="{d => d.year}">
			<div class="column"></div>
		</Pancake.Bars>
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 0 2em 2.5em;
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

	.y-label {
		position: absolute;
		left: -2.5rem;
		top: -0.5em;
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

	.column {
		position: absolute;
		top: 2px;
		width: 100%;
		height: calc(100% - 4px);
		background-color: #00bbff;
	}
</style>