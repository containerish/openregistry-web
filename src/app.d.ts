import type { User } from './apis/auth';

/// <refrence types="@sveltejs/kit">
declare namespace App {
	interface PageData {
		user: User;
		authenticated: boolean;
		error?: Error;
		showMenu?: boolean;
		closeMenu?: VoidFunction;
		openSigninModal?: VoidFunction;
	}
	interface Locals {}
	interface Platform {}
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
	interface PublicEnv {}
}
