<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import User from '$lib/icons/user.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend, Repository as Repo } from '../../apis/registry';

	import UserStore from "../../stores/userStore";
	import type {JWT} from "../../apis/auth";
	let user: JWT;
	onMount(() => {
		UserStore.subscribe(data => {
			user = data
		})
	})

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

	let repositoryList: Repo[] = [];

	onMount(() => {
		backend.ListRepositories().then((repoList: Repo[]) => {
			if (!repoList) {
				return;
			}
			console.log('loiiiiii: ', repoList);
			repositoryList = repoList;
		});
		backend.ListTags('johndoe/openregistry');
	});
</script>

<svelte:head>
	<title>User|Open Registry</title>
</svelte:head>

{#if user && user.UserPayload}

	<div class="min-h-[93vh] dark:bg-brown-900 bg-cream-50">
		<div
				class="flex gap-5 space-x-10 min-w-full justify-start items-center py-24 dark:bg-brown-800 mt-20 px-20 bg-brown-500"
		>
			<div class="px-4" />
			<div>
				<User styles="h-24 w-24 text-black color-black" />
			</div>
			<div class="flex-initial w-64">
				<h1 class="text-4xl font-medium dark:text-gray-200">{user.UserPayload.name}</h1>
				<div class="flex mt-3">
					<User />
					<span class="text-lg dark:text-gray-200">Community User</span>
				</div>
			</div>
			<div class="flex flex-col flex-initial w-32">
				<a class="dark:text-gray-100 text-gray-700 text-xl underline-offset-4" href="/settings"
				><u>Edit Profile</u></a
				>
				<span class="mt-3 text-lg dark:text-gray-200"> Joined Today</span>
			</div>
		</div>

		<div
				class="flex gap-5 items-start justify-items-center dark:bg-brown-800 bg-brown-500 space-x-10 pb-2 px-40 mb-10"
		>
			<button
					on:click={toggleRepo}
					class="ease-in duration-300 h-10 pb-9 py-2 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base
					focus:outline-none dark:hover:border-b-gray-50 hover:border-b-black"
			>
				Repositories
			</button>

			<button
					on:click={toggleStarred}
					class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base
					focus:outline-none dark:hover:border-b-gray-50 hover:border-b-black"
			>
				Starred
			</button>

			<button
					on:click={toggleisContrib}
					class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base
					focus:outline-none dark:hover:border-b-gray-50 hover:border-b-black"
			>
				Contributed
			</button>
		</div>

		{#if isRepo}
			<div>
				<div class="w-full px-8">
					{#if repositoryList && repositoryList.length > 0}
						{#each repositoryList as item}
							<Repository data={item} />
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
			<div class="bg-gray-50 w-full rounded-md px-28 py-20 flex justify-center items-center">
				<span class="text-brown-700 text-3xl">Your starred repositories will show here</span>
			</div>
			</div>
		{/if}

		{#if isContrib}
			<div class="w-full px-8">
			<div class="bg-gray-50 w-full rounded-md px-28 py-20 flex justify-center items-center">
				<span class="text-brown-700 text-3xl">Your Contributions will be placed here</span>
			</div>
			</div>
		{/if}
	</div>
{/if}
