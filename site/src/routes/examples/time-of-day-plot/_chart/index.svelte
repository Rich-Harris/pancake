<script>
	import * as Pancake from '../../../../../../index.mjs';
	import timestamps from './timestamps.js';

	// 2018-07-22T22:25:55

	const points = timestamps.map(str => {
		const [match, year, month, day, hours, minutes, seconds] = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(str);

		const time = (((+hours * 60) + +minutes) * 60 + +seconds) * 1000;
		const date = new Date(+year, +month - 1, +day);

		return {
			x: time,
			y: date
		};
	});

	const miny = Math.min(...points.map(p => p.y));
	const maxy = Math.max(...points.map(p => p.y));

	const ONE_DAY = 24 * 60 * 60 * 1000;

	const yticks = [];
	for (let i = miny; i <= maxy; i += ONE_DAY) {
		yticks.push(i);
	}

	const format_day = ms => new Date(ms).toISOString().slice(0, 10);
	const format_time = ms => (ms / (60 * 60 * 1000));
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={ONE_DAY} y1={maxy} y2={miny}>
		<Pancake.Grid horizontal ticks={yticks} let:value let:first>
			<div class="grid-line horizontal"></div>
			<span class="label">{format_day(value)}</span>
		</Pancake.Grid>

		<Pancake.Grid vertical ticks="{[0,4,8,12,16,20,24].map(h => h * 60 * 60 * 1000)}" let:value>
			<div class="grid-line vertical"></div>
			<span class="value">{format_time(value)}:00</span>
		</Pancake.Grid>

		<Pancake.Svg>
			<Pancake.SvgScatterplot data={points} let:d>
				<path class="data" {d}/>
			</Pancake.SvgScatterplot>
		</Pancake.Svg>
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 1em 2em 6em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -1em;
		border-bottom: 1px dashed #ccc;
	}

	.grid-line.vertical {
		height: calc(100% + 1em);
		top: -0.5em;
		border-left: 1px dashed #ccc;
	}

	.label {
		position: absolute;
		left: -6rem;
		transform: translate(0,-50%);
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}

	.value {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -2rem;
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
		stroke: rgba(255, 204, 0, 0.75);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 8px;
		fill: none;
	}
</style>