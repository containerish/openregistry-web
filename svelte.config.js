import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoAdapter from '@sveltejs/adapter-auto';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: getAdapter(),
		alias: {
			$apis: 'src/apis',
			$stores: 'src/stores',
		},
	},
};

function getAdapter() {
	if (process.env.PUBLIC_OPEN_REGISTRY_ENVIRONMENT === 'cloudflare' || process.env.CF_PAGES) {
		return cloudflareAdapter();
	}
	return autoAdapter();
}

export default config;
