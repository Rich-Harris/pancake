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

	for (let i = 0; i < manifest.length; i += 1) {
		const id = manifest[i];

		const { data } = await get(`https://svelte.dev/repl/${id}.json`);

		await exec(`mkdir -p data/${i}`);

		names.set(id, data.name.replace('Pancake • ', ''));

		fs.writeFileSync(`data/${i}/meta.json`, JSON.stringify({
			name: data.name
		}));

		data.files.forEach(file => {
			fs.writeFileSync(`data/${i}/${file.name}`, file.source);
		});
	}

	manifest.shift();

	const index = `
	<script>
		${manifest.map((id, i) => `import Chart${i+1} from './${i+1}/App.svelte';`).join('\n\t')}
	</script>
	${manifest.map((id, i) => `
	<div class="chart-preview">
		<header>
			<h3>${names.get(id)}</h3>
			<p><a href="https://svelte.dev/repl/${id}">Edit</a></p>
		</header>
		<Chart${i+1}/>
	</div>`).join('\n\n')}

	<style>
		header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			border-bottom: 1px solid rgba(255,62,0,0.2);
			margin: 0 0 1em 0;
			padding: 0 0 3px 0px;
			overflow: hidden;
		}

		h3 {
			/*border-bottom: 3px solid #ddd;*/
			margin: 0;
			line-height: 1;
		}

		.chart-preview {
			margin: 2em 0 6em 0;
		}

		p {
			margin: 0;
			line-height: 1;
		}

		a {
			font-size: 14px;
			color: #ff3e00;
			border-bottom: 6px solid rgba(255,62,0,0.2);
			text-decoration: none;
		}
	</style>
	`.replace(/^\t/gm, '').trim();

	fs.writeFileSync(`data/index.svelte`, index);
}

main();