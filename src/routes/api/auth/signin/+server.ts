import { SignInSchema } from '$lib/formSchemas';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse, splitCookiesString } from 'set-cookie-parser';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	const body = await (async () => {
		const data = await request.json();
		return SignInSchema.safeParse(data);
	})();

	if (!body.success) {
		return json({ error: body.error }, { status: 400 });
	}

	const url = new URL('/auth/signin', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(url, {
		body: JSON.stringify(body.data),
		method: 'POST',
	});

	const data = await response.json();
	if (response.status !== 200) {
		return json(data, { status: response.status });
	}

	const cookieList = parse(splitCookiesString(response.headers.get('set-cookie')!), {
		silent: true,
		decodeValues: true,
	});

	cookieList.forEach((cookie) => {
		cookies.set(cookie.name, cookie.value, {
			domain: cookie.domain,
			// TODO: find a better way to do this
			httpOnly: false,
			// httpOnly: cookie.httpOnly,
			sameSite: getSameSite(cookie.sameSite),
			secure: cookie.secure,
			path: '/',
			expires: cookie.expires,
		});
	});

	return json(data, { status: 200 });
};

const getSameSite = (sameSite?: string) => {
	switch (sameSite) {
		case 'lax':
			return sameSite;
		case 'strict':
			return sameSite;
		default:
			return 'lax';
	}
};
