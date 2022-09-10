<script lang="ts">
	import AddAccountIcon from '$lib/icons/add-account.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Input from '$lib/textfield.svelte';
	import ArrowDown from '$lib/icons/arrow-down.svelte';
	import { fade, slide, scale } from 'svelte/transition';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import CheckIcon from '$lib/icons/checkIcon.svelte';
	import Button from '$lib/button.svelte';

	export let data: PageData;
	const installationId = $page.url.searchParams.get('installation_id');

	let selectedRepo: string;

	function handleRepoSelect(repo: string) {
		selectedRepo = repo;
	}

	console.log('data: ', data);

	$: {
		console.log('selectedRepo: ', selectedRepo);
	}
</script>

<div class="flex flex-col bg-cream-50 items-center space-y-6 px-10 pb-52 pt-20 min-h-[77vh]">
	<div class="flex static space-x-2 mx-4 mb-10">
		<div class="rounded-full bg-brown-600 w-6 text-white shadow-lg flex justify-center">1</div>
		<div class="text-sm">select repository</div>
		<div class="w-12 border-t-2 border-brown-500 mt-2" />
		<div
			on:click={() => goto('/apps/github/connect/setup')}
			class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center cursor-pointer"
		>
			2
		</div>
		<div class="text-sm">set up builds and deployments</div>
		<div class="w-12 border-t-2 border-brown-500 mt-2" />
		<div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">3</div>
		<div class="text-sm">deploy site</div>
	</div>

	<div
		class="bg-white rounded-md p-20 min-h-max shadow-lg w-3/4"
		transition:fade={{ delay: 300, duration: 300 }}
	>
		<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
			<span class="text-2xl font-bold text-brown-800">Deploy a site from your account</span>
			<span class="text-center text-lg"
				>Select a repository to connect as your project’s source code. New commits will trigger
				Cloudflare to automatically build and deploy your changes.
			</span>
		</div>
		<div class="flex space-x-2 items-center mt-10">
			<img src="/github.svg" alt="github-logo" width="24" />
			<span class="text-lg font-semibold">Github | </span>
			<span class="text-md font-light"> more coming soon</span>
		</div>
		<div class="flex flex-col relative my-4">
			<div class="w-24 bg-brown-700 h-[4px] rounded-md absolute" />
			<div class="bg-gray-300 h-[1px] mt-0.5 ml-24" />
		</div>

		<div class=" space-y-1 mt-20">
			<div class="flex space-x-1 ml-2">
				<img src="/github.svg" alt="github-logo" width="20" />
				<span class="text-md font-semibold text-brown-900"> Github account</span>
			</div>
			<div class="flex relative w-2/5">
				<div class="w-full">
					<div class="flex items-center px-2" />
					<input
						bind:value={data.githubUsername}
						disabled
						class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-500 bg-white
	 bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
	 border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-500"
					/>
				</div>
				<!-- <div class="absolute right-1 top-2"> -->
				<!-- 	<ArrowDown /> -->
				<!-- </div> -->
			</div>
			<div class="flex space-x-1">
				<button class="flex border-none bg-brown-300 opacity-50 rounded-md" disabled>
					<AddAccountIcon />
					<span class="text-brown-800 text-md">Add account</span>
				</button>
			</div>
		</div>
		<div class="flex flex-col mt-14 space-y-3">
			<span class="ml-2 text-md font-semibold">Select a repository</span>
			{#if installationId && !data.repoList}
				<div class="flex justify-center items-center py-4 w-full">
					<svg
						class="animate-spin -ml-1 mr-3 h-8 w-8 text-brown-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
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
					<span class="font-semibold text-brown-600">Loading...</span>
				</div>
			{:else}
				<div class="grid-flow-row grid grid-cols-2 gap-4">
					{#each data.repoList as repo}
						<button
							on:click={() => handleRepoSelect(repo.repository.name)}
							class="bg-white rounded-md border-2 gap-2 border-brown-300 flex justify-center items-center py-1 {repo
								.repository.name === selectedRepo
								? 'bg-cream-50'
								: ''}"
						>
							{repo.repository.name}
							{#if repo.repository.name === selectedRepo}
								<CheckIcon styles="text-brown-700" />
							{/if}
						</button>
					{/each}
				</div>
			{/if}
			<span class="text-sm text-gray-700">
				If your repository is not shown, configure repository access for OpenRegistry app on Github.
			</span>
		</div>
		<hr class="mt-20 border-1 border-gray-300" />
		<div class="flex justify-between items-center mt-10">
			<span
				on:click={() => goto('/apps/github/connect')}
				class="text-brown-800 underline underline-offset-4 text-lg cursor-pointer">Cancel</span
			>
			<button
				on:click={() =>
					goto(
						`/apps/github/connect/setup?selected_repo=${selectedRepo}&github_username=${data.githubUsername}`
					)}
				class="rounded-md text-white bg-brown-700 px-6 py-3 mt-2 tracking-wide text-lg"
			>
				Begin setup
			</button>
		</div>
	</div>
</div>
