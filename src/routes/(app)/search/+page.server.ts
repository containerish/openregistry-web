import { DefaultPageSize } from '$lib/constants';
import type { RepositoryCatalog } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
	let catalog: RepositoryCatalog = {
		total: 0,
		repositories: [],
	};
	const query = url.searchParams.get('q');
	if (query) {
		const response = await locals.openRegistry.searchRepositories(query);
		if (response.success) {
			catalog = response.data;
		}
	} else {
		const response = await locals.openRegistry.getDetailedCatalog(DefaultPageSize);
		if (response.success) {
			catalog = response.data;
		}
	}

	return {
		user: locals.user,
		authenticated: locals.authenticated,
		catalog,
	};
};
