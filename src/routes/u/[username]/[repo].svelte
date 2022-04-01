<script lang="ts" context="module">
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
	import { onMount } from 'svelte';
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
				<div class="w-full flex-col gap-4 rounded-md px-8 py-4 flex justify-center items-center">
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
					<span class="rounded-md bg-brown-400 text-sm text-gray-900 my-2 px-4 py-2">
						docker push cntr.sh/{ns}
					</span>
					<span class="rounded-md bg-brown-400 text-sm text-gray-900 my-2 px-4 py-2">
						docker pull cntr.sh/{ns}
					</span>
				</div>
			{/if}
		</div>
	</div>
</div>
