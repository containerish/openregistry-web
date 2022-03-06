import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
		this._responseInterceptor()
	}


	private _responseInterceptor = () => {
		this.http.interceptors.response.use(
			this._handleResponse,
			this._handleError,
		);
	}

	private _handleResponse = ({ data }: AxiosResponse) => data;

	protected _handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
