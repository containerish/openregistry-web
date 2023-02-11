import preprocess from 'svelte-preprocess';
import autoAdapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({})],
	kit: {
		adapter: autoAdapter(),
		alias: {
			'$apis': 'src/apis',
			'$stores': 'src/stores',
		},
}
};

export default config;
