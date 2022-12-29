import { session } from './stores/session';
import { Auth } from "./apis/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, request, locals, url } = event;
	const sessionId = cookies.get('session_id')
	if (sessionId && (!locals.user || !locals.authenticated)) {
		const auth = new Auth();
		const { data, error, status } = await auth.GetUserWithSession(sessionId);
		if (data) {
			session.setUser(data)
			session.setIsAuthenticated(true)
			locals.user = data
			locals.authenticated = true
			locals.sessionId = sessionId
		}
	}

	if (isProtectedRoute(url.pathname) && !locals.user) {
		throw redirect(303, '/')
	}

	return await resolve(event)
}

export const isProtectedRoute = (route: string): boolean => {
	return route.startsWith('/settings') ||
		route.startsWith('/repositories') ||
		route.startsWith('/apps') ||
		route.startsWith('/faq')
}
