<script lang="ts">
	import { Repository } from '$lib/components';
	import { RegistryBackend, type Catalog } from '$apis/registry';
	import { UserIcon, StarIcon, UserGroupIcon } from '$lib/icons';

	import type { PageData } from './$types';
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

	const backend = new RegistryBackend();

	let catalog: Catalog;

	const fetchPageData = async (offset?: number) => {
		const resp = await backend.ListCatalog(
			backend.DefaultPageSize,
			backend.DefaultPageSize * offset,
			data.user.username
		);

		if (resp.error) {
			console.error('error in repo/index: fetchPageData: ', resp.error);
			return;
		}

		catalog = resp.data;
	};
</script>

<svelte:head>
	<title>User | Open Registry</title>
</svelte:head>

{#if data.user}
	<div class="min-h-[1500px] bg-white">
		<div
			class="flex gap-5 space-x-10 min-w-max max-w-[] justify-start items-center py-24 mt-20 px-20 
			bg-primary-50 text-slate-700 border-b-0 mx-5 border-2 border-primary-200"
		>
			<div class="px-4" />
			<div>
				<UserIcon styles="h-24 w-24 text-slate-700" />
			</div>
			<div class="flex-initial w-64">
				<h1 class="text-4xl font-medium capitalize text-slate-700">
					{data.user.name ? data.user.name : data.user.username}
				</h1>
				<div class="flex mt-3">
					<UserIcon styles="h-6 w-6" />
					<span class="text-lg font-normal">Community User</span>
				</div>
			</div>
			<div class="flex flex-col flex-initial w-32 lg:w-72">
				<a class="text-xl underline-offset-4" href="/settings"><u>Edit Profile</u></a>
				<span class="mt-3 text-md">
					Joined
					<span>
						{new Date(data.user.created_at).toDateString()}
					</span>
				</span>
			</div>
		</div>

		<div
			class="flex gap-5 min-w-max items-start justify-items-center bg-primary-50 space-x-10 pb-2 
			px-20 mb-10 border-t-0 border-2 border-primary-200 mx-5"
		>
			<button
				on:click={toggleRepo}
				class="ease-in duration-300 h-10 pb-9 py-2 text-center bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base 
          hover:border-b-primary-200 text-primary-600
          {isRepo ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Repositories
			</button>

			<button
				on:click={toggleStarred}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-primary-200 text-primary-600
          {isStarred ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Starred
			</button>

			<button
				on:click={toggleisContrib}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center bg-transparent border-b-2
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-primary-200 text-primary-600
          {isContrib ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Contributed
			</button>
		</div>

		{#if isRepo}
			<div>
				<div class="w-full px-16 py-8">
					{#if catalog?.repositories}
						{#each catalog.repositories as repo}
							<Repository compact={false} data={repo} />
						{/each}
					{:else}
						<div
							class="h-80 bg-slate-50 w-full shadow-inner rounded-md px-28 py-20 flex justify-center items-center"
						>
							<span class="text-slate-500 text-3xl">No Repositories</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		{#if isStarred}
			<div class="w-full px-16 py-8">
				<div
					class="h-80 bg-slate-50 shadow-inner w-full rounded-md px-28 py-20 flex flex-col justify-center items-center space-y-2"
				>
					<StarIcon styles="h-10 w-10 text-slate-500" />
					<span class="text-slate-500 text-3xl">Your starred repositories will show here</span>
					<span class="text-slate-600 font-light text-lg xl:text-xl">
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}

		{#if isContrib}
			<div class=" w-full px-16 py-8">
				<div
					class="h-80 bg-slate-50 shadow-inner w-full rounded-md px-28 py-20 flex flex-col justify-center items-center space-y-2"
				>
					<UserGroupIcon styles="h-10 w-10 text-slate-600" />
					<span class="text-slate-500 text-3xl">Your Contributions will be placed here</span>
					<span class="text-slate-500 font-light text-lg xl:text-xl">
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}
