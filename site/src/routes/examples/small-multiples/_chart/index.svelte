<script>
	import LineChart from './LineChart.svelte';
	import series from './series.js';

	let auto = true;

	let y1 = Infinity;
	let y2 = -Infinity;

	series
		.sort((a, b) => b[b.length - 1].y - a[a.length - 1].y)
		.forEach(s => {
			s.forEach(d => {
				if (d.y < y1) y1 = d.y;
				if (d.y > y2) y2 = d.y;
			});
		});
</script>

<div class="chart">
	<div class="controls">
		<label>
			<input type="radio" bind:group={auto} value={true}> Individual scales
		</label>

		<label>
			<input type="radio" bind:group={auto} value={false}> Shared scales
		</label>
	</div>

	{#each series as s}
		<div class="multiple">
			<LineChart auto={auto} {y1} {y2} data={s}/>
		</div>
	{/each}
</div>

<style>
	.chart {
		position: relative;
		height: 200px;
		padding: 2em 0 0 0;
		margin: 0 0 36px 0;
		display: grid;
		grid-gap: 0.5em;
		grid-template-columns: repeat(9, 1fr);
		box-sizing: border-box;
	}

	.controls {
		position: absolute;
		left: 0;
		top: 0;
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

	path.data {
		stroke: rgb(171, 0, 214);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 6px;
		fill: none;
	}
</style>