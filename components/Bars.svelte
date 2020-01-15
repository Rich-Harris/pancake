<script>
	import Boxes from './Boxes.svelte';

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	$: boxes = data.map(d => ({
		right: _x(d),
		bottom: _y(d) - 0.5,
		top: _y(d) + 0.5
	}));
</script>

<Boxes data={boxes} let:value let:first let:last>
	<slot {value} {first} {last}/>
</Boxes>