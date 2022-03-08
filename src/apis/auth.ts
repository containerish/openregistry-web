import HttpClient from './httpClient';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { goto } from '$app/navigation';
import type { AxiosError } from 'axios';

export interface LoginResponse {
    access: string
	refresh: string
}

export interface SignupResponse {
    msg:string
}

export interface SignupRequest {
    email: string
    username: string
    password: string
	confirmPassword: string
}

export interface JWT {
  oauth2_token: Oauth2Token
  aud: string
  exp: number
  jti: string
  iat: number
  iss: string
  nbf: number
  sub: string
  UserPayload: UserPayload
}

export interface Oauth2Token {
  access_token: string
  token_type: string
  expiry: string
}

export interface UserPayload {
  created_at: string
  updated_at: string
  uuid: string
  username: string
  email: string
  type: string
  login: string
  name: string
  node_id: string
  id: number
}

export interface User {
    created_at: Date;
    updated_at: Date;
    uuid:       string;
    name:       string;
    username:   string;
    email:      string;
    is_active:  boolean;
	sessionId: string;
}

const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const ValidateSignupRequest = (input: SignupRequest) => {
	if (input.password !== input.confirmPassword) {
		return Promise.reject("confirm password does not match")
	}

	// minimum length for email is 3 chars
	if (!input.email || input.email.length < 3 || !regexp.test(input.email)) {
		return false;
	}

	if (!input.username || input.username.length===0) {
		return false;
	}

	if (!input.password || input.password.length < 8) {
		return false;
	}

	return true;
}

export class Auth extends HttpClient {
    public constructor() {
        super('http://localhost:5000/auth')
    }

    public Login = async (email: string, password: string) => {
        const path = '/signin'
        if (!email || !password) {
            return Promise.reject("email/password cannot be empty")
        }
        const body = {
            email:email,
            password:password,
        }

        const resp = await this.http.post<LoginResponse>(path, body);
		return resp
    }

    public Signup = async (username: string, email: string, password: string) => {

        const path = '/signup'
        if (!email || !password) {
            return Promise.reject("email/password cannot be empty")
        }
        const body = {
            username: username,
            email:email,
            password:password,
        }
        const resp = await this.http.post<SignupResponse>(path, body);
		return resp;
    }

    public Signout = async (sessionId: string) => {
		const path = `/signout?session_id=${sessionId}`

        const resp = await this.http.delete(path);
		return resp;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public GetUserWithSession = async (sessionId: string) => {
        const path = `/sessions/me?session_id=${sessionId}`

        const resp = await this.http.get(path);
		return resp;
    }

	public LoginWithGithub = () => {
		goto(this.getGithubOAuthUrl())
	}

	private getGithubOAuthUrl = () => {
		return `https://github.com/login/oauth/authorize/?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_OPEN_REGISTRY_BACKEND_URL}/auth/github/callback&scope=user:email&state=skljdfkljsdjfklj`;
	}
}
