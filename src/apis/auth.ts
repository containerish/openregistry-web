import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';
import HttpClient from './httpClient';
import type { AxiosResponse } from 'axios';

export interface LoginResponse {
	access: string;
	refresh: string;
}

export interface SignupResponse {
	msg: string;
}

export interface SignupRequest {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export interface JWT {
	oauth2_token: Oauth2Token;
	aud: string;
	exp: number;
	jti: string;
	iat: number;
	iss: string;
	nbf: number;
	sub: string;
	UserPayload: UserPayload;
}

export interface Oauth2Token {
	access_token: string;
	token_type: string;
	expiry: string;
}

export interface UserPayload {
	created_at: string;
	updated_at: string;
	uuid: string;
	username: string;
	email: string;
	type: string;
	login: string;
	name: string;
	node_id: string;
	id: number;
}

const regexp = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const ValidateSignupRequest = (input: SignupRequest): boolean => {
	if (input.password !== input.confirmPassword) {
		return false;
	}

	// minimum length for email is 3 chars
	if (!input.email || input.email.length < 3 || !regexp.test(input.email)) {
		return false;
	}

	if (!input.username || input.username.length === 0) {
		return false;
	}

	if (!input.password || input.password.length < 8) {
		return false;
	}

	return true;
};

export class Auth extends HttpClient {
	public constructor() {
		super(PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth');
	}

	public ForgotPasswordCallback = async (newPassword: string, token: string): Promise<AxiosResponse> => {
		const path = `/reset-forgotten-password`;

		const body = {
			new_password: newPassword,
		};

		const resp = this.http.post(path, body, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		return resp;
	};

	public SendInvites = async (emails: string): Promise<AxiosResponse> => {
		const path = 'send-email/welcome';
		const body = {
			emails: emails,
		};
		const resp = await this.http.post(path, body);
		return resp;
	};

	public LoginWithGithub = () => {
		window.open(PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth/github/login', '_blank');
	};

	public static publicPaths = new Map([
		['/', 'root'],
		['/about', 'about'],
		['/faq', 'faq'],
		['/search', 'search'],
		['/auth/verify', 'authVerify'],
		['/auth/unhandled', 'unhandled'],
		['/auth/forgot-password', 'forgot-password'],
		['/auth/github-login-callback', 'github-callback'],
	]);
}
