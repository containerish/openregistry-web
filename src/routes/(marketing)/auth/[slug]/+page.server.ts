export async function load({ params, locals, cookies, url }) {
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
