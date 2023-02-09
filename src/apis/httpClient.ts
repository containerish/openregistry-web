import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { env } from '$env/dynamic/public';

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
				Pragma: 'no-cache',
				Expires: '0',
				...headers
			},
			withCredentials: true
		});

		this._responseInterceptor();
		this._requestInterceptor();
	}

	private _requestInterceptor = () => {
		this.http.interceptors.request.use((req) => {
			const supportBaseUrl = env.PUBLIC_OPEN_REGISTRY_SUPPORT_ENDPOINT;
			if (req.baseURL === supportBaseUrl) {
				req.withCredentials = false;
			} else {
				req.withCredentials = true;
				// @TODO (jay-dee7) we need to set this header
				// req.headers['User-Agent'] = this.getUserAgent();
			}

			return req;
		});
	};

	private _responseInterceptor = () => {
		this.http.interceptors.response.use(this._handleResponse, this._handleError);
	};

	private _handleResponse = ({ data, status, headers }: AxiosResponse) => {
		return {
			data: data,
			status: status,
			headers: headers
		};
	};

	protected _handleError = (err: AxiosError) => {
		return {
			error: err?.response?.data ? err.response.data : err,
			status: err?.response?.status
		};
	};

	private getUserAgent = () => {
		const agentName = `${env.PUBLIC_OPEN_REGISTRY_APP_NAME}/${env.PUBLIC_OPEN_REGISTRY_ENVIRONMENT} ${env.PUBLIC_OPEN_REGISTRY_APP_VERSION}`;
		return agentName;
	};
}

export default HttpClient;
