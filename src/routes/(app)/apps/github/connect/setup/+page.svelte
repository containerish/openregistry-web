<script lang="ts">
	import { Steps } from "svelte-steps";
	let steps = [
		{ text: "Select repository" },
		{ text: "Set up build" },
		{ text: "Build project" },
	];
	let clickable = false;
	import { ghStore } from "$lib/stores";
	import SelectRepo from "./select-repo.svelte";
	import Setup from "./setup.svelte";
	import BuildProject from "./build-project.svelte";
	import type { PageData } from "./$types";
	import { fly } from "svelte/transition";
	import type { CreateProjectState } from "$lib/types/index";
	export let data: PageData;
	let selectedTab = 0;

	async function handleNext(index: number) {
		ghStore.setTabIndex(index);
		selectedTab = index;
	}

	let doesGithubActionAlreadyExist = false;

	const handleOnPRCreate = async (
		event: CustomEvent<{ pullRequestExists: boolean }>
	) => {
		doesGithubActionAlreadyExist = event.detail.pullRequestExists;
		console.log("event ran: ", event.detail.pullRequestExists);
	};

	let createProjectState = {} as CreateProjectState;
	const updateRespository = (e: CustomEvent<CreateProjectState>) => {
		createProjectState = e.detail;
	};

	const updateBuildSettings = (e: CustomEvent<CreateProjectState>) => {
		createProjectState.projectName = e.detail.projectName;
		createProjectState.buildSettings = e.detail.buildSettings;
	};

	const pullBuilds = async () => {
		const response = await fetch("/apis/services/github/actions/builds", {
			method: "POST",
			body: JSON.stringify({
				repo: "Adv360-Pro-ZMK",
				id: "C99FD726-95E6-422C-894C-A630122AF1AD",
			}),
		});
		const data = await response.json();
		console.log("response: ", data);
	};

	$: console.log("createProjectState: ", createProjectState);
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
		in:fly={{ y: 200, duration: 300 }}
	>
		{#if selectedTab === 0}
			<SelectRepo
				{data}
				{handleNext}
				on:select_repo={updateRespository}
			/>
		{/if}
		{#if selectedTab === 1}
			<Setup
				on:gha_pull_request={handleOnPRCreate}
				{handleNext}
				on:build_settings={updateBuildSettings}
				{createProjectState}
			/>
		{/if}
		{#if selectedTab === 2}
			<BuildProject {doesGithubActionAlreadyExist} {handleNext} />
		{/if}
	</div>
</div>
