import type { HandleClientError } from '@sveltejs/kit';
import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_API_HOST, PUBLIC_POSTHOG_API_KEY, PUBLIC_POSTHOG_UI_HOST } from '$env/static/public';

if (browser && PUBLIC_POSTHOG_API_KEY) {
	posthog.init(PUBLIC_POSTHOG_API_KEY, {
		api_host: PUBLIC_POSTHOG_API_HOST,
		ui_host: PUBLIC_POSTHOG_UI_HOST,
		name: 'OpenRegistry Web',
	});
}

export const handleError: HandleClientError = async ({ error, event }) => {
	console.log('unhandled client exception - route: %s - error: %s', event.route.id, error);

	return {
		message: typeof error === 'string' ? error : JSON.stringify(error),
	};
};
