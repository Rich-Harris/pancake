<script>
	import SvgPolygon from './SvgPolygon.svelte';

	export let data;
	export let floor = 0;
	export let x = d => d.x;
	export let y = d => d.y;

	$: _x = typeof x === 'string' ? d => d[x] : x;
	$: _y = typeof y === 'string' ? d => d[y] : y;

	$: points = [
		{ x: _x(data[0]), y: floor },
		...data.map(d => ({ x: _x(d), y: _y(d) })),
		{ x: _x(data[data.length - 1]), y: floor }
	];
</script>

<SvgPolygon data={points} let:d>
	<slot {d}></slot>
</SvgPolygon>