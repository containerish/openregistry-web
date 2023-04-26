import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const sortBy = url.searchParams.get('sort_by');
	const namespace = url.searchParams.get('namespace');
	const pageSize = url.searchParams.get('page_size');
	const offset = url.searchParams.get('offset') ?? '0';

	const backendUrl = new URL('/v2/ext/catalog/detail', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);

	if (pageSize) {
		backendUrl.searchParams.set('n', pageSize);
		backendUrl.searchParams.set('last', offset);
	}
	if (namespace) {
		backendUrl.searchParams.set('ns', namespace);
	}

	if (sortBy) {
		backendUrl.searchParams.set('sort_by', sortBy);
	}

	const response = await fetch(backendUrl);

	if (response.status !== 200) {
		return json(await response.json(), { status: response.status });
	}

	return json(await response.json(), { status: 200 });
};
