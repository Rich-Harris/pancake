<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	const { x: x_scale, y: y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let plotGaps = false

	let d

	$: if (plotGaps) {
		d = 'M' + data
			.map(d => `${$x_scale(x(d))},${$y_scale(y(d))}`)
			.join('L')
	}
	else {
		d = data
		.map((d, i) => {
			let motion = 'L'
			if (y(d) == null) {
				return
			}
			if (i == 0 || y(data[i - 1]) == null) {
				motion = 'M'
			}
			return `${motion}${$x_scale(x(d))},${$y_scale(y(d))}`
		})
		.join('')
	}
</script>

<slot {d}></slot>
