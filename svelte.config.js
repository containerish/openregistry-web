import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';
import { sveltekit } from '@sveltejs/kit/vite';
import autoAdapter from '@sveltejs/adapter-auto';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([sveltekit(), preprocessMeltUI()]),
	kit: {
		adapter: getAdapter(),
		alias: {
			'$apis': 'src/apis',
			'$apis/*': 'src/apis/*',
			'$stores': 'src/stores',
			'$stores/*': 'src/stores/*',
		},
	},
};
function getAdapter() {
	if (process.env.PUBLIC_OPEN_REGISTRY_ENVIRONMENT === 'cloudflare') {
		return cloudflareAdapter();
	}
	return autoAdapter();
}
export default config;
