import HttpClient from './httpClient';

export interface Repository {
  uuid: string
  namespace: string
  mediaType: string
  schemaVersion: number
}

export interface TagList {
	name: string
	tags: string[]
}

export interface Catalog {
	repositories: DetailedRepository[];
	total: number;
}

export interface DetailedRepository {
	uuid:       string;
	namespace:  string;
	reference:  string;
	digest:     string;
	sky_link:   string;
	media_type: string;
	layers:     null;
	size:       number;
}


export class RegistryBackend extends HttpClient {
	public constructor() {
		super(import.meta.env.VITE_OPEN_REGISTRY_BACKEND_URL)
	}

	public ListRepositories = async (namespace?: string) => {
		let url = '/internal/metadata'
		if (namespace && namespace != '') {
			url = url + '?namespace=' + namespace
		}

		return await this.http.get(url)
	}

	public SearchRepositories = async (query: string) => {
		if (!query) {
			return Promise.reject('Query cannot be empty');
		}

		let url = `/v2/catalog/search?search_query=${query}`
		return await this.http.get(url)
	}

	public ListTags = async (namespace: string) => {
		if (!namespace) {
			return Promise.reject("empty namespace, invalid")
		}
		const url = `/v2/${namespace}/tags/list`

		return await this.http.get(url)
	}

	public ListCatalog = async (pageSize?: number, offset?: number, namespace?: string) => {
		let url = '/v2/_catalog'

		if (pageSize){
			if (!offset) offset = 0;
			url = url + `?n=${pageSize}&last=${offset}`
		}
		if (namespace) {
			if (!offset) offset = 0;
			url = url + `&ns=${namespace}`
		}

		const resp = await this.http.get(url);
		return resp;
	}

	public DefaultPageSize: number = 10;
}
