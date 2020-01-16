<script>
	import * as Pancake from '../../../../../../index.mjs';
	import points from './points.js';

	const fruits = ['apples', 'bananas', 'cherries', 'dates'];
	const colors = ['#00e047', '#7ceb68', '#b7f486', '#ecfda5'];

	const create_stacks = (data, keys, x = d => d.x) => {
		if (typeof x === 'string') {
			const key = x;
			x = d => d[key];
		}

		const stacks = data.map(d => {
			const x1 = x(d) - 0.5;
			const x2 = x1 + 1;

			const stack = keys.map(key => ({
				key,
				value: d[key],
				x1,
				x2,
				y1: null,
				y2: null
			}));

			let acc = 0;

			stack.forEach(d => {
				d.y1 = acc;
				d.y2 = acc += d.value;
			});

			return stack;
		});

		return keys.map(key => ({
			key,
			values: stacks.map(s => {
				return s.find(d => d.key === key);
			})
		}));
	};

	const stacks = create_stacks(points, fruits, 'year');

	const max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.y2)), 0);
</script>

<div class="chart">
	<Pancake.Chart x1={2019.5} x2={2015.5} y1={0} y2={max}>
		<Pancake.Grid horizontal count={5} let:value let:first>
			<div class="grid-line horizontal"><span>{value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<span class="year-label">{value}</span>
		</Pancake.Grid>

		{#each stacks as stack, i}
			<Pancake.Boxes data={stack.values}>
				<div class="box" style="background-color: {colors[i]}"></div>
			</Pancake.Boxes>
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 200px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 0;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		line-height: 1;
	}

	.year-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.box {
		position: absolute;
		left: 2px;
		top: 0;
		width: calc(100% - 4px);
		height: 100%;
		border-radius: 2px;
	}
</style>