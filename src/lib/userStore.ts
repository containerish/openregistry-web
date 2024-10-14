import type { OpenRegistryUserType } from '$lib/types/user';
import { writable } from 'svelte/store';

const user = () => {
	const { subscribe, set, update } = writable<{
		authenticated: boolean;
		user: OpenRegistryUserType | null;
	}>({
		authenticated: false,
		user: null,
	});

	function setUser(u: OpenRegistryUserType, auth: boolean) {
		update(() => {
			return {
				user: u,
				authenticated: auth,
			};
		});
	}

	return { subscribe, set, update, setUser };
};

export const userStore = user();
