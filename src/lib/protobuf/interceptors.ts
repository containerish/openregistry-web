import type { Interceptor } from '@connectrpc/connect';
import type { Cookies } from '@sveltejs/kit';
import { parse, splitCookiesString } from 'set-cookie-parser';

export const setCookies = (cookies: Cookies): Interceptor => {
	return (next) => async (req) => {
		const cookiesAsString = cookies
			.getAll()
			.map((cookie) =>
				cookies.serialize(cookie.name, cookie.value, {
					path: '/',
				})
			)
			.join('; ');
		const accessToken = cookies.get('access_token');
		if (accessToken) {
			req.header.set('Authorization', `Bearer ${accessToken}`);
		}
		req.header.set('cookie', cookiesAsString);
		return await next(req);
	};
};

export const setClientSideCookies: Interceptor = (next) => {
	return async (req) => {
		if (document.cookie) {
			const cookieList = parse(splitCookiesString(document.cookie));

			const accessToken = cookieList.find((c) => c.name === 'access_token' || c.name === 'access');
			if (accessToken) {
				req.header.set('Authorization', `Bearer ${accessToken.value}`);
			}
		}
		return await next(req);
	};
};
