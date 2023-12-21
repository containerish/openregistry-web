import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
    const query = url.searchParams.get('query');
    if (!query) {
        return json({ error: 'query cannot be empty' }, { status: 400 });
    }
    const backendUrl = new URL(`/v2/ext/catalog/search?search_query=${query}`, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
    backendUrl.searchParams.set('query', query);
    const response = await fetch(backendUrl);
    return json(await response.json(), { status: 200 });
};
