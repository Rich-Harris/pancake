<script>
	import ChartPreview from 'components/ChartPreview.svelte';
	import * as _1 from './examples/line-plus-area/index.svelte';
	import * as _2 from './examples/scatterplot/index.svelte';
	import * as _3 from './examples/column/index.svelte';
	import * as _4 from './examples/multiline/index.svelte';
</script>

<svelte:head>
	<title>Pancake • Charts for Svelte apps</title>
</svelte:head>

<h1>Pancake</h1>

<div class="chart-grid">
	<ChartPreview Chart={_1} slug="line-plus-area"/>
	<ChartPreview Chart={_2} slug="scatterplot"/>
	<ChartPreview Chart={_3} slug="column"/>
	<ChartPreview Chart={_4} slug="multiline"/>
</div>

<style>
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
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