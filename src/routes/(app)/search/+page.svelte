<script lang="ts">
	import Pagination from '$lib/pagination.svelte';
	import { onMount, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createPopperActions } from 'svelte-popperjs';
	import { navigating, page } from '$app/stores';
	import { ClockIcon, FilterIcon, PencilIcon, SortIcon } from '$lib/icons';
	import { pulseStore } from '$lib/components/pulse';
	import { Repository, Loader } from '$lib/components';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import type { PageData } from './$types';
	import { DefaultPageSize } from '$lib/constants';
	import { RepositoryCatalog } from '$lib/types/registry';
	import AdvanceFilters from '$lib/components/advanceFilters.svelte';
	import { createPopover, melt } from '@melt-ui/svelte';

	export let data: PageData;

	let sortBy = 'namespace';
	let openErrorModal = false;

	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed',
	});

	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
	};

	const fetchPageData = async (offset: number) => {
		const url = new URL('/api/registry/list/catalog', $page.url.origin);
		url.searchParams.set('page_size', DefaultPageSize.toString());
		url.searchParams.set('offset', (DefaultPageSize * offset).toString());
		url.searchParams.set('sort_by', sortBy);
		const response = await fetch(url);

		if (response.status !== 200) {
			return;
		}

		const repoCatalog = await response.json();
		const parsed = RepositoryCatalog.safeParse(repoCatalog);
		if (parsed.success) {
			catalog = parsed.data;
		}
		return offset;
	};

	setContext('fetchPageData', fetchPageData);
	let catalog: RepositoryCatalog;

	onMount(async () => {
		const query = $page.url.searchParams.get('q');
		if (query) {
			const url = new URL('/api/registry/list/repositories', $page.url.origin);
			url.searchParams.set('query', query);
			const response = await fetch(url);
			if (response.status !== 200) {
				openErrorModal = true;
				catalog.repositories = [];
				return;
			}
			catalog = await response.json();
			return;
		}

		const url = new URL('/api/registry/list/catalog', $page.url.origin);
		url.searchParams.set('page_size', DefaultPageSize.toString());

		const response = await fetch(url);

		if (response.status !== 200) {
			openErrorModal = true;
			return;
		}

		catalog = await response.json();
	});

	let showFilter = false;
	const toggleFilter = () => {
		showFilter = !showFilter;
	};

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	let showTooltip = false;

	setContext('toggleModal', toggleModal);
	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({
		forceVisible: true,
	});
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
			<div class="flex flex-col w-full my-8 items-start max-w-[850px] px-9 lg:px-16">
				<div class="flex flex-row gap-10 justify-between items-center w-full pb-2 m-2">
					<button
						type="button"
						class="trigger flex gap-2 items-center text-primary-500 bg-primary-100/50 py-1 px-3 rounded"
						use:melt={$trigger}
						aria-label="Update dimensions"
					>
						<SortIcon class="square-4" />
						<span class="">Sort</span>
					</button>

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
					<ButtonOutlined class="gap-2" on:click={toggleFilter}>
						Advance Filter
						<FilterIcon />
					</ButtonOutlined>
				</div>
				<div class="w-full flex flex-col justify-center items-center" in:fly={{ y: 200, duration: 300 }}>
					{#if catalog && catalog.repositories && catalog.repositories.length > 0}
						<div class="w-full">
							{#each catalog.repositories as repo}
								<Repository username={data.user.username} repository={repo} compact={false} />
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
