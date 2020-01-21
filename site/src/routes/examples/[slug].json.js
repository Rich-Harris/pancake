import fs from 'fs';

export function get(req, res) {
	const { slug } = req.params;

	const dir = `src/routes/examples/${slug}/_chart`;

	if (fs.existsSync(dir)) {
		const files = fs.readdirSync(dir).map(filename => {
			const contents = fs.readFileSync(`${dir}/${filename}`, 'utf-8')
				.replace(/(\.\.\/)+index\.mjs/g, '@sveltejs/pancake');

			return {
				filename,
				contents
			};
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			files
		}));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: 'not found'
		}));
	}
}