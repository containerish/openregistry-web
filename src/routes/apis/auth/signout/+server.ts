import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const DELETE: RequestHandler = async ({ fetch, cookies, locals }) => {
	try {
		const url = new URL('/auth/signout', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const response = await fetch(url, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				cookie: `session_id=${cookies.get('session_id')}`
			}
		});
		const data = await response.json();
		if (response.status !== 202) {
			return json(data, { status: 400 });
		}
		return json(data, { status: response.status });
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}
};
