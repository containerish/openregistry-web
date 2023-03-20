import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	if (locals.user || url.pathname === '/search') {
		return {
			user: locals.user,
			pathname: url.pathname
		};
	}
	throw error(401, {
		message: 'please login'
	});
}) satisfies LayoutServerLoad;
