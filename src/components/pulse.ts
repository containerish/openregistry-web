import { writable } from 'svelte/store';

const pulse = () => {
	const {subscribe, set, update} = writable({
		status: "LOADING",
	});

	function setPulseState(doneLoading: boolean) {
		update(() => {
			return {
				status: doneLoading ? 'LOADED' : 'LOADING'
			}
		})
	}

	return {subscribe, set, update, setPulseState}
}

export const pulseStore = pulse();
