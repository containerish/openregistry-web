import type { User } from '$apis/auth';

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
			user: User | null;
			authenticated: boolean;
			isRouteProtected: boolean;
			sessionId: string | null;
			ghLogsClient: import('@buf/containerish_openregistry.bufbuild_connect-es/services/kon/github_actions/v1/build_logs_connect').GitHubActionsLogsService;
		}
		// interface Platform { }
	}
}
