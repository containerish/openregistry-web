<script lang="ts">
	import { Repository } from '$lib/components';
	import { RegistryBackend, type Catalog } from '$apis/registry';
	import { ProfileIcon, StarIcon, UserGroupIcon } from '$lib/icons';

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
	<div class="min-h-[1710px] desktop:min-h-max laptop:min-h-max half:min-h-max w-full">
		<div
			class="flex gap-5 min-w-max justify-start items-center py-24 desktop:py-14 laptop:py-10 half:py-10 mt-20 desktop:mt-12 px-8 
			bg-primary-50 text-slate-700 border-b-0 mx- border-2 border-primary-100"
		>
			<div class="px-4" />
			<div>
				<ProfileIcon
					styles="text-primary-500 h-20 w-20 text-slate-700 desktop:h-12 desktop:w-12 laptop:w-12 laptop:h-12 half:h-12 half:w-12"
				/>
			</div>
			<div class="flex-initial w-64 justify-center">
				<span
					class="text-4xl desktop:text-3xl laptop:text-2xl half:text-2xl font-medium capitalize text-slate-700"
				>
					{data.user.name ? data.user.name : data.user.username}
				</span>
				<div class="flex mt-3 desktop:mt-2 laptop:mt-1 half:mt-1 items-center gap-1">
					<ProfileIcon
						styles="h-6 w-6 desktop:h-4 desktop:w-4 laptop:w-4 laptop:h-4 half:w-4 half:h-4"
					/>
					<span class="text-lg desktop:text-base laptop:text-sm half:text-sm font-normal"
						>Community User</span
					>
				</div>
			</div>
			<div class="flex flex-col flex-initial w-32 lg:w-72">
				<a
					class="text-xl desktop:text-base laptop:text-sm half:text-sm underline-offset-4"
					href="/settings"><u>Edit Profile</u></a
				>
				<span class="mt-3 text-md desktop:text-xs laptop:text-xs half:text-xs">
					Joined
					<span>
						{new Date(data.user.created_at).toDateString()}
					</span>
				</span>
			</div>
		</div>

		<div
			class="flex gap-5 min-w-max items-start justify-items-center bg-primary-50 space-x-10 pb-
			px-20 mb-10 border-t-0 border-2 border-primary-100 mx-"
		>
			<button
				on:click={toggleRepo}
				class="ease-in duration-200 h-10 pb-10 py-5 desktop:py-2 m-0 text-center bg-transparent border-b-[3px]
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base 
          hover:border-b-primary-200 text-primary-600
          {isRepo ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Repositories
			</button>

			<button
				on:click={toggleStarred}
				class="ease-in duration-200 h-10 px-4 pb-10 py-5 desktop:py-2 m-0 text-center bg-transparent border-b-[3px]
					border-transparent apple:text-[22px] uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-primary-200 text-primary-600
          {isStarred ? 'border-b-primary-500' : 'border-b-transparent'}
          "
			>
				Starred
			</button>

			<button
				on:click={toggleisContrib}
				class="ease-in duration-200 h-10 px-4 pb-10 py-5 desktop:py-2 m-0 text-center bg-transparent border-b-[3px]
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
							class="h-80 laptop:h-40 half:h-40 border border-primary-200 bg-white w-full shadow-2xl rounded-md px-28 py-20 flex justify-center items-center"
						>
							<span class="text-slate-500 text-3xl desktop:text-2xl laptop:text-xl half:text-xl"
								>No Repositories</span
							>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		{#if isStarred}
			<div class="w-full px-16 py-8">
				<div
					class="h-80 laptop:h-50 half:h-40 bg-white border border-primary-200 shadow-2xl w-full rounded-md px-28 py-20 flex flex-col justify-center items-center space-y-2"
				>
					<StarIcon styles="h-10 w-10 text-slate-500" />
					<span
						class="text-slate-500 text-3xl desktop:text-2xl laptop:text-xl half:text-xl text-center"
						>Your starred repositories will show here</span
					>
					<span
						class="text-slate-600 font-light text-lg xl:text-xl desktop:text-base laptop:text-base half:text-base text-center"
					>
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}

		{#if isContrib}
			<div class=" w-full px-16 py-8">
				<div
					class="h-80 laptop:h-50 half:h-40 bg-white border border-primary-200 shadow-2xl w-full rounded-md px-28 py-20 flex flex-col justify-center items-center space-y-2"
				>
					<UserGroupIcon styles="h-10 w-10 text-slate-600" />
					<span
						class="text-slate-500 text-3xl desktop:text-2xl laptop:text-xl half:text-xl text-center"
						>Your Contributions will be placed here</span
					>
					<span
						class="text-slate-500 font-light text-lg apple:text-xl desktop:text-base laptop:text-base half:text-base text-center"
					>
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}
