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

export class RegistryBackend extends HttpClient {
	public constructor() {
		super('http://localhost:5000')
	}

	public ListRepositories = async (namespace?: string) => {
		let url = '/internal/metadata'
		if (namespace && namespace != '') {
			url = url + '?namespace=' + namespace
		}

		return await this.http.get<Repository[]>(url)
	}

	public ListTags = async (namespace: string) => {
		if (!namespace) {
			return Promise.reject("empty namespace, invalid")
		}
		const url = `/v2/${namespace}/tags/list`

		return await this.http.get<TagList>(url)
	}


}
