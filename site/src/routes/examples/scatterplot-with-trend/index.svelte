<script context="module">
	import Component from './_chart/index.svelte';

	export const title = 'Scatterplot with trendline';
	export const description = 'A combination of different chart types';
	export { Component };
</script>

<h1>{title}</h1>
<p>{description}</p>
<Component/>