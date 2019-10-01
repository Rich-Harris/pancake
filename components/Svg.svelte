<svg viewBox="0 0 100 100" preserveAspectRatio="none">
	<slot></slot>
</svg>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	svg :global(*) {
		vector-effect: non-scaling-stroke;
	}
</style>

