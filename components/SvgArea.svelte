<script>
	import SvgPolygon from './SvgPolygon.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	export let data;
	export let floor = 0;
	export let x = default_x;
	export let y = default_y;

	$: points = [
		{ x: x(data[0], 0), y: floor },
		...data.map((d, i) => ({ x: x(d, i), y: y(d, i) })),
		{ x: x(data[data.length - 1], data.length - 1), y: floor }
	];
</script>

<SvgPolygon data={points} let:d>
	<slot {d}></slot>
</SvgPolygon>