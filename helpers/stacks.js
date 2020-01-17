export function stacks (data, keys, i = (d, i) => i) {
	if (typeof i === 'string') {
		const key = i;
		i = d => d[key];
	}

	const stacks = data.map(d => {
		const stack = keys.map(key => ({
			key,
			value: d[key],
			i: i(d),
			start: null,
			end: null
		}));

		let acc = 0;

		stack.forEach(d => {
			d.start = acc;
			d.end = acc += d.value;
		});

		return stack;
	});

	return keys.map(key => ({
		key,
		values: stacks.map(s => {
			return s.find(d => d.key === key);
		})
	}));
}