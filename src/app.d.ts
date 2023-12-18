import type { OpenRegistryUserType } from '$lib/types/user';
import { OpenRegistryClient } from '$lib/client/openregistry';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_logs_connect';
import { GithubActionsBuildService } from '@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_job_connect';
import { GitHubActionsProjectService } from '@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect';
import { ClairService } from '@buf/containerish_openregistry.connectrpc_es/services/yor/clair/v1/clair_connect';
import { PromiseClient } from '@connectrpc/connect';
import type { OpenRegistryAutomationClient } from '$lib/server/automation/automation';
import { Transport, createPromiseClient } from '@connectrpc/connect';

declare global {
	declare namespace App {
		// interface PageData {}
		// interface Platform {}
		// interface Error {}

		interface Locals {
			openRegistry: OpenRegistryClient;
			user: OpenRegistryUserType | null;
			authenticated: boolean;
			isRouteProtected: boolean;
			sessionId: string | null;
			ghProjectsClient: PromiseClient<typeof GitHubActionsProjectService>;
			ghLogsClient: PromiseClient<typeof GitHubActionsLogsService>;
			ghBuildClient: PromiseClient<typeof GithubActionsBuildService>;
			vulnScanningClient: PromiseClient<typeof ClairService>;
			automationClient: OpenRegistryAutomationClient;
			transport: Transport;
			clairTransport: Transport;
		}
	}
}
