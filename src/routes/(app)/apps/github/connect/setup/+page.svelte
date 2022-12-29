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

<div class="bg-cream-50 flex flex-col justify-start items-center min-h-[77vh] py-10 desktop:py-8">
	<div
		class="w-3/4 text-xs desktop:w-1/2 px-2 py-16 desktop:py-2 desktop:text-xs apple:text-sm uw:text-lg"
	>
		<Steps
			{steps}
			size="2rem"
			line="2px"
			primary="#8d7060"
			secondary="#BAA89D"
			{clickable}
			current={selectedTab}
		/>
	</div>

	<div class="bg-white rounded-md shadow-lg space-y-6 my-10 min-h-max min-w-max p-20">
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
