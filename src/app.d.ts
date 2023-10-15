import type { OpenRegistryUserType } from "$lib/types/user";
import { OpenRegistryClient } from "$lib/client/openregistry";
import { GitHubActionsLogsService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_logs_connect";
import { GithubActionsBuildService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_job_connect";
import { GitHubActionsProjectService } from "@buf/containerish_openregistry.connectrpc_es/services/kon/github_actions/v1/build_project_connect";
import type { PromiseClient } from "@bufbuild/connect";
import type { OpenRegistryAutomationClient } from "$lib/server/automation/automation";
import type { Transport } from "@connectrpc/connect";

declare global {
	declare namespace App {
		interface PageData {
			user: OpenRegistryUserType | null;
			authenticated: boolean;
			error?: Error;
			showMenu?: boolean;
			closeMenu?: VoidFunction;
			openSigninModal?: VoidFunction;
			email?: string;
			password?: string;
		}
		interface Locals {
			openRegistry: OpenRegistryClient;
			user: OpenRegistryUserType | null;
			authenticated: boolean;
			isRouteProtected: boolean;
			sessionId: string | null;
			ghProjectsClient: PromiseClient<typeof GitHubActionsProjectService>;
			ghLogsClient: PromiseClient<typeof GitHubActionsLogsService>;
			ghBuildClient: PromiseClient<typeof GithubActionsBuildService>;
			automationClient: OpenRegistryAutomationClient;
			transport: Transport;
		}
	}
	declare function fetch(
		input: Request | string,
		init?: RequestInit | CMRequestInit,
	): Promise<Response>;
}
