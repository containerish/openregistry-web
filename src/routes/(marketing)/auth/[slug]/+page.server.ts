import { redirect } from '@sveltejs/kit';

/* eslint-disable no-case-declarations */
export async function load({ params, locals, cookies, url }) {
	let serverErr = url.searchParams.get('error');
	const serverErrStatus = url.searchParams.get('status');

	if (serverErr) {
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

	switch (params.slug) {
		case 'verify':
			const response = await locals.openRegistry.verifyEmail(
				url.searchParams.get('token') ?? ''
			);
			if (response.status !== 200) {
				console.log('verify email response');
				return;
			}
			throw redirect(307, '/repositories');
		case 'forgot-password':
			console.log('forgot-password-callback');
			break;
		case 'github-login-callback':
			console.log('github-login-callback');
			break;
		case 'unhandled':
			console.log('unhandled callback');
			break;
		default:
			console.log('default callback');
	}

	const user = await locals.openRegistry.getUserBySession(cookies.get('session_id') ?? '');
	if (!user) {
		return {
			slug: params.slug,
			status: 401,
			error: 'user not authenticated',
			authenticated: false
		};
	}

	return {
		user: user,
		authenticated: true,
		slug: params.slug
	};
}
