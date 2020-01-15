<script>
	import { spring } from 'svelte/motion';
	import * as Pancake from '../../../../../../index.mjs';

	export let data;
	export let auto;
	export let y1;
	export let y2;

	$: y = data.map(d => d.y);
	$: miny = Math.min(...y);
	$: maxy = Math.max(...y);

	const _y1 = spring();
	const _y2 = spring();

	$: $_y1 = auto ? miny : y1;
	$: $_y2 = auto ? maxy : y2;
</script>


<Pancake.Chart x1={0} x2={9} y1={$_y1} y2={$_y2}>
	<Pancake.Svg>
		<Pancake.SvgLine data={data} let:d>
			<path class="data" {d}/>
		</Pancake.SvgLine>
	</Pancake.Svg>
</Pancake.Chart>

<style>
	.data {
		stroke: black;
		stroke-width: 2px;
		fill: none;
	}
</style>