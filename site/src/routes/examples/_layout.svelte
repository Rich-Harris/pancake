<script context="module">
	export async function preload(page) {
		const slug = page.path.split('/').pop();

		const r = await this.fetch(`examples/${slug}.json`);
		const data = await r.json();

		return data;
	}
</script>

<script>
	import Viewer from 'components/Viewer.svelte';
	export let files;
</script>

<main>
	<slot></slot>
	<!-- <Viewer {files}/> -->
</main>

<style>
	main {
		max-width: 56em;
		margin: 0 auto;
	}
</style>