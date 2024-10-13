import { createConnectTransport } from '@connectrpc/connect-web';
import { createClient, type Client } from '@connectrpc/connect';
import { ClairService } from '@buf/containerish_openregistry.bufbuild_es/services/yor/clair/v1/clair_pb';
import { GithubActionsBuildService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_job_pb';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_logs_pb';
import { GitHubActionsProjectService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
import { PUBLIC_OPEN_REGISTRY_BACKEND_CLAIR_URL, PUBLIC_OPEN_REGISTRY_BACKEND_PROTOBUF_URL } from '$env/static/public';
import { setClientSideCookies } from './protobuf/interceptors';
import { getContext, setContext } from 'svelte';

export const ClientCtxKeys = {
	AUTOMATION_BUILDS_CLIENT: 'AUTOMATION_BUILDS_CLIENT',
	AUTOMATION_LOGS_CLIENT: 'AUTOMATION_LOGS_CLIENT',
	AUTOMATION_PROJECTS_CLIENT: 'AUTOMATION_PROJECTS_CLIENT',
	VULNERABILITY_SCANNING_CLIENT: 'VULNERABILITY_SCANNING_CLIENT',
} as const;

export const initializeOpenRegistryClients = (fetcher: typeof fetch) => {
	const buildAutomationTransport = createConnectTransport({
		baseUrl: PUBLIC_OPEN_REGISTRY_BACKEND_PROTOBUF_URL,
		interceptors: [setClientSideCookies],
		fetch: fetcher,
	});

	const clairTransport = createConnectTransport({
		baseUrl: PUBLIC_OPEN_REGISTRY_BACKEND_CLAIR_URL,
		interceptors: [setClientSideCookies],
		fetch: fetcher,
	});

	const ghBuildClient = createClient(GithubActionsBuildService, buildAutomationTransport);
	const ghLogsClient = createClient(GitHubActionsLogsService, buildAutomationTransport);
	const ghProjectsClient = createClient(GitHubActionsProjectService, buildAutomationTransport);
	const vulnScanningClient = createClient(ClairService, clairTransport);

	setContext(ClientCtxKeys.VULNERABILITY_SCANNING_CLIENT, vulnScanningClient);
	setContext(ClientCtxKeys.AUTOMATION_PROJECTS_CLIENT, ghProjectsClient);
	setContext(ClientCtxKeys.AUTOMATION_LOGS_CLIENT, ghLogsClient);
	setContext(ClientCtxKeys.AUTOMATION_BUILDS_CLIENT, ghBuildClient);
};

export function getAutomationBuildsClient() {
	return getContext<Client<typeof GithubActionsBuildService>>(ClientCtxKeys.AUTOMATION_BUILDS_CLIENT);
}

export function getAutomationLogsClient() {
	return getContext<Client<typeof GitHubActionsLogsService>>(ClientCtxKeys.AUTOMATION_LOGS_CLIENT);
}

export function getAutomationProjectsClient() {
	return getContext<Client<typeof GitHubActionsProjectService>>(ClientCtxKeys.AUTOMATION_PROJECTS_CLIENT);
}

export function getVulnerabilityScanningClient() {
	return getContext<Client<typeof ClairService>>(ClientCtxKeys.VULNERABILITY_SCANNING_CLIENT);
}
