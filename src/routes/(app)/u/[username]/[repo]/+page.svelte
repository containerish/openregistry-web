<script lang="ts">
	import Star from '$lib/icons/star.svelte';
	import Globe from '$lib/icons/globe.svelte';
	import { RegistryBackend, type Repo } from '$apis/registry';
	import { onDestroy, onMount } from 'svelte';
	import Tag from '$lib/tag.svelte';
	import type { PageData } from './$types';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import IconButton from '$lib/icon-button.svelte';

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

	export let data: PageData;
	const ns = data.username + '/' + data.repo;
	const registryBackend = new RegistryBackend();

	onMount(async () => {
		const resp = await registryBackend.GetRepositoryDetails(ns);
		if (resp.error) {
			console.error('error taglist: ', resp.error);
			return;
		}

		repository = resp.data;
	});

	let isCopied = '';
	let timeout: any;

	const handleCopy = (cmd: string) => {
		const u = new URL(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		switch (cmd) {
			case 'push':
				isCopied = 'push';
				window.navigator.clipboard.writeText(`docker push ${u.hostname}/${ns}`);
				break;
			case 'pull':
				isCopied = 'pull';
				window.navigator.clipboard.writeText(`docker pull ${u.hostname}/${ns}`);
		}

		timeout = setTimeout(() => {
			isCopied = '';
		}, 2000);
	};

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="w-full max-w-[2000px] flex flex-col mx-2 py-4">
	<div
		class="flex py-10 lg:py-16 px-20 mx-3 gap-8 bg-primary-50 border-b-0 border-2 border-primary-100"
	>
		<div class="flex items-center">
			<Globe class="h-11 w-11 lg:h-16 lg:w-16 text-slate-700" />
		</div>
		<div class="w-full text-slate-700">
			<div class="flex gap-4 items-center">
				<span class="text-2xl lg:text-4xl">{data.username}/{data.repo}</span>
				<IconButton class="mt-3 w-2">
					<Star class="w-5 h-5 lg:w-8 lg:h-8" />
				</IconButton>
			</div>
			<span class="text-sm lg:text-base capitalize">by {data.username}</span>
		</div>
	</div>

	<div
		class="flex gap-5 items-start justify-items-center mx-3 bg-primary-50 px-16 mb-8 border-t-0 border-2
		border-primary-100"
	>
		<button
			aria-label="tab for overview"
			on:click={toggleOverview}
			class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
			border-transparent text-base lg:text-xl whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isOverview ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Overview
		</button>

		<button
			aria-label="tab for Tags"
			on:click={toggleTags}
			class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-base lg:text-xl whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isTags ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Tags
		</button>
	</div>

	<div class="w-full h-full py-4 flex px-3 justify-center">
		{#if isTags}
			<div
				class="bg-white w-full mx-3 flex-col gap-4 rounded-sm px-8 py-8 flex justify-center
				items-center border border-primary-200 shadow-2xl"
			>
				{#each repository.tags as tag}
					<Tag {tag} namespace={repository.namespace} />
				{/each}
			</div>
		{/if}

		{#if isOverview}
			<div class="flex flex-col lg:flex-row justify-center items-center gap-10 w-full">
				<div
					class="min-w-max w-full bg-white border border-primary-200 shadow-2xl mx-3 h-full rounded-sm
					px-8 py-8 flex justify-center items-center min-h-[200px]"
				>
					<span class="text-slate-500 text-xl lg:text-2xl"> No Overview Available </span>
				</div>
				<div
					class="min-w-max flex flex-col justify-center items-center gap-5 py-6
					bg-white border border-primary-200 rounded-sm mx-4 px-4 shadow-2xl"
				>
					<span class="text-lg lg:text-xl text-slate-700 font-medium mb-4"
						>Quick Docker Commands</span
					>

					<ButtonOutlined class="lowercase" on:click={() => handleCopy('pull')}>
						<span
							class="{isCopied === 'pull'
								? 'font-semibold'
								: ''} select-all text-sm lg:text-base text-primary-400
								py-2 px-2 lowercase tracking-wide"
						>
							{isCopied === 'pull' ? 'Copied!!' : `docker pull openregistry.dev/${ns}`}
						</span>
					</ButtonOutlined>

					<ButtonOutlined on:click={() => handleCopy('push')}>
						<span
							class="{isCopied === 'push'
								? 'font-semibold'
								: ''} select-all text-sm lg:text-base text-primary-400
								px-2 py-2 lowercase tracking-wide"
						>
							{isCopied === 'push' ? 'Copied!!' : `docker push openregistry.dev/${ns}`}
						</span>
					</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
