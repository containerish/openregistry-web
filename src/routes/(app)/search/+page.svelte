<script lang="ts">
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import { onMount, setContext } from 'svelte';

	import Checkbox from '$lib/checkbox.svelte';
	import type { Catalog } from '$apis/registry';
	import { createPopperActions } from 'svelte-popperjs';
	import { navigating, page } from '$app/stores';
	import Menu from '$lib/headless/menu.svelte';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { ClockIcon, ArrowRIcon, FilterIcon } from '$lib/icons';
	import { pulseStore } from '$lib/components/pulse';
	import { NewRepository, Repository, Pulse } from '$lib/components';
	import ErrorModal from '$lib/errorModal.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Dialog from '$lib/dialog.svelte';
	import type { PageData } from './$types';
	import SortIcon from '$lib/icons/sortIcon.svelte';
	import { DefaultPageSize } from '$lib/constants';

	export let data: PageData;

	let sortBy = 'namespace';
	let openErrorModal: boolean = false;

	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});

	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	const fetchPageData = async (offset: number) => {
		const url = new URL('/apis/registry/list/catalog', $page.url.origin);
		url.searchParams.set('page_size', DefaultPageSize.toString());
		url.searchParams.set('offset', (DefaultPageSize * offset).toString());
		url.searchParams.set('sort_by', sortBy);
		const response = await fetch(url);

		if (response.status !== 200) {
			return;
		}

		catalog = await response.json();
		return offset;
	};

	setContext('fetchPageData', fetchPageData);
	let catalog: Catalog;

	onMount(async () => {
		if (data.query && data.query !== '') {
			const url = new URL('/api/registry/list/repositories', $page.url.origin);
			url.searchParams.set('query', data.query);
			const response = await fetch(url);
			if (response.status !== 200) {
				openErrorModal = true;
				catalog.repositories = [];
				return;
			}

			catalog = await response.json();
		}

		const url = new URL('/apis/registry/list/catalog', $page.url.origin);
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
</script>

<svelte:head>
	<title>Explore | OpenRegistry</title>
</svelte:head>

<Pulse>
	<div class="flex justify-center items-start w-full h-full min-w-max min-h-max py-8">
		<div
			class="{data.authenticated
				? 'justify-start'
				: 'justify-center'} flex items-center w-full h-full max-w-[3000px]"
		>
			{#if showTooltip}
				<div id="tooltip" class=" bg-cyan-200 rounded py-3 px-4" use:popperContent={extraOpts}>
					<span class=" text-slate-800">
						Coming soon
						<svg
							class="absolute text-cyan-100 h-5 w-5 left-0 pb-1 ml-3 top-full"
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
			{/if}
			{#if showFilter}
				<Dialog>
					<div class="flex flex-col gap-5 items-center p-8 overflow-auto">
						<div class="flex justify-center items-center gap-4">
							<span class="text-xl lg:2xl text-primary-500 font-bold">Advance Filters</span>
							<FilterIcon class="text-primary-500" />
						</div>

						<div class="flex gap-3 lg:gap-8 justify-center items-start px-6 py-3">
							<div class="flex flex-col gap-4 text-base xl:text-lg text-primary-500 text-start">
								<span class="text-base lg:text-xl font-medium antialiased">Operating System</span>
								<ul class="text-slate-600">
									<li><Checkbox label="Linux" /></li>
									<li><Checkbox label="Windows" /></li>
								</ul>
							</div>
							<div class="flex flex-col gap-4 text-base xl:text-lg text-primary-500 text-start">
								<span class="text-base lg:text-xl font-medium antialiased">Categories</span>
								<ul class="text-slate-600">
									<li>
										<Checkbox label="Analytics" />
									</li>
									<li><Checkbox label="Base Images" /></li>
									<li><Checkbox label="Databases" /></li>
									<li><Checkbox label="Devops tools" /></li>
									<li><Checkbox label="Featured Images" /></li>
									<li><Checkbox label="Operating Systems" /></li>
									<li><Checkbox label="Programming Languages" /></li>
									<li><Checkbox label="Messaging Services" /></li>
									<li><Checkbox label="Application Frameworks" /></li>
								</ul>
							</div>
							<div class="flex flex-col gap-4 text-base xl:text-lg text-primary-500 text-start">
								<span class="text-base lg:text-xl font-medium antialiased">Architectures</span>
								<ul class="text-slate-600">
									<li><Checkbox label="ARM32" /></li>
									<li><Checkbox label="ARM64" /></li>
									<li><Checkbox label="X86" /></li>
									<li><Checkbox label="X86-64" /></li>
								</ul>
							</div>
						</div>
						<div class="flex w-full justify-between px-10 lg:px-20">
							<ButtonOutlined on:click={toggleFilter}>Cancel</ButtonOutlined>
							<ButtonSolid
								>Apply
								<ArrowRIcon class="mt-0.5" />
							</ButtonSolid>
						</div>
					</div>
				</Dialog>
			{/if}
			<div class="flex flex-col w-full my-8 items-start max-w-[850px] px-9 lg:px-16">
				<div class="flex flex-row gap-10 justify-between items-center w-full pb-2 m-2">
					<Menu title="Sort">
						<MenuItem>
							<button
								aria-label="sort by last updated"
								on:click={() => {
									sortBy = 'last_updated';
									fetchPageData(0);
								}}
								class="{sortBy === 'last_updated' ? 'font-normal bg-white' : ''} 
                				w-full py-3 border-none inline-flex items-center bg-white justify-center rounded-b-none
								rounded gap-2 m-0 hover:bg-primary-100 text-sm"
							>
								<ClockIcon class="h-5 w-5" />
								Last Updated
							</button>
						</MenuItem>
						<MenuItem class="bg-gray-100">
							<button
								aria-label="sort by image name"
								on:click={() => {
									sortBy = 'namespace';
									fetchPageData(0);
								}}
								class="{sortBy === 'namespace' ? 'font-normal bg-white' : ''} 
         						inline-flex py-3 justify-center gap-2 items-center w-full m-0 border-none rounded-t-none
								rounded-md hover:bg-primary-100 text-sm"
							>
								<div
									class="rounded-full border-2 border-slate-600 text-slate-600 text-sm h-4
									inline-flex justify-center items-center w-4"
								>
									A
								</div>
								Image Name
							</button>
						</MenuItem>
					</Menu>

					<ButtonOutlined class="gap-2" on:click={toggleFilter}
						>Advance Filter
						<FilterIcon />
					</ButtonOutlined>
				</div>
				<div class="w-full flex flex-col justify-center items-center">
					{#if catalog && catalog.repositories && catalog.repositories.length > 0}
						<div class="w-full">
							{#each catalog.repositories as repo}
								<Repository data={repo} compact={false} />
							{/each}
						</div>

						<div class="flex py-4">
							<Pagination pages={Math.ceil(catalog.total / DefaultPageSize)} />
						</div>
					{:else}
						<div class="flex w-full justify-center items-center">
							<div
								class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
								flex justify-center items-center"
							>
								<span class="text-primary-600 text-4xl">No Repositories</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</Pulse>
