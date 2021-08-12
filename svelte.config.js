import path from 'path';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		package: {
			exports: {
				include: ['index.js']
			}
		},

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					'@sveltejs/pancake': [path.resolve('src/lib')]
				}
			},
			ssr: {
				noExternal: ['d3-hierarchy']
			}
		}
	}
};

export default config;
