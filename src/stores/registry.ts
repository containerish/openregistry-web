import { writable } from 'svelte/store';
import { RegistryBackend } from '$apis/registry';

const registry = new RegistryBackend();
export const RepoStore = writable([]);

export const fetchRepositories = async () => {
	try {
		const { data } = await registry.ListCatalog();
		RepoStore.set(data);
	} catch (err) {
		RepoStore.set([]);
	}
};
