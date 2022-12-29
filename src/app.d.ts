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
			sessionId: string | null;
		}
		interface Platform { }
		interface PrivateEnv {
			VITE_GITHUB_CLIENT_ID: string;
			VITE_OPEN_REGISTRY_BACKEND_URL: string;
			VITE_OPEN_REGISTRY_ENVIRONMENT: string;
			VITE_OPEN_REGISTRY_APP_NAME: string;
			VITE_OPEN_REGISTRY_SUPPORT_API_KEY: string;
			VITE_OPEN_REGISTRY_SUPPORT_ENDPOINT: string;
			VITE_OPEN_REGISTRY_SUPPORT_EMAILS: string;
			VITE_OPEN_REGISTRY_APP_VERSION: string;
		}
		interface PublicEnv { }
	}
}
