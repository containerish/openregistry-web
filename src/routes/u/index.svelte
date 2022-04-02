<script context="module" lang="ts">
	export function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend, type Catalog, type DetailedRepository } from '../../apis/registry';
	import type { User } from 'src/apis/auth';
	import StarIcon from '$lib/icons/star.svelte';
	import UserGroupIcon from '$lib/icons/userGroup.svelte';
	export let user: User;

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
		const { error, data } = await backend.ListCatalog(
			backend.DefaultPageSize,
			backend.DefaultPageSize * offset,
			user.username
		);

		if (error) {
			console.error('error in repo/index: fetchPageData: ', error);
			return;
		}

		catalog = data;
	};
	let showTooltip = false;
	onMount(async () => {
		fetchPageData();
	});
</script>

<svelte:head>
	<title>User|Open Registry</title>
</svelte:head>

{#if user && user}
	<div class="min-h-[93vh] bg-cream-50">
		<div
			class="flex gap-5 space-x-10 min-w-full justify-start items-center py-24 mt-20 px-20 bg-brown-500"
		>
			<div class="px-4" />
			<div>
				<UserIcon styles="h-24 w-24" />
			</div>
			<div class="flex-initial w-64">
				<h1 class="text-4xl font-medium">{user.name ? user.name : user.username}</h1>
				<div class="flex mt-3">
					<UserIcon styles="h-6 w-6" />
					<span class="text-lg">Community User</span>
				</div>
			</div>
			<div class="flex flex-col flex-initial w-32 lg:w-72">
				<a class="text-brown-900 text-xl underline-offset-4" href="/settings"><u>Edit Profile</u></a
				>
				<span class="mt-3 text-sm">
					Joined
					<span class="font-semibold">
						{new Date(user.created_at).toDateString()}
					</span>
				</span>
			</div>
		</div>

		<div
			class="flex gap-5 items-start justify-items-center bg-brown-500 space-x-10 pb-2 px-40 mb-10"
		>
			<button
				on:click={toggleRepo}
				class="ease-in duration-300 h-10 pb-9 py-2 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl whitespace-nowrap cursor-base 
          hover:border-b-black
          {isRepo ? 'border-b-brown-900' : 'border-b-transparent'}
          "
			>
				Repositories
			</button>

			<button
				on:click={toggleStarred}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-black
          {isStarred ? 'border-b-brown-900' : 'border-b-transparent'}
          "
			>
				Starred
			</button>

			<button
				on:click={toggleisContrib}
				class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl whitespace-nowrap cursor-base
          hover:border-b-black
          {isContrib ? 'border-b-brown-900' : 'border-b-transparent'}
          "
			>
				Contributed
			</button>
		</div>

		{#if isRepo}
			<div>
				<div class="w-full px-16 p-8">
					{#if catalog?.repositories}
						{#each catalog.repositories as repo}
							<Repository compact={false} data={repo} />
						{/each}
					{:else}
						<div class="bg-gray-50 w-full rounded-md px-28 py-20 flex justify-center items-center">
							<span class="text-brown-700 text-3xl">No Repositories</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		{#if isStarred}
			<div class="w-full px-8">
				<div
					class="bg-gray-50 w-full rounded-md px-28 py-20 flex flex-col justify-center items-center"
				>
					<StarIcon styles="h-10 w-10" />
					<span class="text-brown-700 text-3xl">Your starred repositories will show here</span>
					<span class="text-brown-800 font-light text-lg xl:text-xl">
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}

		{#if isContrib}
			<div class="w-full px-8">
				<div
					class="bg-gray-50 w-full rounded-md px-28 py-20 flex flex-col justify-center items-center"
				>
					<UserGroupIcon styles="h-10 w-10" />
					<span class="text-brown-700 text-3xl">Your Contributions will be placed here</span>
					<span class="text-brown-800 font-light text-lg xl:text-xl">
						We're working on bringing this feature as we build more analytics
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}
