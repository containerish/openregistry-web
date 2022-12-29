import type { User } from '$apis/auth';
import { writable } from 'svelte/store';

const user = () => {
	const {subscribe, set, update} = writable({
		authenticated: false,
		user: null,
	});

	function setUser(u: User, auth: boolean) {
		update(() => {
			return {
				user: u,
				authenticated: auth,
			}
		})
	}

	return {subscribe, set, update, setUser}
}

export const userStore = user();
