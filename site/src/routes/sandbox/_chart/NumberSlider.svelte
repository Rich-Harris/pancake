<script>
	export let min = 0;
	export let max = 100;
	export let step = 1;

	export let value = max;

	const start = e => {
		console.log(e);
	};
</script>

<span on:pointerdown={start}>{value}</span>