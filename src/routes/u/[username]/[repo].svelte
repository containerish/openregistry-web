<script lang="ts" context="module">
	export const prerender: boolean = true;
	export async function load({ params }) {
		return {
			props: {
				repo: params.repo,
				username: params.username
			}
		};
	}
</script>

<script lang="ts">
	import Star from '$lib/icons/star.svelte';
	import Globe from '$lib/icons/globe.svelte';
	import { RegistryBackend, type Repo } from '../../../apis/registry';
	import { onDestroy, onMount } from 'svelte';
	import Tag from '$lib/tag.svelte';
	let isOverview = true;
	let isTags = false;

	let repository: Repo = {
		namespace: '',
		tags: []
	};

	const toggleOverview = () => {
		isOverview = true;
		isTags = false;
	};

	const toggleTags = () => {
		isTags = true;
		isOverview = false;
	};

	export let repo: string;
	export let username: string;
	const ns = username + '/' + repo;
	const registryBackend = new RegistryBackend();

	onMount(async () => {
		const { error, data } = await registryBackend.GetRepositoryDetails(ns);
		if (error) {
			console.error('error taglist: ', error);
			return;
		}

		repository = data;
	});

	let isCopied = '';
	let timeout: any;

	const handleCopy = (cmd: string) => {
		switch (cmd) {
			case 'push':
				isCopied = 'push';
				window.navigator.clipboard.writeText(
					`docker push ${import.meta.env.VITE_OPEN_REGISTRY_BACKEND_URL}/${ns}`
				);
				break;
			case 'pull':
				isCopied = 'pull';
				window.navigator.clipboard.writeText(
					`docker pull ${import.meta.env.VITE_OPEN_REGISTRY_BACKEND_URL}/${ns}`
				);
		}

		timeout = setTimeout(() => {
			isCopied = '';
		}, 2000);
	};

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="min-h-[93vh] bg-cream-50">
	<div class="flex flex-col w-full h-full mt-20">
		<div class="flex py-24 px-20 space-x-10 w-full bg-brown-400">
			<div>
				<Globe styles="h-16 w-16" />
			</div>
			<div class="w-full">
				<div class="flex gap-4">
					<h1 class="text-4xl font-medium">{username}/{repo}</h1>
					<button
						class="bg-inherit p-0 inline-flex justify-center items-center m-0 focus:border-none focus:p-0 focus:m-0"
					>
						<Star styles="w-8 h-8 mt-1.5" />
					</button>
				</div>
				<span class="text-md">by {username}</span>
			</div>
		</div>

		<div class="flex gap-5 items-start justify-items-center bg-brown-400 space-x-10 px-16 mb-10">
			<button
				on:click={toggleOverview}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-black
          {isOverview ? 'border-b-brown-900' : 'border-transparent'}"
			>
				Overview
			</button>

			<button
				on:click={toggleTags}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-black
          {isTags ? 'border-b-brown-900' : 'border-transparent'}"
			>
				Tags
			</button>
		</div>

		<div class="w-full flex px-5">
			{#if isTags}
				<div class="w-full flex-col gap-4 rounded-md px-8 py-8 flex justify-center items-center">
					{#each repository.tags as tag}
						<Tag {tag} namespace={repository.namespace} />
					{/each}
				</div>
			{/if}
			{#if isOverview}
				<div class="bg-gray-50 w-2/3 rounded-md px-28 py-20 flex justify-center items-center">
					<span class="text-brown-700 text-2xl">No Overview Available</span>
				</div>
				<div class="flex flex-col rounded-md mx-4 my-4 bg-gray-50 px-4 py-4">
					<h1 class="text-xl font-medium mb-4">Quick Docker Commands</h1>

					<div class="my-2 px-4 py-2 text-center bg-brown-400 rounded-md">
						<span
							on:click={() => handleCopy('push')}
							class="{isCopied === 'push'
								? 'font-semibold'
								: ''} select-all rounded-md text-sm text-gray-900"
						>
							{isCopied === 'push' ? 'Copied!!' : `docker push openregistry.dev/${ns}`}
						</span>
					</div>

					<div class="my-2 text-center px-4 py-2 bg-brown-400 rounded-md">
						<span
							on:click={() => handleCopy('pull')}
							class="{isCopied === 'pull' ? 'font-semibold' : ''} select-all text-sm text-gray-900 "
						>
							{isCopied === 'pull' ? 'Copied!!' : `docker pull openregistry.dev/${ns}`}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
