import type { User } from '$apis/auth';
import { OpenRegistryClient } from '$lib/client/openregistry';

declare global {
	/// <refrence types="@sveltejs/kit">
	declare namespace App {
		interface PageData {
			user: User;
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
			user: User | null;
			authenticated: boolean;
			isRouteProtected: boolean;
			sessionId: string | null;
			ghLogsClient: import('@buf/containerish_openregistry.bufbuild_connect-es/services/kone/github_actions/v1/build_logs_connect').GitHubActionsLogsService;
		}
		// interface Platform { }
	}
	declare function fetch(
		input: Request | string,
		init?: RequestInit | CMRequestInit
	): Promise<Response>;
}
