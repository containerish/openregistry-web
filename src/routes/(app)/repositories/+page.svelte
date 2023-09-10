<script lang="ts">
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { throttle } from 'throttle-debounce';
	import { onMount, setContext } from 'svelte';
	import { NewRepository, Repository, Loader } from '$lib/components';
	import type { PageData } from './$types';
	import { navigating } from '$app/stores';
	import { pulseStore } from '$lib/components/pulse';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Dialog from '$lib/dialog.svelte';
	import { DefaultPageSize } from '$lib/constants';
	import type { RepositoryCatalog } from '$lib/types/registry';
	import { OpenRegistryClient } from '$lib/client/openregistry';

	export let data: PageData;
	let catalog: RepositoryCatalog;
    const client = new OpenRegistryClient(fetch)

	const pageSize = 10;
	const fetchPageData = async (offset?: number) => {
        const response = await client.getUserRepositoryCatalog()
        if (response.error) {
            console.log('error in get user catalog: ', response)
                return
        }

        catalog = response
	};

	setContext('fetchPageData', fetchPageData);
	onMount(async () => {
		await fetchPageData();
	});

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);

	const handleOnChange = async (e: Event) => {
        const value = (e.target as HTMLInputElement).value
		autoCompleteThrottled(value);
	};

	const autoComplete = async (q: string) => {
		let query = data.user.username;

		if (q !== '') {
			query += '/' + q;
		}

		const url = new URL('/apis/registry/list/repositories', $page.url.origin);
		url.searchParams.set('query', query);

		const response = await fetch(url);
		if (response.status !== 200) {
			catalog.repositories = [];
			return;
		}

		catalog = await response.json();
	};

	const autoCompleteThrottled = throttle(1000, autoComplete);

	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}
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
				<!-- {#if showTooltip}
					<div id="tooltip" class=" bg-cyan-200 rounded py-1 px-3" use:popperContent={extraOpts}>
						<span class=" text-slate-700">
							Coming soon
							<svg
								class="absolute text-cyan-200 h-5 w-5 left-0 pb-1 ml-3 top-full"
								x="0px"
								y="0px"
								viewBox="0 0 255 255"
								xml:space="preserve"
							>
								<polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
							</svg>
						</span>
						<div id="arrow" data-popper-arrow />
					</div>
				{/if} -->

				<ButtonOutlined class="max-w-[202px]" on:click={toggleModal}>
					Create Respository
				</ButtonOutlined>
			</div>
			<div in:fly={{ y: 200, duration: 300 }}>
				{#if catalog && catalog.repositories && catalog.repositories.length > 0}
					<div class="w-full">
						{#each catalog.repositories as repo}
							<Repository username={data.user.username} repository={repo} compact={false} />
						{/each}
					</div>

					<div class="flex justify-center">
						{#if catalog.total > DefaultPageSize}
							<Pagination pages={Math.ceil(catalog.total / pageSize)} />
						{/if}
					</div>
				{:else}
					<div class="w-full flex justify-center items-center">
						<div
							class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
							flex justify-center items-center"
						>
							<span class="text-slate-500 text-2xl">No Repositories Yet</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<Dialog isOpen={showModal}>
			<NewRepository />
		</Dialog>
	</div>
</Loader>
