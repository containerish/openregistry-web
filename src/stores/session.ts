import type { User } from 'src/apis/auth';
import {writable} from 'svelte/store';

const sessionStore = writable<{
	user?: User,
	isAuthenticated: boolean,
}>({
	isAuthenticated: false,
});

export default {
	subscribe: sessionStore.subscribe,
	set: sessionStore.set,
}
