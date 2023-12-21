<script lang="ts">
	import { Repository } from '$lib/components';
	import { CubeIcon, ProfileIcon, StarIcon, UserGroupIcon } from '$lib/icons';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { RepositoryCatalog } from '$lib/types/registry';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import { page } from '$app/stores';

	export let data: PageData;

	let isRepo = true;
	let isStarred = false;
	let isContrib = false;

	const toggleRepo = () => {
		isContrib = false;
		isStarred = false;
		isRepo = true;
	};

	const toggleStarred = () => {
		isRepo = false;
		isContrib = false;
		isStarred = true;
	};

	const toggleisContrib = () => {
		isRepo = false;
		isStarred = false;
		isContrib = true;
	};

	let catalog: RepositoryCatalog = {
		repositories: [],
		total: 0,
	};

	const client = new OpenRegistryClient(fetch, $page.url.origin);
	const listUserCatalog = async (visibility?: 'Public' | 'Private') => {
		const response = await client.getUserRepositoryCatalog(visibility);
		if (response.error) {
			console.log('error listing user catalog: ', response.error);
			return;
		}

		catalog = response;
	};

	onMount(async () => {
		await listUserCatalog();
	});
</script>

<svelte:head>
	<title>User | Open Registry</title>
</svelte:head>

{#if data.user}
	<div class="w-full max-w-[2000px] flex flex-col">
		<div class="flex flex-col items-center md:flex-row md:items-end py-20 px-9 lg:px-20 gap-8 bg-primary-50">
			<div class="flex">
				<img src="/user.png" alt="Profile" width="90px" />
			</div>
			<div class="flex flex-col gap-3 items-center md:items-start">
				<div class="flex items-center gap-9">
					<span class="text-3xl font-medium capitalize text-slate-600">
						{data.user.username}
					</span>
					<a class="text-sm text-primary-400 underline-offset-4 md:mt-2" href="/settings">
						<u>Edit Profile</u>
					</a>
				</div>
				<div class="flex items-center gap-7">
					<div class="flex items-center">
						<ProfileIcon class="h-4 w-4 text-slate-500 fill-current" />
						<span class="text-sm text-slate-500">Community User</span>
					</div>
					<span class=" text-sm text-slate-600">
						Joined
						<span>
							{new Date(data.user.created_at).toDateString()}
						</span>
					</span>
				</div>
			</div>
		</div>

		<div
			class="flex gap-5 min-w-max items-start justify-items-center bg-primary-50
			px-3 lg:px-16 mb-10 shadow-2xl"
		>
			<button
				aria-label="tab for repositories"
				on:click={toggleRepo}
				class="ease-in duration-300 h-10 px-4 pb-6 text-center bg-transparent border-b-4
				border-transparent text-base whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isRepo ? 'border-b-primary-400 text-primary-500 font-medium' : 'border-b-transparent text-slate-600'}
          "
			>
				Repositories
			</button>

			<button
				aria-label="tab for starred repositories"
				on:click={toggleStarred}
				class="ease-in duration-300 h-10 px-4 pb-6 text-center bg-transparent border-b-4
				border-transparent text-base whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isStarred ? 'border-b-primary-400 text-primary-500 font-medium' : 'border-b-transparent text-slate-600'}
          "
			>
				Starred
			</button>

			<button
				aria-label="tab for contributed repositories"
				on:click={toggleisContrib}
				class="ease-in duration-300 h-10 px-4 pb-6 text-center bg-transparent border-b-4
				border-transparent text-base whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isContrib ? 'border-b-primary-400 text-primary-500 font-medium' : 'border-b-transparent text-slate-600'}
          "
			>
				Contributed
			</button>
		</div>

		<div in:fly={{ y: 200, duration: 300 }}>
			{#if isRepo}
				<div class="w-full px-8 py-8">
					{#if catalog.repositories && catalog.repositories.length > 0}
						{#each catalog.repositories as repo}
							<Repository username={data.user.username} compact={false} repository={repo} />
						{/each}
					{:else}
						<div
							class="h-full min-h-[200px] border border-primary-100/50 bg-white w-full shadow-2xl
							rounded py-8 px-2 flex justify-center items-center flex-col gap-3"
						>
							<CubeIcon class="h-8 w-8 text-primary-500/80" />
							<span class="text-slate-500 text-2xl">No Repositories Yet</span>
							<span class="text-slate-600 text-base text-center antialiased">
								Try pushing some container images, want to find out how? follow the
								<a class="text-primary-400" href="https://docs.openregistry.dev">Docs</a>
							</span>
						</div>
					{/if}
				</div>
			{/if}

			{#if isStarred}
				<div class="w-full px-8 py-8">
					<div
						class="h-full min-h-[200px] border border-primary-100/50 bg-white w-full shadow-2xl
					rounded py-8 flex justify-center items-center flex-col gap-3"
					>
						<StarIcon class="h-8 w-8 text-primary-500/80" />
						<span class="text-slate-500 text-2xl text-center">Your starred repositories will show here</span
						>
						<span class="text-slate-600 text-base text-center antialiased">
							We're working on bringing this feature as we build more analytics
						</span>
					</div>
				</div>
			{/if}

			{#if isContrib}
				<div class=" w-full px-8 py-8">
					<div
						class="h-full min-h-[200px] border border-primary-100/50 bg-white w-full shadow-2xl
					rounded py-8 flex justify-center items-center flex-col gap-3"
					>
						<UserGroupIcon class="h-8 w-8 text-primary-500/80" />
						<span class="text-slate-500 text-2xl text-center">Your Contributions will show up here</span>
						<span class="text-slate-500 text-base text-center">
							We're working on bringing this feature as we build more analytics
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
