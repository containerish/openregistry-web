import type { Handle, HandleServerError } from '@sveltejs/kit';
import { OpenRegistryClient } from '$lib/client/openregistry';
import { redirect } from '@sveltejs/kit';
import { createConnectTransport } from '@connectrpc/connect-web';
import { createClient } from '@connectrpc/connect';
import { sequence } from '@sveltejs/kit/hooks';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_logs_pb';
import { GithubActionsBuildService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_job_pb';
import { GitHubActionsProjectService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
import { ClairService } from '@buf/containerish_openregistry.bufbuild_es/services/yor/clair/v1/clair_pb';
import { OPEN_REGISTRY_BACKEND_PROTOBUF_URL, OPEN_REGISTRY_BACKEND_CLAIR_URL } from '$env/static/private';
import { setCookies } from '$lib/protobuf/interceptors';

const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const sessionId = cookies.get('session_id');
	if (sessionId && (!locals.user || !locals.authenticated)) {
		const user = await locals.openRegistry.getUserBySession(sessionId);
		if (user) {
			locals.user = user;
			locals.authenticated = true;
			locals.sessionId = sessionId;
		}
	}
	if (url.pathname === '/search' && !locals.user) {
		return await resolve(event);
	}

	if (isProtectedRoute(url.pathname) && !locals.user) {
		event.cookies.getAll().forEach((c) => {
			event.cookies.delete(c.name, {
				path: '/',
			});
		});
		redirect(303, '/');
	}

	return await resolve(event);
};

const createProtobufClient: Handle = async ({ event, resolve }) => {
	const transport = createConnectTransport({
		baseUrl: OPEN_REGISTRY_BACKEND_PROTOBUF_URL,
		interceptors: [setCookies(event.cookies)],
		fetch: event.fetch,
	});

	const clairTransport = createConnectTransport({
		baseUrl: OPEN_REGISTRY_BACKEND_CLAIR_URL,
		interceptors: [setCookies(event.cookies)],
	});

	// set transports
	event.locals.transport = transport;
	event.locals.clairTransport = clairTransport;

	// set clients
	event.locals.ghBuildClient = createClient(GithubActionsBuildService, transport);
	event.locals.ghLogsClient = createClient(GitHubActionsLogsService, transport);
	event.locals.ghProjectsClient = createClient(GitHubActionsProjectService, transport);
	event.locals.vulnScanningClient = createClient(ClairService, clairTransport);

	return await resolve(event);
};

const isProtectedRoute = (route: string): boolean => {
	return (
		route.startsWith('/settings') ||
		route.startsWith('/repositories') ||
		route.startsWith('/apps') ||
		route.startsWith('/project')
	);
};

const setOpenRegistryClientHandler: Handle = async ({ event, resolve }) => {
	const client = new OpenRegistryClient(event.fetch, event.url.origin);
	event.locals.openRegistry = client;
	return await resolve(event);
};

export const handle = sequence(setOpenRegistryClientHandler, authenticationHandler, createProtobufClient);

export const handleError: HandleServerError = async ({ error, event }) => {
	console.log('unhandled server exception - route: %s - error: %s', event.route.id, error);
	return {
		message: typeof error === 'string' ? error : JSON.stringify(error),
	};
};
