import { DefaultPageSize } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { repo, username } = params;
	const ns = `${username}/${repo}`;
	const response = await locals.openRegistry.getRepositoryDetails(ns, DefaultPageSize, 0);
	if (response.success) {
		return {
			repository: response.data,
			namespace: ns,
		};
	}

	return {
		repository: null,
		namespace: ns,
	};
};
