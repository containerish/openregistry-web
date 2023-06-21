import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DefaultPageSize } from '$lib/constants';

export const load = async (event: ServerLoadEvent) => {
	const { parent, locals, fetch, url } = event;
	await parent()





	const uri = new URL('/apis/registry/list/catalog', url.origin);
	uri.searchParams.set('namespace', locals.user?.username!);
	uri.searchParams.set('page_size', DefaultPageSize.toString());
	uri.searchParams.set('offset', (DefaultPageSize * 0).toString());
	const response = await fetch(uri);


	return {
		user: locals.user,
		isAuthenticated: locals.authenticated,
		repositories: await response.json(),
		error: null,
	}
}
