import { Auth } from '../../../apis/auth';
import type { PageServerLoadEvent } from './$types';
import * as cookie from 'cookie';

/** @type {import('./$types').PageServerLoad} */
export async function load(loadEvent: PageServerLoadEvent) {
	const auth = new Auth();
	const { request, params } = loadEvent;

	const cookies = cookie.parse(request.headers.get('cookie') || '');
	const { data, error, status } = await auth.GetUserWithSession(cookies['session_id']);

	if (error) {
		return {
			status: status,
			error: JSON.stringify(error.message),
			authenticated: false
		};
	}

	return {
		user: data,
		authenticated: true,
		slug: params.slug
	};
}
