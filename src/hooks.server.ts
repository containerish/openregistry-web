import { session } from './stores/session';
import { redirect, type Handle } from '@sveltejs/kit';
import { createConnectTransport } from '@bufbuild/connect-web';
import { createPromiseClient } from '@bufbuild/connect';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_connect-es/services/kon/github_actions/v1/build_logs_connect';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/public';
import { OpenRegistryClient } from '$lib/client/openregistry';

export const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const sessionId = cookies.get('session_id');
	if (sessionId && (!locals.user || !locals.authenticated)) {
		const user = await locals.openRegistry.getUserBySession(sessionId);
		if (user) {
			session.setUser(user);
			session.setIsAuthenticated(true);
			locals.user = user;
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
		route.startsWith('/settings') || route.startsWith('/repositories') || route.startsWith('/apps')
	);
};

export const setOpenRegistryClientHandler: Handle = async ({ event, resolve }) => {
	const client = new OpenRegistryClient(event.fetch);
	event.locals.openRegistry = client;
	// these are throwing POJO errors
	return await resolve(event);
};

export const handle = sequence(
	setOpenRegistryClientHandler,
	authenticationHandler,
	createProtobufClient
);
