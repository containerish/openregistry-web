<script lang="ts">
	import { Steps } from 'svelte-steps';
	let steps = [
		{ text: 'Select repository' },
		{ text: 'Set up build' },
		// { text: 'Build project' },
	];
	let clickable = false;
	import { ghStore } from '$lib/stores';
	import SelectRepo from './select-repo.svelte';
	import Setup from './setup.svelte';
	import type { PageData } from './$types';
	import { fly } from 'svelte/transition';
	import {
		CreateProjectRequest,
		ProjectBuildSettingsMessage,
	} from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
	import { writable } from 'svelte/store';
	import EmptyListMessage from '$lib/components/EmptyListMessage.svelte';
	import { Timestamp } from '@bufbuild/protobuf';
	import { v4 as UuidV4 } from '@lukeed/uuid';
	import { UUID } from '@buf/containerish_openregistry.bufbuild_es/common/v1/id_pb';
	import { onMount } from 'svelte';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import type { Repository } from '$lib/types';
	import { page } from '$app/stores';
	import { getAutomationProjectsClient } from '$lib/clients';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let selectedTab = 0;

	const openRegistryClient = new OpenRegistryClient(fetch, $page.url.origin);
	const projectsClient = getAutomationProjectsClient();
	async function handleNext(index: number) {
		if (index === 2) {
			await goto('/projects');
			return;
		}
		ghStore.setTabIndex(index);
		selectedTab = index;
	}

	const createProjectRequestStore = writable<CreateProjectRequest>(
		new CreateProjectRequest({
			createdAt: Timestamp.fromDate(new Date()),
			id: new UUID({ value: UuidV4() }),
			ownerId: new UUID({ value: data.user?.id }),
			buildSettings: new ProjectBuildSettingsMessage({
				worfklowFile: './Dockerfile',
				buildTool: 'Docker',
			}),
		})
	);

	onMount(async () => {
		await fetchUserCatalog();
	});

	let containerRepos: Repository[] = [];
	const fetchUserCatalog = async () => {
		const { repositories, error } = await openRegistryClient.getUserRepositoryCatalog();
		if (!error && repositories) {
			containerRepos = repositories;
		}
	};

	const updateBuildSettings = (e: CustomEvent<CreateProjectRequest>) => {
		$createProjectRequestStore.projectName = e.detail.projectName;
		$createProjectRequestStore.buildSettings = e.detail.buildSettings;
	};

	$: ghAppLink = `https://github.com/settings/installations/${data.user?.identities?.github?.installation_id}`;
</script>

<svelte:head>
	<title>Setup Automated Builds | OpenRegistry</title>
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

	{#if data.user && data.githubUsername}
		<div
			class="bg-white/80 rounded-sm shadow-2xl border border-primary-100 my-10 min-h-max
		overflow-y-auto p-9 md:p-16 mx-3 min-w-[300px] w-full max-w-[1000px]"
			in:fly={{ y: 200, duration: 300 }}
		>
			{#if selectedTab === 0}
				{#if data.repoList.length > 0}
					<SelectRepo
						refreshRepositoryList={fetchUserCatalog}
						openRegistryRepos={containerRepos}
						{ghAppLink}
						githubUsername={data.githubUsername}
						repoList={data.repoList}
						{handleNext}
						store={createProjectRequestStore}
					/>
				{:else}
					<EmptyListMessage
						title="No repositories found"
						description="Looks like we could not list any repositores from your <a href={`https://github.com/settings/installations/${data.user.identities?.github?.installation_id}`} class='underline underline-offset-2' target='_blank'>GitHub account</a>. If you have allowed OpenRegistry GitHub App to access your repositories, please refresh this page or try again later"
					/>
				{/if}
			{:else if selectedTab === 1}
				<Setup
					{openRegistryClient}
					{handleNext}
					on:build_settings={updateBuildSettings}
					store={createProjectRequestStore}
					{projectsClient}
				/>
				<!-- {:else if selectedTab === 2} -->
				<!-- 	<BuildProject store={createProjectRequestStore} {doesGithubActionAlreadyExist} {handleNext} /> -->
			{/if}
		</div>
	{/if}
</div>
