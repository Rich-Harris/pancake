<script>
	import * as Pancake from '@sveltejs/pancake';
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

		<Pancake.Columns data={points} x="{d => d.year}" y="{d => d.value}">
			<div class="column"></div>
		</Pancake.Columns>

		<Pancake.Point x={1980} y={3}>
			<div class="annotation">
				<span>1980 wooo!!!</span>

				<svg width=20 height=100>
					<marker id="arrowhead" viewBox="-10 -10 20 20" markerWidth="20" markerHeight="20" orient="auto">
						<path d="M-6,-6 L 0,0 L -6,6"/>
					</marker>

					<line x1=10 x2=10 y1=10 y2=90></line>
				</svg>
			</div>
		</Pancake.Point>
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

	.annotation {
		position: absolute;
		width: 100px;
		bottom: 0;
		left: -50px;
		text-align: center;
	}

	.annotation line {
		stroke: black;
		marker-end: url(#arrowhead);
	}
</style>