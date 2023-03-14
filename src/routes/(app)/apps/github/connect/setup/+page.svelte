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
	class="bg-slate-100 w-full flex flex-col justify-start items-center min-h-[1700px] desktop:min-h-max 
	laptop:min-h-max half:min-h-max py-10 desktop:py-8"
>
	<div
		class="w-3/4 text-xs desktop:w-1/2 laptop:w-1/2 half:w-1/2 px-2 py-16 desktop:py-2 laptop:py-2 half:py-1 
		desktop:text-xs apple:text-sm uw:text-lg"
	>
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
		class="bg-white rounded-sm shadow-2xl border border-primary-100 space-y-6 my-10 min-h-max min-w-[1150px] 
		max-w-[1150px] desktop:min-w-max laptop:min-w-max laptop:overflow-y-auto half:min-w-max half:overflow-y-auto 
		p-20 desktop:py-10 mx-2"
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
