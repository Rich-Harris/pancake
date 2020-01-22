<script>
	import * as Pancake from '@sveltejs/pancake';
	import data from './data.js';

	let bins = 40;

	function generate_histogram(data, bins, min = data[0], max = data[data.length - 1]) {
		const histogram = [];

		const step = (max - min) / bins;
		let i = 0;

		for (let b = 0; b < bins; b += 1) {
			const x1 = min + (b * step);
			let x2 = x1 + step;

			const bin = {
				x1, x2, count: 0
			};

			if (b === bins - 1) x2 = Infinity;

			while (i < data.length && data[i] < x2) {
				bin.count += 1;
				i += 1;
			}

			histogram.push(bin);
		}

		const total = histogram.reduce((acc, bin) => acc + bin.count, 0);

		return histogram;
	}

	$: histogram = generate_histogram(data, bins);

	$: max = Math.max(...histogram.map(bin => bin.count));
</script>

<div class="chart">
	<label>
		<input type=range min={4} max={100} bind:value={bins}> {bins} bins
	</label>

	<Pancake.Chart x1={0} x2={28} y1={0} y2={max}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal" class:first><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={15} let:value>
			<span class="year-label">{value}</span>
		</Pancake.Grid>

		{#each histogram as d}
			<Pancake.Box x1={d.x1} x2={d.x2} y1={0} y2={d.count}>
				<div class="column"></div>
			</Pancake.Box>
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		position: relative;
		height: 200px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
	}

	label {
		position: absolute;
		right: 0;
		top: 2em;
		width: 60%;
		display: flex;
	}

	input {
		flex: 1;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
	}

	.grid-line.horizontal.first {
		border-bottom: 1px solid black;
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
		left: 0;
		bottom: 0;
		width: calc(100% + 1px);
		height: 100%;
		/* background-color: rgb(0,224,71); */
		border: 1px solid black;
		border-bottom: none;
		box-sizing: border-box;
	}
</style>