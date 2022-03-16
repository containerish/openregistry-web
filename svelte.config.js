import preprocess from 'svelte-preprocess';
import cfAdapter from '@sveltejs/adapter-cloudflare';
import autoAdapter from '@sveltejs/adapter-auto';

const getAdapter = () => {
	const env = process.env.VITE_OPEN_REGISTRY_ENVIRONMENT;

	if (env && env.toLowerCase() == "cloudflare") {
		return cfAdapter;
	}

	return autoAdapter;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess({})],
	kit: {
		adapter: getAdapter()(),
	}
};

export default config;
