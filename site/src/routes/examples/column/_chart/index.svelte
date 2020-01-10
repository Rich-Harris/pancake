<script>
	import * as Pancake from '../../../../../../index.mjs';
	import points from './points.js';
</script>

<div class="chart">
	<Pancake.Chart x1={1978.5} x2={1983.5} y1={0} y2={18}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal"><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<span class="year-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Columns data={points} x="year" y="value">
			<div class="column"></div>
		</Pancake.Columns>

		<!-- <Pancake.Svg>
			<Pancake.SvgScatterplot data={points} x="year" y="value" let:d>
				<path class="data" {d}/>
			</Pancake.SvgScatterplot>
		</Pancake.Svg> -->
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 0;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		line-height: 1;
	}

	.year-label {
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
		left: 2px;
		width: calc(100% - 4px);
		height: 100%;
		background-color: rgb(0,224,71);
	}
</style>