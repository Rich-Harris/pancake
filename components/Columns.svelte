<script>
	import Boxes from './Boxes.svelte';

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	$: boxes = data.map(d => ({
		y2: _y(d),
		x1: _x(d) - 0.5,
		x2: _x(d) + 0.5
	}));
</script>

<Boxes data={boxes} let:value let:first let:last>
	<slot {value} {first} {last}/>
</Boxes>