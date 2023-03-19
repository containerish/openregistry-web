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
			isSignin?: boolean;
			isSignUp?: boolean;
		}
		interface Locals {
			user: User | null;
			authenticated: boolean;
			isRouteProtected: boolean;
			sessionId: string | null;
		}
		// interface Platform { }
	}
}
