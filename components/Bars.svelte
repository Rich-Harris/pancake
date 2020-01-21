<script>
	import Box from './Box.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	export let data;
	export let x = d => d.x;
	export let y = d => d.y;
</script>

{#each data as d, i}
	<Box y1="{y(d) - 0.5}" y2="{y(d) + 0.5}" x1={0} x2={x(d)}>
		<slot value={d} first="{i === 0}" last="{i === data.length - 1}"/>
	</Box>
{/each}