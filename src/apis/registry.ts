import HttpClient from './httpClient';

export interface Repository {
  uuid: string
  namespace: string
  mediaType: string
  schemaVersion: number
}


export class RegistryBackend extends HttpClient {
	public constructor() {
		super('http://0.0.0.0:5000')
	}

	public ListRepositories = (namespace?: string) => {
		let url = '/internal/metadata'
		if (namespace && namespace != '') {
			url = url + '?namespace=' + namespace
		}

		return this.instance.get<Repository[]>(url)
	}
}
