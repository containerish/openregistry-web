import type { PageLoad } from './$types';

export async function load<PageLoad>({ params }) {
	return {
		repo: params.repo,
		username: params.username
	};
}
