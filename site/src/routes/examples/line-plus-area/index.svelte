<script context="module">
	import Component from './_chart/index.svelte';

	export const title = 'Line + Area';
	export const description = 'A simple line and area chart.';
	export { Component };
</script>

<h1>{title}</h1>
<p>{description}</p>
<Component/>