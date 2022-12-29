import type { User } from '$apis/auth';
import { writable } from 'svelte/store';

const sessionStore = () => {
	const { subscribe, set, update } = writable<{
		user: User | null,
		isAuthenticated: boolean,
	}>({
		user: null,
		isAuthenticated: false,
	});

	async function setUser(user: User | null) {
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
