<script lang="ts">
	import Star from '$lib/icons/star.svelte';
	import Globe from '$lib/icons/globe.svelte';
	import { RegistryBackend, type Repo } from '$apis/registry';
	import { onDestroy, onMount } from 'svelte';
	import Tag from '$lib/tag.svelte';
	import type { PageData } from './$types';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';

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
		const u = new URL(import.meta.env.VITE_OPEN_REGISTRY_BACKEND_URL);
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

<div
	class="desktop:min-h-max laptop:min-h-max min-h-[1700px] w-full laptop:max-w-[1000px] half:min-h-max  flex flex-col mx-2 py-4"
>
	<div
		class="flex py-24 desktop:py-14 laptop:py-10 half:py-10 px-20 mx-3 gap-8 bg-primary-50 border-b-0 border-2 border-primary-100"
	>
		<div class="flex items-center">
			<Globe
				styles="h-16 w-16 desktop:h-11 desktop:w-11 laptop:h-11 laptop:w-11 half:w-11 half:h-11 text-slate-700"
			/>
		</div>
		<div class="w-full text-slate-700">
			<div class="flex gap-4">
				<span class="text-[41px] laptop:text-3xl desktop:text-3xl half:text-2xl"
					>{data.username}/{data.repo}</span
				>
				<button
					class="bg-inherit p-0 inline-flex justify-center items-center m-0 border-0 cursor-default"
				>
					<Star styles="w-8 h-8 mt-1.5 half:w-5 half:h-5" />
				</button>
			</div>
			<span class="text-md desktop:text-sm capitalize">by {data.username}</span>
		</div>
	</div>

	<div
		class="flex gap-5 items-start justify-items-center mx-3 bg-primary-50 px-16 mb-8 border-t-0 border-2 border-primary-100"
	>
		<button
			on:click={toggleOverview}
			class="ease-in duration-300 h-10 px-4 pb-12 desktop:pb-6 text-center text-primary-500 bg-transparent border-b-2
					border-transparent text-[16px] apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base m-0
          hover:border-b-primary-400
          {isOverview ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Overview
		</button>

		<button
			on:click={toggleTags}
			class="ease-in duration-300 h-10 px-4 pb-12 desktop:pb-6 text-center text-primary-500 bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base m-0
          hover:border-b-primary-400
          {isTags ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Tags
		</button>
	</div>

	<div class="w-full h-full py-4 flex px-4 laptop:px-1 justify-center">
		{#if isTags}
			<div
				class="bg-white w-full max-w-[2000px] mx-3 flex-col gap-4 rounded-sm px-8 py-8 flex justify-center items-center border
				border-primary-200 shadow-2xl"
			>
				{#each repository.tags as tag}
					<Tag {tag} namespace={repository.namespace} />
				{/each}
			</div>
		{/if}

		{#if isOverview}
			<div class="flex laptop:flex-col half:flex-col justify-center items-center gap-10 w-full">
				<div
					class="min-w-max max-w-[1500px] w-2/3 min-h-[300px] laptop:min-h-[200px] half:min-h-[200px] bg-white border border-primary-200 shadow-2xl  mx-3 
					h-full rounded-sm px-8 py-8 flex justify-center items-center laptop:w-full half:w-full"
				>
					<span class="text-slate-500 text-3xl desktop:text-2xl laptop:text-2xl half:text-xl"
						>No Overview Available</span
					>
				</div>
				<div
					class="min-w-max max-w-[500px] min-h-[280px] laptop:min-h-[250px] laptop:gap-2 half:min-h-[230px] half:gap-2 flex flex-col 
					justify-center items-center gap-5 bg-white border border-primary-200 w-4/12 rounded-sm mx-4 px-4 laptop:mx-1 
					shadow-2xl laptop:w-full half:w-full half:mx-2"
				>
					<span class="text-xl text-slate-700 font-medium mb-4 laptop:text-lg half:text-lg"
						>Quick Docker Commands</span
					>

					<ButtonOutlined styles="lowercase" onClick={() => handleCopy('pull')}>
						<span
							class="{isCopied === 'pull'
								? 'font-semibold'
								: ''} select-all text-lg desktop:text-base laptop:text-sm half:text-sm text-primary-400 py-2 px-2 lowercase tracking-wide"
						>
							{isCopied === 'pull' ? 'Copied!!' : `docker pull openregistry.dev/${ns}`}
						</span>
					</ButtonOutlined>

					<ButtonOutlined onClick={() => handleCopy('push')}>
						<span
							class="{isCopied === 'push'
								? 'font-semibold'
								: ''} select-all text-lg desktop:text-base laptop:text-sm half:text-sm text-primary-400 px-2 py-2 lowercase tracking-wide"
						>
							{isCopied === 'push' ? 'Copied!!' : `docker push openregistry.dev/${ns}`}
						</span>
					</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
