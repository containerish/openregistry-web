<script lang="ts">
	import Pagination from '$lib/pagination.svelte';
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createPopperActions } from 'svelte-popperjs';
	import { navigating, page } from '$app/stores';
	import { ClockIcon, PencilIcon, SortIcon } from '$lib/icons';
	import { pulseStore } from '$lib/components/pulse';
	import { Repository, Loader } from '$lib/components';
	import type { PageData } from './$types';
	import { DefaultPageSize } from '$lib/constants';
	import { RepositoryCatalog } from '$lib/types/registry';
	import AdvanceFilters from '$lib/components/advanceFilters.svelte';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import Textfield from '$lib/textfield.svelte';
	import { throttle } from 'throttle-debounce';

	export let data: PageData;
	$: catalog = data.catalog as RepositoryCatalog;

	const openRegistryClient = new OpenRegistryClient(fetch, $page.url.origin);
	let sortBy = 'namespace';

	createPopperActions({
		placement: 'top-start',
		strategy: 'fixed',
	});

	const fetchPageData = async (offset: number) => {
		if (offset > 0) {
			offset = offset * DefaultPageSize;
		}
		const response = await openRegistryClient.getDetailedCatalog(DefaultPageSize, offset, sortBy);
		if (response.success) {
			catalog = response.data;
		}

		return offset;
	};

	let showFilter = false;
	const toggleFilter = () => {
		showFilter = !showFilter;
	};

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);
	setContext('fetchPageData', fetchPageData);
	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createPopover({
		forceVisible: true,
	});

	const handleOnChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		autoCompleteThrottled(target.value);
	};

	const autoComplete = async (q: string) => {
		if (!q) {
			console.log('query: ', q);
			const response = await openRegistryClient.getUserRepositoryCatalog();
			console.log('response: ', response);
			catalog = {
				total: response.total,
				repositories: response.repositories,
			};
			return;
		}
		const response = await openRegistryClient.searchRepositories(q);
		if (response.success) {
			catalog = {
				total: response.data.total,
				repositories: response.data.repositories,
			};
			return;
		}

		catalog = {
			total: 0,
			repositories: [],
		};
	};

	const autoCompleteThrottled = throttle(350, autoComplete);
</script>

<svelte:head>
	<title>Explore | OpenRegistry</title>
</svelte:head>

<!-- transition:fly={{ y: 200, duration: 2000 }} -->
<Loader>
	<div class="flex justify-center items-start w-full h-full min-w-max">
		<div
			class="{data.authenticated
				? 'justify-start'
				: 'justify-center'} flex items-start w-full h-full max-w-[3000px] my-8"
		>
			<div class="flex flex-col w-full my-8 items-start max-w-[950px] px-9 lg:px-16">
				<div class="flex flex-row gap-10 justify-between items-center w-full pb-2 m-2">
					<button
						type="button"
						class="trigger flex gap-2 items-center text-primary-500 bg-primary-100/50 py-3 px-4 rounded"
						use:melt={$trigger}
						aria-label="Update dimensions"
					>
						<SortIcon class="square-4" />
						<span class="">Sort</span>
					</button>

					<div class="w-full">
						<Textfield on:input={handleOnChange} placeholder="Search Repositories" />
					</div>
					{#if $open}
						<div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
							<div use:melt={$arrow} />
							<div class="flex flex-col gap-2.5 bg-white rounded shadow-2xl">
								<fieldset>
									<button
										aria-label="sort by image name"
										on:click={() => {
											sortBy = 'namespace';
											fetchPageData(0);
										}}
										class="{sortBy === 'namespace' ? 'font-normal bg-white' : ''} 
                      inline-flex py-3 px-2 justify-center gap-2 items-center w-full m-0 hover:bg-primary-100 text-sm
                       text-slate-600 rounded-t"
									>
										<PencilIcon class="square-4" />
										Image Name
									</button>
								</fieldset>
								<fieldset>
									<button
										aria-label="sort by last updated"
										on:click={() => {
											sortBy = 'last_updated';
											fetchPageData(0);
										}}
										class="{sortBy === 'last_updated' ? 'font-normal bg-white' : ''} 
                				w-full py-3 px-2 inline-flex items-center justify-center gap-2 m-0
                        hover:bg-primary-100 text-sm rounded-b text-slate-600"
									>
										<ClockIcon class=" square-4" />
										Last Updated
									</button>
								</fieldset>
							</div>
						</div>
					{/if}
					<!-- advance filters -->
					<!-- <ButtonOutlined class="gap-2" on:click={toggleFilter}> -->
					<!-- 	Filters -->
					<!-- 	<FilterIcon /> -->
					<!-- </ButtonOutlined> -->
				</div>
				<div class="w-full flex flex-col justify-center items-center" in:fly={{ y: 200, duration: 300 }}>
					{#if catalog && catalog.repositories && catalog.repositories.length > 0}
						<div class="w-full">
							{#each catalog.repositories as repo}
								<Repository repository={repo} />
							{/each}
						</div>

						{#if catalog.repositories.length > DefaultPageSize}
							<div class="flex py-4">
								<Pagination pages={Math.ceil(catalog.total / DefaultPageSize)} />
							</div>
						{/if}
					{:else}
						<div class="flex w-full justify-center items-center">
							<div
								class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
					flex justify-center items-center"
							>
								<span class="text-slate-500 text-2xl">No Repositories</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
		{#if showFilter}
			<div
				class="w-1/3 h-full bg-primary-100/20 border-2 border-primary-100/50 py-9 shadow-inner"
				in:fly={{ duration: 300, x: -20 }}
				out:fly={{ duration: 300, x: 20 }}
			>
				<AdvanceFilters />
			</div>
		{/if}
	</div>
</Loader>
