import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { DefaultPageSize } from '$lib/constants';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const GET: RequestHandler = async ({ fetch, url }) => {
    const namespace = url.searchParams.get('namespace');
    const pageSize = url.searchParams.get('pageSize') ?? DefaultPageSize;
    const offset = url.searchParams.get('offset') ?? 0;
    const backendUrl = new URL(
        `/v2/ext/catalog/repository?ns=${namespace}&n=${pageSize}&offset=${offset}`,
        PUBLIC_OPEN_REGISTRY_BACKEND_URL
    );
    const response = await fetch(backendUrl);
    if (response.status !== 200) {
        return json(await response.json(), { status: response.status });
    }
    return json(await response.json(), { status: 200 });
};
