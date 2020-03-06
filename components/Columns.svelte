<script>
	import Box from './Box.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	export let data;
	export let width = 1;
	export let x = d => d.x;
	export let y = d => d.y;
</script>

{#each data as d, i}
	<Box x1="{x(d, i) - width/2}" x2="{x(d, i) + width/2}" y1={0} y2="{y(d, i)}">
		<slot value={d} first="{i === 0}" last="{i === data.length - 1}"/>
	</Box>
{/each}