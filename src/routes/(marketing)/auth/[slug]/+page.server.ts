import { Auth } from '$apis/auth';
import type { PageServerLoadEvent } from './$types';
import * as cookie from 'cookie';

/** @type {import('./$types').PageServerLoad} */
export async function load(loadEvent: PageServerLoadEvent) {
	const auth = new Auth();
	const { request, params, url } = loadEvent;

	let serverErr = url.searchParams.get('error');
	const serverErrStatus = url.searchParams.get('status');

	if (serverErr && serverErr !== '') {
		try {
			const errJson = JSON.parse(serverErr) as { error: string; message: string };
			serverErr = decodeURIComponent(errJson.message);
		} catch {
			serverErr = decodeURIComponent(serverErr);
		}

		console.log('server error:', serverErr);
		return {
			slug: params.slug,
			status: Number(serverErrStatus),
			error: {
				message: serverErr
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
