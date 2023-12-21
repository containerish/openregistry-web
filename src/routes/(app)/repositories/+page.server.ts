import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		cookies.getAll().forEach((c) => {
			cookies.delete(c.name, {
				path: '/',
			});
		});
		redirect(303, '/');
	}

	const { repositories, total } = await locals.openRegistry.getUserRepositoryCatalog();
	return {
		user: locals.user,
		isAuthenticated: locals.authenticated,
		repositories,
		total,
		error: null,
	};
};
