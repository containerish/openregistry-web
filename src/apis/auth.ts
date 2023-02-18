import HttpClient from './httpClient';
import { goto } from '$app/navigation';
import type { AxiosResponse } from 'axios';
import { env } from '$env/dynamic/public';
import {
	create,
	parseCreationOptionsFromJSON,
	get,
	parseRequestOptionsFromJSON,
	supported,
	type CredentialCreationOptionsJSON,
	type CredentialRequestOptionsJSON
} from '@github/webauthn-json/browser-ponyfill';

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

export interface User {
	created_at: Date;
	updated_at: Date;
	uuid: string;
	name: string;
	username: string;
	email: string;
	is_active: boolean;
	sessionId: string;
	hireable: boolean;
	html_url: string;
}

const regexp = new RegExp(
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
		super(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth');
	}

	public WebAuthNBeginRegister = async (username: string, email: string) => {
		if (!supported()) {
			return {
				error: 'Browser does not support WebAuthN'
			};
		}

		const body = { username, email };
		const path = 'webauthn/registration/begin';
		const { error, data, status } = await this.http.post(path, body);
		if (status !== 200) {
			return { error, data, status };
		}

		const options = (data as { options: CredentialCreationOptionsJSON }).options;
		const finishResponse = await this.WebAuthNFinishRegister(username, options);
		return finishResponse;
	};

	public WebAuthNFinishRegister = async (
		username: string,
		credentialCreationOptions: CredentialCreationOptionsJSON
	) => {
		const options = parseCreationOptionsFromJSON(credentialCreationOptions);
		const path = `/webauthn/registration/finish?username=${username}`;
		const response = await create(options);
		return await this.http.post(path, response);
	};

	public WebAuthNBeginLogin = async (username: string) => {
		const path = `/webauthn/login/begin?username=${username}`;
		const { error, data, status } = await this.http.get(path);
		if (status !== 200) {
			return { error, data, status };
		}
		const options = (data as { options: CredentialRequestOptionsJSON }).options;
		const requestOptions = parseRequestOptionsFromJSON(options);
		const credential = await get(requestOptions);
		const finishLoginPath = `/webauthn/login/finish?username=${username}`;
		const finishLoginResp = await this.http.post(finishLoginPath, credential);
		return finishLoginResp;
	};

	public VerifyEmail = async (token: string): Promise<AxiosResponse> => {
		const path = `/signup/verify?token=${token}`;

		const resp = this.http.get(path);
		return resp;
	};

	public ResetPassword = async (
		oldPassword: string,
		newPassword: string
	): Promise<AxiosResponse> => {
		const path = `/reset-password`;

		const body = {
			old_password: oldPassword,
			new_password: newPassword
		};

		const resp = this.http.post(path, body);
		return resp;
	};

	public ForgotPassword = async (email: string): Promise<AxiosResponse> => {
		const path = `/forgot-password?email=${email}`;

		const resp = this.http.get(path);
		return resp;
	};

	public ForgotPasswordCallback = async (
		newPassword: string,
		token: string
	): Promise<AxiosResponse> => {
		const path = `/reset-forgotten-password`;

		const body = {
			new_password: newPassword
		};

		const resp = this.http.post(path, body, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});

		return resp;
	};

	public SendInvites = async (emails: string): Promise<AxiosResponse> => {
		const path = 'send-email/welcome';
		const body = {
			emails: emails
		};
		const resp = await this.http.post(path, body);
		return resp;
	};

	public Login = async (email: string, password: string): Promise<AxiosResponse> => {
		const path = '/signin';

		if (!email || !password) {
			return Promise.reject('email/password cannot be empty');
		}
		const body = { email, password };
		const resp = await this.http.post(path, body);

		return resp;
	};

	public Signup = async (
		username: string,
		email: string,
		password: string
	): Promise<AxiosResponse> => {
		const path = '/signup';
		if (!email || !password) {
			return Promise.reject('email/password cannot be empty');
		}
		const body = {
			username: username,
			email: email,
			password: password
		};
		const resp = await this.http.post(path, body);
		return resp;
	};

	public Signout = async (): Promise<AxiosResponse> => {
		const path = `/signout`;

		const resp = await this.http.delete(path);
		return resp;
	};

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public GetUserWithSession = async (sessionId: string) => {
		if (!sessionId) throw new Error('session is empty');
		try {
			const path = `/sessions/me`;
			const resp = await this.http.get(path, {
				headers: {
					cookie: `session_id=${sessionId}`
				}
			});
			return resp;
		} catch (err) {
			return {
				error: err,
				status: 400,
				data: undefined
			};
		}
	};

	public LoginWithGithub = () => {
		goto(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth/github/login');
	};

	public static publicPaths = new Map([
		['/', 'root'],
		['/about', 'about'],
		['/faq', 'faq'],
		['/search', 'search'],
		['/auth/verify', 'authVerify'],
		['/auth/unhandled', 'unhandled'],
		['/auth/forgot-password', 'forgot-password'],
		['/auth/github-login-callback', 'github-callback']
	]);
}
