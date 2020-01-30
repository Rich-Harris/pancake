<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import * as yootils from 'yootils';
	import Treemap from './Treemap.svelte';
	import data from './data.js';

	const treemap = d3.treemap();

	const hierarchy = d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => b.value - a.value)

	const root = treemap(hierarchy);

	let selected = root;

	const select = node => {
		while (node.parent && node.parent !== selected) {
			node = node.parent;
		}

		if (node && node.children) selected = node;
	};

	const breadcrumbs = node => {
		const crumbs = [];
		while (node) {
			crumbs.unshift(node.data.name)
			node = node.parent;
		}

		return crumbs.join('/');
	};

	const extents = spring(undefined, {
		precision: 0.0001,
		stiffness: 0.2
	});
	
	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0
	};
</script>

<button class="breadcrumbs" disabled="{!selected.parent}" on:click="{() => selected = selected.parent}">
	{breadcrumbs(selected)}
</button>

<div class="chart">
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
			{#if (node.parent === selected) || (node === selected && !node.children)}
				<div
					transition:fade={{duration:400}}
					class="node"
					class:leaf={!node.children}
					on:click="{() => select(node)}"
				>
					<div class="info">
						<strong>{node.data.name}</strong>
						<span>{yootils.commas(node.value)}</span>
					</div>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>

<p>Based on <a href="https://observablehq.com/@d3/zoomable-treemap">Zoomable Treemap by Mike Bostock</a>.</p>

<style>
	.breadcrumbs {
		width: 100%;
		/* height: 40px; */
		padding: 0.3rem 0.4rem;
		background-color: transparent;
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: none;
		cursor: pointer;
	}

	.breadcrumbs:disabled {
		cursor: default;
	}

	.chart {
		width: calc(100% + 3px);
		height: 400px;
		padding: 0;
		margin: 0 0 36px 0;
		overflow: hidden;
		border-bottom: 1px solid white;
		border-right: 1px solid white;
		box-sizing: border-box;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		border-right: 3px solid white;
		border-top: 3px solid white;
		box-sizing: border-box;
		background-color: rgba(103,103,120,0.5);
		transition: opacity 0.4s;
		overflow: hidden;
		pointer-events: all;
		border-radius: 4px;
	}

	.node:not(.leaf) {
		background-color: rgba(103,103,120,1);
		color: white;
		cursor: pointer;
	}

	.info {
		padding: 0.3rem 0.4rem;
		color: white;
	}

	strong, span {
		display: block;
		font-size: 12px;
		white-space: nowrap;
		line-height: 1;
	}
</style>