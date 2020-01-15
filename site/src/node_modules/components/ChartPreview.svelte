<script>
	export let Chart;
	export let slug;
</script>

<div class="chart-preview">
	<h2><a href="examples/{slug}">{Chart.title}</a></h2>
	<svelte:component this={Chart.Component}/>
</div>