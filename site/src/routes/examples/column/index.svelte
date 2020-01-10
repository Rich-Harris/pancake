<script context="module">
	import Component from './_chart/index.svelte';

	export const title = 'Column chart';
	export const description = 'A simple column chart.';
	export { Component };
</script>

<h1>{title}</h1>
<p>{description}</p>
<Component/>