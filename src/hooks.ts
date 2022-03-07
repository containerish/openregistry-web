import cookie from 'cookie';
import { Auth } from './apis/auth';

const auth = new Auth()

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
	const cookies = cookie.parse(event.request.headers.get('cookie')|| '')
	const sessionId = cookies.session_id;
	if (sessionId) {
		const userInfo = await auth.GetUserWithSession(sessionId)
		if (userInfo && userInfo.status === 200) {
			event.locals.authenticated = true
			event.locals.user = userInfo.body;
			event.locals.user.sessionId = sessionId
			const resp = await resolve(event)
			return resp
		}
	}

	event.locals.authenticated = false;
	const resp = await resolve(event);
	return resp
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({locals}) {
	const isAuth = locals.authenticated
	if (!isAuth) {
		return {
			authenticated: isAuth,
		}
	}

	return {
		authenticated: isAuth,
		user: locals.user,
	}
}
