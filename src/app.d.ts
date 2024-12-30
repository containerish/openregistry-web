import type { OpenRegistryUserType } from '$lib/types/user';
import type { OpenRegistryClient } from '$lib/client/openregistry';
import type { Client } from '@connectrpc/connect';
import type { Transport } from '@connectrpc/connect';
import { GitHubActionsLogsService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_logs_pb';
import { GithubActionsBuildService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_job_pb';
import { GitHubActionsProjectService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
import { ClairService } from '@buf/containerish_openregistry.bufbuild_es/services/yor/clair/v1/clair_pb';

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
			ghProjectsClient: Client<typeof GitHubActionsProjectService>;
			ghLogsClient: Client<typeof GitHubActionsLogsService>;
			ghBuildClient: Client<typeof GithubActionsBuildService>;
			vulnScanningClient: Client<typeof ClairService>;
			transport: Transport;
			clairTransport: Transport;
		}
	}
}
