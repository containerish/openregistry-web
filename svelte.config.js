import preprocess from 'svelte-preprocess';
import autoAdapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({})],
	kit: {
		adapter: autoAdapter(),
	}
};

export default config;
