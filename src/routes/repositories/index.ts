import {RegistryBackend} from '../../apis/registry';
const backend = new RegistryBackend();

export async function get({}) {
	const {data, status, error} = await backend.ListCatalog()

	return {
		body: {
			catalog: data,
		},
		status: status,
		error: error
	}
}
