import { redirect } from '@sveltejs/kit';
import { DefaultPageSize } from '$lib/constants';

export const load = async ({ parent, locals, fetch, url, cookies }) => {
	await parent();

	if (!locals.user) {
		cookies.getAll().forEach((c) => {
			cookies.delete(c.name);
		});
		throw redirect(303, '/');
	}

	const uri = new URL('/apis/registry/list/catalog', url.origin);
	uri.searchParams.set('namespace', locals.user.username);
	uri.searchParams.set('page_size', DefaultPageSize.toString());
	uri.searchParams.set('offset', (DefaultPageSize * 0).toString());
	const response = await fetch(uri);

	return {
		user: locals.user,
		isAuthenticated: locals.authenticated,
		repositories: await response.json(),
		error: null
	};
};
