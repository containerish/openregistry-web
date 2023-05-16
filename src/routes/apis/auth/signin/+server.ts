import { SignInSchema } from '$lib/formSchemas';
import type { SigninRequestType } from '$lib/types/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import { parse, splitCookiesString } from 'set-cookie-parser';

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	let body: SigninRequestType;
	try {
		body = SignInSchema.parse(await request.json());
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}
	const url = new URL('/auth/signin', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(url, {
		body: JSON.stringify(body),
		method: 'POST',
		credentials: 'include'
	});

	if (response.status !== 200) {
		return json(await response.json(), { status: response.status });
	}

	const cookieList = parse(splitCookiesString(response.headers.get('set-cookie')!), {
		silent: true,
		decodeValues: true
	});

	cookieList.forEach((cookie) => {
		cookies.set(cookie.name, cookie.value, {
			domain: cookie.domain,
			httpOnly: cookie.httpOnly,
			sameSite: getSameSite(cookie.sameSite),
			secure: cookie.secure,
			path: '/',
			expires: cookie.expires
		});
	});

	console.log('header cookies: ', cookieList);
	console.log('all cookies: ', cookies.getAll());
	return json(await response.json(), { status: 200 });
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
