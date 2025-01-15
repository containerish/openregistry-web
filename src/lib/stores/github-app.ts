import type { AuthorisedRepository } from '$lib/types';
import { writable } from 'svelte/store';

export type Branch = {
	name: string;
	protected: boolean;
};

const github = () => {
	const { subscribe, set, update } = writable<{
		repositories: AuthorisedRepository[];
		githubUsername: string;
		selectedRepository?: AuthorisedRepository;
		tabIndex?: number;
		activeBranch?: string;
	}>({
		repositories: [],
		githubUsername: '',
	});

	function setAllAuthorisedRepositories(repos: AuthorisedRepository[]) {
		update((state) => ({ ...state, repositories: repos }));
	}

	function setSelectedRepository(repo: AuthorisedRepository) {
		update((state) => ({ ...state, selectedRepository: repo }));
	}

	function setGithubUsername(ghUsername: string) {
		update((state) => ({ ...state, githubUsername: ghUsername }));
	}

	function setTabIndex(index: number) {
		update((state) => ({ ...state, tabIndex: index }));
	}

	function setActiveBranch(branch: string) {
		update((state) => ({ ...state, activeBranch: branch }));
	}

	return {
		subscribe,
		set,
		update,
		setSelectedRepository,
		setGithubUsername,
		setAllAuthorisedRepositories,
		setTabIndex,
		setActiveBranch,
	};
};

export const ghStore = github();
