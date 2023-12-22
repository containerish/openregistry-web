<script lang="ts">
	import type { PageData } from './$types';
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { throttle } from 'throttle-debounce';
	import { setContext } from 'svelte';
	import { NewRepository, Repository, Loader } from '$lib/components';
	import { navigating } from '$app/stores';
	import { pulseStore } from '$lib/components/pulse';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { DefaultPageSize } from '$lib/constants';
	import { OpenRegistryClient } from '$lib/client/openregistry';

	export let data: PageData;
	$: catalog = data.repositories;
	const openRegistryClient = new OpenRegistryClient(fetch, $page.url.origin);
	const pageSize = 10;
	let showCreateRepositoryModal = false;

	const toggleModal = () => {
		showCreateRepositoryModal = !showCreateRepositoryModal;
	};

	setContext('toggleModal', toggleModal);
	const handleOnChange = async (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		autoCompleteThrottled(value);
	};

	const autoComplete = async (q: string) => {
		let query = data.user ? data.user.username : q;
		const response = await openRegistryClient.searchRepositories(query);
		if (response.success) {
			catalog = response.data.repositories;
			return;
		}

		catalog = [];
	};

	const autoCompleteThrottled = throttle(1000, autoComplete);

	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}

	const handleCreateRepositorySuccess = async () => {
		const response = await openRegistryClient.getUserRepositoryCatalog();
		if (!response.error) {
			catalog = response.repositories;
		}
	};
</script>

<svelte:head>
	<title>Repositories | OpenRegistry</title>
</svelte:head>

<Loader>
	<div class="flex justify-start items-start w-full h-full min-w-max min-h-max py-8">
		<div class="w-full flex flex-col my-8 max-w-[850px] px-9 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-4 px-2 justify-between">
				<div class="w-4/5 lg:w-3/5">
					<Textfield on:input={handleOnChange} placeholder="Search Repositories" />
				</div>

				<div class="w-full max-w-[202px]">
					<NewRepository
						handleSuccess={handleCreateRepositorySuccess}
						handleClose={() => (showCreateRepositoryModal = false)}
					/>
				</div>
			</div>
			<div in:fly={{ y: 200, duration: 300 }}>
				{#if catalog && catalog.length > 0}
					<div class="w-full">
						{#each catalog as repo}
							<Repository repository={repo} compact={false} />
						{/each}
					</div>
					<div class="flex justify-center">
						{#if data.total > DefaultPageSize}
							<Pagination pages={Math.ceil(data.total / pageSize)} />
						{/if}
					</div>
				{:else}
					<div class="w-full flex justify-center items-center">
						<div
							class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
							flex justify-center items-center"
						>
							<span class="text-slate-500 text-2xl"> No Repositories Yet </span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Loader>
