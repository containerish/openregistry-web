<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Tag from '$lib/tag.svelte';
	import type { PageData } from './$types';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import type { Repo } from '$apis/registry';

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

	onMount(async () => {
		const url = new URL('/apis/registry/repository-detail', $page.url.origin);
		url.searchParams.set('namespace', ns);

		const response = await fetch(url);
		if (response.status !== 200) {
			console.log('error retrieaving tags', await response.json());
			return;
		}
		repository = await response.json();
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

	const getImageCommand = (ns: string, subcommand: 'pull' | 'push' = 'pull') => {
		const u = new URL(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		switch (subcommand) {
			case 'pull':
				return `docker pull ${u.host}/${ns}`;
			case 'push':
				return `docker push ${u.host}/${ns}`;
		}
	};
</script>

<div class="w-full max-w-[2000px] flex flex-col mx-2 py-4">
	<div
		class="flex py-10 lg:py-16 px-9 md:px-20 mx-3 gap-8 bg-primary-50 border-b-0 border-2 border-primary-100"
	>
		<div class="flex items-center">
			<img src="/cube-dark.png" alt="container" width="80px" class="" />
		</div>
		<div class="w-full text-slate-700 flex flex-col gap-3">
			<!-- <div class="flex gap-4 items-center"> -->
			<!-- <IconButton class="mt-3 w-3">
					<Star class="w-5 h-5 lg:w-8 lg:h-8" />
				</IconButton> -->
			<!-- </div> -->
			<span class="text-2xl lg:text-4xl">{data.username}/{data.repo}</span>
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

	<div class="w-full py-4 flex px-3 justify-center">
		{#if isTags}
			<div
				class="bg-white w-full mx-3 flex-col gap-4 rounded-sm px-3 py-6 flex justify-center
				items-center border border-primary-100/50 shadow-2xl"
			>
				{#each repository.tags as tag}
					<Tag {tag} namespace={repository.namespace} />
				{/each}
			</div>
		{/if}

		{#if isOverview}
			<div class="flex flex-col xl:flex-row justify-center items-center gap-10 w-full px-9 xl:px-3">
				<div
					class="w-full bg-white border border-primary-100/50 shadow-2xl mx-3 h-full rounded-sm
					px-8 py-8 flex justify-center items-center min-h-[200px] min-w-[500px]"
				>
					<span class="text-slate-500 text-xl lg:text-2xl"> No Overview Available </span>
				</div>
				<div
					class="min-w-max flex flex-col justify-center items-center gap-5 py-6
					bg-white border border-primary-100/50 rounded-sm mx-4 px-6 shadow-2xl"
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
							{isCopied === 'pull' ? 'Copied!!' : getImageCommand(ns, 'pull')}
						</span>
					</ButtonOutlined>

					<ButtonOutlined on:click={() => handleCopy('push')}>
						<span
							class="{isCopied === 'push'
								? 'font-semibold'
								: ''} select-all text-sm lg:text-base text-primary-400
								px-2 py-2 lowercase tracking-wide"
						>
							{isCopied === 'push' ? 'Copied!!' : getImageCommand(ns, 'push')}
						</span>
					</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
