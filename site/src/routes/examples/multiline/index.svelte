<script context="module">
	import Component from './_chart/index.svelte';

	export const title = 'Multiline';
	export const description = 'TODO quadtree hover thingy';
	export { Component };
</script>

<h1>{title}</h1>
<p>{description}</p>
<Component/>