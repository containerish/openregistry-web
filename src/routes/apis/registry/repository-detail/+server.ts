import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';
import { DefaultPageSize } from '$lib/constants';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const namespace = url.searchParams.get('namespace');
	const pageSize = url.searchParams.get('pageSize') ?? DefaultPageSize;
	const offset = url.searchParams.get('offset') ?? 0;
	const backendUrl = new URL(
		`/v2/ext/catalog/repository?ns=${namespace}&n=${pageSize}&offset=${offset}`,
		env.PUBLIC_OPEN_REGISTRY_BACKEND_URL
	);
	const response = await fetch(backendUrl);
	if (response.status !== 200) {
		return json(await response.json(), { status: response.status });
	}
	return json(await response.json(), { status: 200 });
};
