import type { PageServerLoad } from './$types';
import { DefaultPageSize } from '$lib/constants';

export const load: PageServerLoad = async ({ request, cookies, parent, locals, fetch, url }) => {
	await parent();

	console.log('cookies: ', cookies.getAll());
	console.log('request: ', request);
	const uri = new URL('/apis/registry/list/catalog', url.origin);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	uri.searchParams.set('namespace', locals.user?.username!);
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
