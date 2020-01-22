<script>
	import ChartPreview from 'components/ChartPreview.svelte';
	import CarbonTracker from './examples/scatterplot-with-trend/_chart/index.svelte';
	import Examples from '../../examples/data/index.svelte';

	// import * as _1 from './examples/line-plus-area/index.svelte';
	// import * as _2 from './examples/scatterplot/index.svelte';
	// import * as _3 from './examples/column/index.svelte';
	// import * as _4 from './examples/column-stacked/index.svelte';
	// import * as _5 from './examples/bar/index.svelte';
	// import * as _6 from './examples/bar-stacked/index.svelte';
	// import * as _7 from './examples/multiline/index.svelte';
	// import * as _8 from './examples/area-stacked/index.svelte';
	// import * as _9 from './examples/cleveland-dot-plot/index.svelte';
	// import * as _10 from './examples/time-of-day-plot/index.svelte';
	// import * as _11 from './examples/histogram/index.svelte';
	// import * as _12 from './examples/small-multiples/index.svelte';
</script>

<svelte:head>
	<title>Pancake • Charts for Svelte apps</title>
</svelte:head>

<header>
	<h1>
		Pancake
		<small>Responsive charts. JavaScript optional.</small>
	</h1>

	<p>Pancake is a charting library for <a href="https://svelte.dev">Svelte</a> applications that allows you to visualize data with a combination of HTML, SVG and (soon) canvas/WebGL.</p>

	<p>Unlike most charting libraries, Pancake is designed with <em>server-side rendering</em> in mind, meaning you can create beautiful responsive charts that may not even need JavaScript to render.</p>
</header>

<section class="hero">
	<CarbonTracker/>
</section>

<section>
	<h2>Usage</h2>
	<p>Documentation is TODO. In the meantime, here are some examples:</p>
</section>

<section class="examples">
	<h2>Examples</h2>
	<div class="chart-grid">
		<!-- <ChartPreview Chart={_1} slug="line-plus-area"/>
		<ChartPreview Chart={_2} slug="scatterplot"/>
		<ChartPreview Chart={_3} slug="column"/>
		<ChartPreview Chart={_4} slug="column-stacked"/>
		<ChartPreview Chart={_5} slug="bar"/>
		<ChartPreview Chart={_6} slug="bar-stacked"/>
		<ChartPreview Chart={_7} slug="multiline"/>
		<ChartPreview Chart={_8} slug="area-stacked"/>
		<ChartPreview Chart={_9} slug="cleveland-dot-plot"/>
		<ChartPreview Chart={_10} slug="time-of-day-plot"/>
		<ChartPreview Chart={_11} slug="histogram"/>
		<ChartPreview Chart={_12} slug="small-multiples"/> -->
		<Examples/>
	</div>
</section>

<style>
	header {
		max-width: 56rem;
		margin: 0 auto;
	}

	.hero {
		margin: 0 auto 4em auto;
		max-width: 80em;
	}

	section {
		max-width: 56em;
		margin: 0 auto 4em auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: lowercase;
		font-weight: 400;
		margin: 0 0 0.5em 0;
	}

	small {
		color: #999;
		font-size: 0.5em;
		display: block;
	}

	.examples {
		max-width: 56rem;
		margin: 0 auto;
	}

	h2 {
		font-size: 2em;
	}

	.chart-grid {
		display: grid;
		grid-column-gap: 3em;
		grid-row-gap: 1em;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	@media (min-width: 960px) {
		.chart-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>