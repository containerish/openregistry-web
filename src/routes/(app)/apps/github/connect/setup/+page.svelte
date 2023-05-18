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

<svelte:head>
	<title>SetupBuild | OpenRegistry</title>
</svelte:head>

<div class="w-full flex flex-col justify-start items-center py-9 mx-10">
	<div class="w-3/4 text-xs px-2 lg:text-sm">
		<Steps
			{steps}
			size="1.5rem"
			line="1.5px"
			primary="#6363F1"
			secondary="#A3AEFD"
			{clickable}
			current={selectedTab}
		/>
	</div>

	<div
		class="bg-white/80 rounded-sm shadow-2xl border border-primary-100 my-10 min-h-max
		overflow-y-auto p-9 md:p-16 mx-3 min-w-[300px] w-full max-w-[1000px]"
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
