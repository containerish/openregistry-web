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
		data: data, 
		status: status, 
		headers: headers
	});

	protected _handleError = (err: AxiosError) => ({
		error: err.toJSON(),
		status: err.response.status,
		Headers: err.response.headers,
	})
}

export default HttpClient;
