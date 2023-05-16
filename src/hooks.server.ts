import { session } from './stores/session';
import { Auth } from '$apis/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { createConnectTransport } from '@bufbuild/connect-web';
import { createPromiseClient } from '@bufbuild/connect';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_connect-es/services/kon/github_actions/v1/build_logs_connect';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/public';

export const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const sessionId = cookies.get('session_id');
	console.log('cookies in hook: ', cookies);
	console.log('session id cookie in hook: ', sessionId);
	if (sessionId && (!locals.user || !locals.authenticated)) {
		const auth = new Auth();
		const { data, error, status } = await auth.GetUserWithSession(sessionId);
		console.log('user from session: ', data);
		console.log('error from session: ', error);
		console.log('status from session: ', status);
		if (data) {
			session.setUser(data);
			session.setIsAuthenticated(true);
			locals.user = data;
			locals.authenticated = true;
			locals.sessionId = sessionId;
		}
	}
	if (url.pathname === '/search' && !locals.user) {
		return await resolve(event);
	}
	if (isProtectedRoute(url.pathname) && !locals.user) {
		throw redirect(303, '/');
	}

	return await resolve(event);
};

export const createProtobufClient: Handle = async ({ event, resolve }) => {
	const transport = createConnectTransport({
		baseUrl: env.PUBLIC_OPEN_REGISTRY_BACKEND_PROTOBUF_URL
	});
	const ghLogsClient = createPromiseClient(GitHubActionsLogsService, transport);
	event.locals.ghLogsClient = ghLogsClient;

	return await resolve(event);
};

export const isProtectedRoute = (route: string): boolean => {
	return (
		route.startsWith('/settings') ||
		route.startsWith('/repositories') ||
		route.startsWith('/apps')
	);
};

export const handle = sequence(authenticationHandler, createProtobufClient);
