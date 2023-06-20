import type { OpenRegistryUserType } from '$lib/types/user';
import { writable } from 'svelte/store';

const sessionStore = () => {
	const { subscribe, set, update } = writable<{
		user: OpenRegistryUserType | null,
		isAuthenticated: boolean,
	}>({
		user: null,
		isAuthenticated: false,
	});

	async function setUser(user: OpenRegistryUserType | null) {
		await update((state) => ({ ...state, user: user }));
	}

	async function setIsAuthenticated(isAuthenticated: boolean) {
		await update((state) => ({ ...state, isAuthenticated: isAuthenticated }));
	}

	return {
		subscribe,
		set,
		update,
		setIsAuthenticated,
		setUser,
	};
};

export const session = sessionStore();
