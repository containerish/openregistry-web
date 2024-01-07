import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse, splitCookiesString } from 'set-cookie-parser';
import type { WebAuthnFinishLoginRequestType } from '$lib/types/webauthn';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	let body: WebAuthnFinishLoginRequestType;
	try {
		body = (await request.json()) as WebAuthnFinishLoginRequestType;
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}

	const url = new URL('/auth/webauthn/login/finish', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	url.searchParams.set('username', body.username);
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body.credentials),
		});
		if (!response.ok) {
			const data = (await response.json()) as { message: string; error: string };
			return json({ error: { code: response.status, message: data.message } }, { status: response.status });
		}

		const responseCookies = response.headers.get('set-cookie');
		if (!responseCookies) {
			return json({ errro: { code: 401, message: 'Received invalid response from server' } }, { status: 401 });
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const cookieList = parse(splitCookiesString(responseCookies), {
			silent: true,
			decodeValues: true,
		});

		cookieList.forEach((cookie) => {
			cookies.set(cookie.name, cookie.value, {
				domain: cookie.domain,
				httpOnly: cookie.httpOnly,
				sameSite: getSameSite(cookie.sameSite),
				secure: cookie.secure,
				path: '/',
				expires: cookie.expires,
			});
		});

		return json((await response.json()) as { message: string }, { status: 200 });
	} catch (err) {
		return json({ error: { code: 500, message: (err as Error).message } }, { status: 500 });
	}
};

const getSameSite = (sameSite?: string) => {
	switch (sameSite) {
		case 'lax':
			return sameSite;
		case 'strict':
			return sameSite;
		case 'none':
			return 'none';
		default:
			return 'lax';
	}
};
