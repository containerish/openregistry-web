<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ghStore } from '$lib/stores';
	import { CheckIcon, AddAccountIcon, GithubIcon, GithubOutlinedIcon } from '$lib/icons';
	import type { AuthorisedRepository } from '../../../../../(marketing)/+layout.server';
	import Dialog from '$lib/dialog.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import type { PageData } from './$types';
	import Textfield from '$lib/textfield.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	let openDialog = false;
	let disabled = false;

	export let data: PageData;
	const installationId = $page.url.searchParams.get('installation_id');

	let selectedRepo: string;
	export let handleNext;

	async function handleRepoSelect(repo: AuthorisedRepository) {
		selectedRepo = repo.repository.name;
		await ghStore.setSelectedRepository(repo);
		await ghStore.setAllAuthorisedRepositories(data.repoList);
		await ghStore.setGithubUsername(repo.repository.owner.login);
	}
</script>

<div class="relative desktop:w-[800px] laptop:w-[420px] half:w-[300px]">
	<div
		class="flex flex-col justify-center items-center space-x-5 space-y-5 desktop:space-y-3 laptop:space-y-2 half:space-y-1"
	>
		<span class="text-2xl text-center font-bold text-primary-600">Deploy a site from your account</span>
		<div class="flex flex-col text-center desktop:flex desktop:flex-col text-xl text-slate-700">
			<span class="text-center text-lg desktop:text-sm laptop:text-sm half:text-sm"
				>Select a repository to connect as your project’s source code. New commits will trigger
				OpenRegistry to automatically build and deploy your changes.
			</span>
		</div>
	</div>
	<hr class="mt-10 desktop:mt-5 laptop:mt-5 half:mt-5 border-1 border-gray-300" />
	<div class="flex gap-2 desktop:gap-1 items-center mt-10 text-primary-600">
		<GithubIcon styles="h-6 w-6" />
		<span class="text-base desktop:text-base apple:text-xl font-semibold">Github | </span>
		<span class="font-light laptop:text-sm half:text-sm"> more coming soon</span>
	</div>
	<div class="flex flex-col relative my-3">
		<div class="w-24 bg-primary-200 h-1 rounded-md absolute" />
		<div class="bg-gray-300 h-[1px] mt-0.5 ml-24" />
	</div>

	<div
		class="flex flex-col gap-2 justify-center items-start space-y-1 mt-12 desktop:mt-6 laptop:mt-6 half:mt-4 apple:mt-20 uw:mt-20"
	>
		<div class="flex items-center space-x-1 ml-2 text-slate-600">
			<!-- <GithubOutlinedIcon styles="text-slate-600 desktop:w-5 desktop:h-5" /> -->
			<span class="text-lg desktop:text-base laptop:text-base half:text-base font-semibold text-slate-600"> Github account</span>
		</div>
		<div class="flex relative w-2/5">
			<div class="w-full">
				<div class="flex items-center px-2" />
				<Textfield type="search" disabled bind:value={data.githubUsername} />
			</div>
		</div>
		<ButtonOutlined styles="px-1 py-2" disabled>
			<AddAccountIcon styles="desktop:h-4 desktop:w-4 text-primary-300" />
			<span class="text-sm">Add account</span>
		</ButtonOutlined>
	</div>
	<div class="flex flex-col mt-14 desktop:mt-10 laptop:mt-8 space-y-3">
		<span class="ml-2 text-xl desktop:text-base laptop:text-base half:text-base font-semibold text-slate-600"
			>Select a repository</span
		>
		{#if installationId && !data.repoList}
			<div class="flex justify-center items-center py-4 w-full">
				<svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-brown-600" fill="none" viewBox="0 0 24 24">
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
						5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<span class="font-semibold text-slate-600">Loading...</span>``
			</div>
		{:else}
			<div class="grid-flow-row grid grid-cols-2 gap-4 text-lg ">
				{#each data.repoList as repo}
					<button
						on:click={() => handleRepoSelect(repo)}
						class="bg-white text-slate-700 desktop:text-base laptop:text-base half:text-sm rounded-sm border-2 gap-2 border-primary-100 flex justify-center 
						items-center py-3 desktop:py-2 laptop:py-2 half:py-2 hover:shadow-2xl {repo.repository.name === selectedRepo
							? 'bg-primary-100 shadow-2xl shadow-primary-300'
							: ''}"
					>
						{repo.repository.name}
						{#if repo.repository.name === selectedRepo}
							<CheckIcon styles="text-primary-400" />
						{/if}
					</button>
				{/each}
			</div>
		{/if}
		<span class="text-slate-700 desktop:text-sm laptop:text-sm half:text-sm">
			If your repository is not shown, configure repository access for OpenRegistry app on Github.
		</span>
	</div>
	<hr class="mt-10 desktop:mt-10 apple:mt-20 uw:mt-20 border-1 border-gray-300" />
	<div class="flex justify-between items-center mt-10">
		<span
			on:click={() => goto('/apps/github/connect')}
			on:keypress={() => goto('/apps/github/connect')}
			class="text-slate-600 underline underline-offset-4 text-base desktop:text-base apple:text-lg uw:text-lg cursor-pointer"
			>Cancel</span
		>
		{#if !selectedRepo}
			<ButtonSolid
				{disabled}
				on:click={() => {
					openDialog = true;
					disabled = true;
				}}>Begin setup</ButtonSolid
			>
		{:else}
			<ButtonSolid on:click={() => handleNext(1)}>Begin setup</ButtonSolid>
		{/if}
	</div>

	{#if openDialog}
		<Dialog styles="shadow-3xl shadow-primary-600">
			<div class="px-5 py-10 flex flex-col justify-center items-center gap-6">
				<span class="text-slate-700 text-2xl font-bold antialiased">
					please select a repository!!
				</span>
				<span class="text-lg text-slate-700">
					in order to build the project, you must select a repository
				</span>
				<ButtonSolid type="submit" on:click={() => (openDialog = false)}>Got it!</ButtonSolid>
			</div>
		</Dialog>
	{/if}
</div>
