import { session } from "./stores/session";
import type { Handle, HandleServerError } from "@sveltejs/kit";
import { OpenRegistryClient } from "$lib/client/openregistry";
import { error, redirect } from "@sveltejs/kit";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { GitHubActionsLogsService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_logs_connect";
import { GitHubActionsProjectService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect";
import { GithubActionsBuildService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_job_connect";
import { sequence } from "@sveltejs/kit/hooks";
import { env as privEnv } from "$env/dynamic/private";
import { setCookies } from "$lib/protobuf/interceptors";
import { OpenRegistryAutomationClient } from "$lib/server/automation/automation";
import posthog from "posthog-js";

export const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const sessionId = cookies.get("session_id");
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
	if (url.pathname === "/search" && !locals.user) {
		return await resolve(event);
	}
	if (isProtectedRoute(url.pathname) && !locals.user) {
		throw redirect(303, "/");
	}

	return await resolve(event);
};

export const createProtobufClient: Handle = async ({ event, resolve }) => {
	const transport = createConnectTransport({
		baseUrl: privEnv.OPEN_REGISTRY_BACKEND_PROTOBUF_URL,
		interceptors: [setCookies(event.cookies)],
	});

	event.locals.transport = transport;

	event.locals.ghBuildClient = createPromiseClient(
		GithubActionsBuildService,
		transport
	);
	event.locals.ghLogsClient = createPromiseClient(
		GitHubActionsLogsService,
		transport
	);
	event.locals.ghProjectsClient = createPromiseClient(
		GitHubActionsProjectService,
		transport
	);
	event.locals.automationClient = new OpenRegistryAutomationClient(
		event.locals,
		event.fetch
	);

	return await resolve(event);
};

export const isProtectedRoute = (route: string): boolean => {
	return (
		route.startsWith("/settings") ||
		route.startsWith("/repositories") ||
		route.startsWith("/apps")
	);
};

export const setOpenRegistryClientHandler: Handle = async ({
	event,
	resolve,
}) => {
	const client = new OpenRegistryClient(event.fetch);
	event.locals.openRegistry = client;
	// these are throwing POJO errors
	return await resolve(event);
};

const applyFeatureFlags: Handle = async ({ event, resolve }) => {
	posthog.onFeatureFlags(function () {
		// feature flags should be available at this point
		const payload = posthog.getFeatureFlagPayload("automated_builds");
		console.log("feature payload: ", payload);
	});

	const { pathname } = event.url;
	const pathMatched =
		pathname === "/apps/github/connect" ||
		pathname === "/apps/github/connect/setup" ||
		pathname.startsWith("/projects");

	if (!posthog.isFeatureEnabled("automated-builds") && pathMatched) {
		throw error(404, {
			message: "Route not found",
		});
	}

	return await resolve(event);
};

export const handle = sequence(
	// applyFeatureFlags,
	setOpenRegistryClientHandler,
	authenticationHandler,
	createProtobufClient
);

export const handleError: HandleServerError = async ({ error, event }) => {
	console.log(
		"unhandled server exception - route: %s - error: %s",
		event.route.id,
		error
	);
	return {
		message: typeof error === "string" ? error : JSON.stringify(error),
	};
};
