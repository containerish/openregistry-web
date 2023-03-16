<script lang="ts">
	import { Repository } from '$lib/components';
	import { RegistryBackend, type Catalog } from '$apis/registry';
	import { CubeIcon, ProfileIcon, StarIcon, UserGroupIcon } from '$lib/icons';

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
	<div class="w-full max-w-[2000px] flex flex-col mx-2 py-4">
		<div class="flex py-10 lg:py-16 px-20 mx-3 gap-8 bg-primary-50 border-b-0 border-2 border-primary-100">
			<div class="flex items-center">
				<ProfileIcon styles="h-11 w-11 lg:h-16 lg:w-16 text-slate-600" />
			</div>
			<div class="flex flex-col w-64 justify-center">
				<span class="text-2xl lg:text-4xl font-medium capitalize text-slate-700">
					{data.user.name ? data.user.name : data.user.username}
				</span>
				<div class="flex items-center gap-1">
					<ProfileIcon styles="h-5 w-5 text-slate-600" />
					<span class="text-sm lg:text-base text-slate-600">Community User</span>
				</div>
			</div>
			<div class="flex flex-col">
				<a
					class="text-base lg:text-lg font-medium text-primary-500 underline-offset-4"
					href="/settings"><u>Edit Profile</u></a
				>
				<span class="mt-3 text-xs lg:text-base text-slate-600">
					Joined
					<span>
						{new Date(data.user.created_at).toDateString()}
					</span>
				</span>
			</div>
		</div>

		<div
			class="flex gap-5 min-w-max items-start justify-items-center bg-primary-50
			px-3 lg:px-16 mb-10 border-t-0 border-2 border-primary-100 mx-3"
		>
			<button
				on:click={toggleRepo}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-base lg:text-xl whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isRepo ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Repositories
			</button>

			<button
				on:click={toggleStarred}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-base lg:text-xl whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isStarred ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Starred
			</button>

			<button
				on:click={toggleisContrib}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-base lg:text-xl whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isContrib ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Contributed
			</button>
		</div>

		{#if isRepo}
			<div>
				<div class="w-full px-8 py-8">
					{#if catalog?.repositories}
						{#each catalog.repositories as repo}
							<Repository compact={false} data={repo} />
						{/each}
					{:else}
						<div class="h-full min-h-[200px] border border-primary-200 bg-white w-full shadow-2xl 
							rounded py-8 px-2 flex justify-center items-center flex-col gap-3">
							<CubeIcon styles="h-8 w-8 text-slate-500" />
							<span class="text-slate-500 text-xl lg:text-2xl">No Repositories Yet</span>
							<span class="text-slate-600 text-base text-center antialiased">
								Try pushing some container images, want to find out how? follow the
								<a class="text-primary-400" href="https://docs.openregistry.dev">Docs</a>
							</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		{#if isStarred}
			<div class="w-full px-8 py-8">
				<div
					class="h-full min-h-[200px] border border-primary-200 bg-white w-full shadow-2xl 
					rounded py-8 flex justify-center items-center flex-col gap-3"
				>
					<StarIcon styles="h-8 w-8 text-slate-500" />
					<span class="text-slate-500 text-xl lg:text-2xl text-center"
						>Your starred repositories will show here</span
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
					class="h-full min-h-[200px] border border-primary-200 bg-white w-full shadow-2xl 
					rounded py-8 flex justify-center items-center flex-col gap-3"
				>
					<UserGroupIcon styles="h-8 w-8 text-slate-500" />
					<span class="text-slate-500 text-xl lg:text-2xl text-center"
						>Your Contributions will show up here</span
					>
					<span class="text-slate-500 text-base text-center">
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}
