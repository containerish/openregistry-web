import { Auth } from '$apis/auth';
import type { PageServerLoadEvent } from './$types';
import * as cookie from 'cookie';

/** @type {import('./$types').PageServerLoad} */
export async function load(loadEvent: PageServerLoadEvent) {
	const auth = new Auth();
	const { request, params, url } = loadEvent;

	const serverErr = url.searchParams.get('error');
	const serverErrStatus = url.searchParams.get('status');

	if (serverErr && serverErr !== '') {
		return {
			slug: params.slug,
			status: Number(serverErrStatus),
			error: {
				message: decodeURIComponent(serverErr)
			},
			authenticated: false
		};
	}

	const cookies = cookie.parse(request.headers.get('cookie') || '');
	const { data, error, status } = await auth.GetUserWithSession(cookies['session_id']);

	if (error) {
		return {
			slug: params.slug,
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
