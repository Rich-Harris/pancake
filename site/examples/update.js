const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { get } = require('httpie');
const manifest = require('./manifest.json');

process.chdir(__dirname);

const exec = cmd => new Promise((fulfil, reject) => {
	child_process.exec(cmd, (err, stdout, stderr) => {
		if (err) {
			reject(err);
		} else {
			fulfil({ stdout, stderr });
		}
	});
});

async function main() {
	await exec(`rm -rf data`);

	const names = new Map();

	for (const id of manifest) {
		const { data } = await get(`https://svelte.dev/repl/${id}.json`);

		await exec(`mkdir -p data/${id}`);

		names.set(id, data.name.replace('Pancake • ', ''));

		fs.writeFileSync(`data/${id}/meta.json`, JSON.stringify({
			name: data.name
		}));

		data.files.forEach(file => {
			fs.writeFileSync(`data/${id}/${file.name}`, file.source);
		});
	}

	const index = `
	<script>
		${manifest.map((id, i) => `import Chart${i+1} from './${id}/App.svelte';`).join('\n')}
	</script>
	${manifest.map((id, i) => `
	<div class="chart-preview">
		<h2><a href="https://svelte.dev/repl/${id}">${names.get(id)}</a></h2>
		<Chart${i+1}/>
	</div>`).join('\n\n')}
	`.replace(/^\t/gm, '').trim();

	fs.writeFileSync(`data/index.svelte`, index);
}

main();