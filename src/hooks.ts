import cookie from 'cookie';
import { Auth } from './apis/auth';
import sessionStore from './stores/session';

const auth = new Auth()

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
	const cookies = cookie.parse(event.request.headers.get('cookie')|| '')
	const sessionId = cookies.session_id;
	if (sessionId) {
		const {data, error, status} = await auth.GetUserWithSession()
		// status: 226 is the max good status
		if (data && status <= 226) {
			event.locals.authenticated = true
			event.locals.user = data;
			event.locals.user.sessionId = sessionId
			sessionStore.set({
				isAuthenticated: true,
				user: data,
			});
			const resp = await resolve(event)
			return resp
		}

		event.locals.error = error;
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
