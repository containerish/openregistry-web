import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

declare module 'axios' {
	interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
	protected readonly http: AxiosInstance;

	 protected constructor(baseURL: string, headers?: any) {
		this.http = axios.create({
			baseURL,
			headers,
			withCredentials: true,
		});
		this._responseInterceptor();
		this._requestInterceptor();
	}

	private _requestInterceptor = () => {
		this.http.interceptors.request.use(req => {
			req.withCredentials = true
			return req;
		})
	}

	private _responseInterceptor = () => {
		this.http.interceptors.response.use(
			this._handleResponse,
			this._handleError,
		);
	}

	private _handleResponse = ({ data, status, headers }: AxiosResponse) => ({
		data, 
		status, 
		headers
	});

	protected _handleError = (error: any) => {
		Promise.reject(error);
	}
}

export default HttpClient;
