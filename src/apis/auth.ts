import HttpClient from './httpClient';

export interface LoginResponse {
    token:string
}

export interface SignupResponse {
    msg:string
}

export interface SignupRequest {
    email: string
    username: string
    password: string
    validate: () => false;
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
        return await this.http.post<LoginResponse>(path, body)
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
        return await this.http.post<SignupResponse>(path, body)
    }
}
