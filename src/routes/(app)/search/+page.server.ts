import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
	if (!locals.user) {
		cookies.getAll().forEach((c) => {
			cookies.delete(c.name, {
				path: '/',
			});
		});
		redirect(303, '/');
	}

	return {
		user: locals.user,
		query: url.searchParams.get('q'),
		authenticated: locals.authenticated,
	};
};
