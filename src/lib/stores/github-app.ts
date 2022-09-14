import type { AuthorisedRepository } from 'src/routes/+layout.server';
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
	}>({
		repositories: [],
		githubUsername: ''
	});

	async function setAllAuthorisedRepositories(repos: AuthorisedRepository[]) {
		await update((state) => ({ ...state, repositories: repos }));
	}

	async function setSelectedRepository(repo: AuthorisedRepository) {
		await update((state) => ({ ...state, selectedRepository: repo }));
	}

	async function setGithubUsername(ghUsername: string) {
		await update((state) => ({ ...state, githubUsername: ghUsername }));
	}

	async function setTabIndex(index: number) {
		await update((state) => ({ ...state, tabIndex: index }));
	}

	return {
		subscribe,
		set,
		update,
		setSelectedRepository,
		setGithubUsername,
		setAllAuthorisedRepositories,
		setTabIndex
	};
};

export const ghStore = github();
