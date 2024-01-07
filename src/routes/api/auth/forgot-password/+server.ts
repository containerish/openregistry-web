import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const email = url.searchParams.get('email');
	if (!email) {
		return json({ error: 'email is required' }, { status: 400 });
	}
	const backendUrl = new URL('/auth/forgot-password', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	backendUrl.searchParams.set('email', email);
	const response = await fetch(backendUrl);
	if (response.status !== 202) {
		return json(await response.json(), { status: response.status });
	}
	return json(await response.json(), { status: response.status });
};
