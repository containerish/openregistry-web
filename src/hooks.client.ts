import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event }) => {
	console.log('unhandled client exception - route: %s - error: %s', event.route.id, error);

	return {
		message: typeof error === 'string' ? error : JSON.stringify(error)
	};
};
