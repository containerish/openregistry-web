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
			headers: {
				'Cache-Control': 'no-cache',
				...headers
			},
			withCredentials: true,
			httpAgent: this.getUserAgent(),
			httpsAgent: this.getUserAgent(),
		});

		this._responseInterceptor();
		this._requestInterceptor();
	}

	private _requestInterceptor = () => {
		this.http.interceptors.request.use(req => {
			const supportBaseUrl = import.meta.env.VITE_OPEN_REGISTRY_SUPPORT_ENDPOINT;
			if (req.baseURL === supportBaseUrl) {
				req.withCredentials = false;
			} else {
				req.withCredentials = true;
			}

			return req;
		})
	}

	private _responseInterceptor = () => {
		this.http.interceptors.response.use(this._handleResponse, this._handleError);
	}

	private _handleResponse = ({ data, status, headers }: AxiosResponse) => {
		return {
			data: data, 
			status: status, 
			headers: headers,
		}
	};

	protected _handleError = (err: AxiosError) => {
		return {
			error: err?.response?.data ? err.response.data : err,
			status: err?.response?.status,
		}
	}

	private getUserAgent = () => {
		return import.meta.env.VITE_OPEN_REGISTRY_APP_NAME + "/" + import.meta.env.VITE_OPEN_REGISTRY_ENVIRONMENT
	}
}

export default HttpClient;
