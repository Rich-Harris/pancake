<script>
	import * as Pancake from '@sveltejs/pancake';
	import tsv from './carbon.js';

	const data = tsv
		.split('\n')
		.map(str => {
			let [date, avg, trend] = str.split('\t').map(parseFloat);
			if (avg === -99.99) avg = null;

			return { date, avg, trend };
		});

	const points = data.filter(d => d.avg);

	let minx = points[0].date;
	let maxx = points[points.length - 1].date;
	let miny = +Infinity;
	let maxy = -Infinity;
	let highest;

	for (let i = 0; i < points.length; i += 1) {
		const point = points[i];

		if (point.avg < miny) {
			miny = point.avg;
		}

		if (point.avg > maxy) {
			maxy = point.avg;
			highest = point;
		}
	}

	const months = 'Jan Feb Mar Apr May June July Aug Sept Oct Nov Dec'.split(' ');

	const format = date => {
		const year = ~~date;
		const month = Math.floor((date % 1) * 12);

		return `${months[month]} ${year}`;
	};

	const pc = date => {
		return 100 * (date - minx) / (maxx - minx);
	};
</script>

<div class="chart">
	<Pancake.Chart x1={minx} x2={maxx} y1={miny} y2={maxy}>
		<Pancake.Grid horizontal count={5} let:value let:last>
			<div class="grid-line horizontal"><span>{value} {last ? 'ppm' : ''}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<div class="grid-line vertical"></div>
			<span class="year-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			<Pancake.SvgScatterplot data={points} x="{d => d.date}" y="{d => d.avg}" let:d>
				<path class="avg scatter" {d}/>
			</Pancake.SvgScatterplot>

			<Pancake.SvgLine data={points} x="{d => d.date}" y="{d => d.avg}" let:d>
				<path class="avg" {d}/>
			</Pancake.SvgLine>

			<Pancake.SvgLine data={points} x="{d => d.date}" y="{d => d.trend}" let:d>
				<path class="trend" {d}/>
			</Pancake.SvgLine>
		</Pancake.Svg>

		<!-- chart title -->
		<Pancake.Point x={1962} y={390}>
			<div class="text">
				<h2>Atmospheric CO₂</h2>

				<p>
					<span style="color: #676778">•</span>
					<span>monthly average&nbsp;&nbsp;&nbsp;</span>
					<span style="color: #ff3e00">—</span>
					<span>trend</span>
				</p>
			</div>
		</Pancake.Point>

		<!-- note -->
		<Pancake.Point x={2015} y={330}>
			<div class="text" style="right: 0; text-align: right;">
				<p><em>This chart will render correctly even if JavaScript is disabled.</em></p>
			</div>
		</Pancake.Point>

		<!-- annotate highest point -->
		<Pancake.Point x={highest.date} y={highest.avg}>
			<div class="annotation" style="position: absolute; right: 0.5em; top: -0.5em; white-space: nowrap; line-height: 1; color: #666;">
				{highest.avg} parts per million (ppm) &rarr;
			</div>
		</Pancake.Point>

		<Pancake.Quadtree data={points} x="{d => d.date}" y="{d => d.avg}" let:closest>
			{#if closest}
				<Pancake.Point x={closest.date} y={closest.avg} let:d>
					<div class="focus"></div>
					<div class="tooltip" style="transform: translate(-{pc(closest.date)}%,0)">
						<strong>{closest.avg} ppm</strong>
						<span>{format(closest.date)}</span>
					</div>
				</Pancake.Point>
			{/if}
		</Pancake.Quadtree>
	</Pancake.Chart>
</div>

<p>Source: <a target="_blank" href="https://scrippsco2.ucsd.edu/data/atmospheric_co2/primary_mlo_co2_record.html">Scripps Institution of Oceanography</a>. Based on <a href="https://www.bloomberg.com/graphics/climate-change-data-green/carbon-clock.html">Carbon Clock by Bloomberg</a>.</p>

<style>
	.chart {
		height: 450px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
		max-width: 80em;
		margin: 0 auto;
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

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 2px;
		line-height: 1;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}

	.year-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -30px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.text {
		position: absolute;
		width: 15em;
		line-height: 1;
		color: #666;
		transform: translate(0,-50%);
		text-shadow: 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white, 0 0 8px white;
	}

	.text p {
		margin: 0;
		line-height: 1.2;
		color: #999;
	}

	.text h2 {
		margin: 0;
		font-size: 1.4em;
	}

	path.avg {
		stroke: #676778;
		opacity: 0.5;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1px;
		fill: none;
	}

	path.scatter {
		stroke-width: 3px;
	}

	path.trend {
		stroke: #ff3e00;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
		fill: none;
	}

	.focus {
		position: absolute;
		width: 10px;
		height: 10px;
		left: -5px;
		top: -5px;
		border: 1px solid black;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.tooltip {
		position: absolute;
		white-space: nowrap;
		width: 8em;
		bottom: 1em;
		/* background-color: white; */
		line-height: 1;
		text-shadow: 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white;
	}

	.tooltip strong {
		font-size: 1.4em;
		display: block;
	}

	@media (min-width: 800px) {
		.chart {
			height: 600px;
		}
	}
</style>