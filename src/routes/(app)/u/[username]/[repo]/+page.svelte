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

<div class="min-h-[1500px] bg-white">
	<div class="flex flex-col w-full h-full mt-20">
		<div class="flex py-24 px-20 mx-3 gap-8 bg-slate-100 border-b-0 border-2 border-primary-100">
			<div>
				<Globe styles="h-16 w-16 text-slate-700" />
			</div>
			<div class="w-full text-slate-700">
				<div class="flex gap-4">
					<h1 class="text-[41px]">{data.username}/{data.repo}</h1>
					<button
						class="bg-inherit p-0 inline-flex justify-center items-center m-0 focus:border-none focus:p-0 focus:m-0"
					>
						<Star styles="w-8 h-8 mt-1.5" />
					</button>
				</div>
				<span class="text-md capitalize">by {data.username}</span>
			</div>
		</div>

		<div
			class="flex gap-5 items-start justify-items-center mx-3 bg-slate-100 px-16 mb-10 border-t-0 border-2 border-primary-100"
		>
			<button
				on:click={toggleOverview}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-primary-400
          {isOverview ? 'border-b-primary-500' : 'border-transparent'}"
			>
				Overview
			</button>

			<button
				on:click={toggleTags}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-primary-400
          {isTags ? 'border-b-primary-500' : 'border-transparent'}"
			>
				Tags
			</button>
		</div>

		<div class="w-full h-full py-4 flex px-4 justify-center">
			{#if isTags}
				<div
					class="bg-slate-50 w-full max-w-[2000px] mx-3 flex-col gap-4 rounded-sm 
					shadow-inner px-8 py-8 flex justify-center items-center"
				>
					{#each repository.tags as tag}
						<Tag {tag} namespace={repository.namespace} />
					{/each}
				</div>
			{/if}

			{#if isOverview}
				<div class="flex justify-center items-center gap-10 w-full">
					<div
						class="min-w-max max-w-[1500px] w-2/3 min-h-[300px] bg-slate-50 border border-primary-50 shadow-inner  mx-3 
					h-full rounded-md px-8 py-8 flex justify-center items-center"
					>
						<span class="text-slate-500 text-3xl">No Overview Available</span>
					</div>
					<div
						class="min-w-max max-w-[500px] min-h-[300px] flex flex-col justify-center items-center gap-5 bg-slate-50 border
						border-primary-50 shadow-inner w-4/12 rounded-md mx-4 px-4 py-8"
					>
						<h1 class="text-xl text-primary-700 font-medium ">Quick Docker Commands</h1>

						<ButtonOutlined styles="lowercase" onClick={() => handleCopy('pull')}>
							<span
								class="{isCopied === 'pull'
									? 'font-semibold'
									: ''} select-all text-lg text-primary-400 py-2 px-2 lowercase tracking-wide"
							>
								{isCopied === 'pull' ? 'Copied!!' : `docker pull openregistry.dev/${ns}`}
							</span>
						</ButtonOutlined>

						<ButtonOutlined onClick={() => handleCopy('push')}>
							<span
								class="{isCopied === 'push'
									? 'font-semibold'
									: ''} select-all text-lg text-primary-400 px-2 py-2 lowercase tracking-wide"
							>
								{isCopied === 'push' ? 'Copied!!' : `docker push openregistry.dev/${ns}`}
							</span>
						</ButtonOutlined>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
