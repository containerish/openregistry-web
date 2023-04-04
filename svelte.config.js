import { vitePreprocess } from '@sveltejs/kit/vite';
import autoAdapter from '@sveltejs/adapter-auto';
import cloudflareAdapter from "@sveltejs/adapter-cloudflare"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: getAdapter(),
        alias: {
            '$apis': 'src/apis',
            "$apis/*": "src/apis/*",
            "$stores": "src/stores",
            "$stores/*": "src/stores/*",
        },
    }
};

function getAdapter() {
    if (process.env.PUBLIC_OPEN_REGISTRY_ENVIRONMENT === "cloudflare") {
        return cloudflareAdapter()
    }

    return autoAdapter()
}

export default config;
