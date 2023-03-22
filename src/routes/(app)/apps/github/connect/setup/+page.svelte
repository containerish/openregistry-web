<script lang="ts">
	import { Steps } from 'svelte-steps';
	let steps = [{ text: 'Select repository' }, { text: 'Set up build' }, { text: 'Build project' }];
	let clickable: boolean = false;
	import { page } from '$app/stores';
	import { ghStore } from '$lib/stores';
	import type { AuthorisedRepository } from '../../../../../(marketing)/+layout.server';
	import SelectRepo from './select-repo.svelte';
	import Setup from './setup.svelte';
	import BuildProject from './build-project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const installationId = $page.url.searchParams.get('installation_id');
	let selectedRepo: string;
	async function handleSelectedRepo(repo: AuthorisedRepository) {
		selectedRepo = repo.repository.name;
		await ghStore.setSelectedRepository(repo);
		await ghStore.setAllAuthorisedRepositories(data.repoList);
		await ghStore.setGithubUsername(repo.repository.owner.login);
	}
	let selectedTab = 0;

	async function handleNext(index: number) {
		await ghStore.setTabIndex(index);
		selectedTab = index;
	}
</script>

<div
	class="bg-slate-100 w-full flex flex-col justify-start items-center py-10">
	<div class="w-1/2 lg:w-3/4 text-xs px-2 py-3 lg:text-sm">
		<Steps
			{steps}
			size="2rem"
			line="2px"
			primary="#6363F1"
			secondary="#A3AEFD"
			{clickable}
			current={selectedTab}
		/>
	</div>

	<div
		class="bg-white rounded-sm shadow-2xl border border-primary-100 space-y-6 my-10 min-h-max 
		overflow-y-auto p-20 mx-3 min-w-min w-4/5"
	>
		{#if selectedTab === 0}
			<SelectRepo {data} {handleNext} />
		{/if}
		{#if selectedTab === 1}
			<Setup {handleNext} />
		{/if}
		{#if selectedTab === 2}
			<BuildProject {handleNext} />
		{/if}
	</div>
</div>
