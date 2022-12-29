import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async (event: ServerLoadEvent) => {
	const { parent, locals } = event;
	await parent()
	return {
		user: locals.user,
		isAuthenticated: locals.authenticated,
		error: null,
	}
}
