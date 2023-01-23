<script lang="ts">
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import { onMount, setContext } from 'svelte';
	import { RegistryBackend } from '$apis/registry';
	import Checkbox from '$lib/checkbox.svelte';
	import type { Catalog } from '$apis/registry';
	import { createPopperActions } from 'svelte-popperjs';
	import { navigating } from '$app/stores';
	import Menu from '$lib/headless/menu.svelte';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import ClockIcon from '$lib/icons/clock.svelte';
	import { pulseStore } from '$lib/components/pulse';
	import { NewRepository, Repository, Pulse } from '$lib/components';

	import ErrorModal from '$lib/errorModal.svelte';
	import Filter from '$lib/icons/filter.svelte';
	export let query: string = '';
	let sortBy = 'namespace';
	let httpError: string;
	let openErrorModal: boolean = false;

	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});

	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	const backend = new RegistryBackend();

	const fetchPageData = async (offset: number) => {
		const { error, data } = await backend.ListCatalog(
			backend.DefaultPageSize,
			backend.DefaultPageSize * offset,
			undefined,
			sortBy
		);
		if (error) {
			console.error('eroror in fetchPageData: ', error);
			return;
		}

		catalog = data;
		return offset;
	};

	setContext('fetchPageData', fetchPageData);
	let catalog: Catalog;

	onMount(async () => {
		if (query && query !== '') {
			const { error, data } = await backend.SearchRepositories(query);
			if (error) {
				console.error('error in search/ListCatalog: ', error);
				httpError = error.message;
				openErrorModal = true;
				return;
			}

			catalog = data;
			return;
		}

		let { data, error } = await backend.ListCatalog(backend.DefaultPageSize);
		if (error) {
			console.error('error in search/ListCatalog: ', error);
			httpError = error.message;
			openErrorModal = true;
			return;
		}
		catalog = data;
	});

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
	<div class="flex justify-center items-start w-full h-full min-w-max min-h-[1700px] desktop:min-h-max py-8 bg-white px-0">
		<div class="flex w-full h-full max-w-[3000px]">
			{#if showTooltip}
				<div id="tooltip" class="z-50 bg-cyan-200 rounded py-3 px-4" use:popperContent={extraOpts}>
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
			<div
				use:popperRef
				on:mouseenter={() => (showTooltip = true)}
				on:mouseleave={() => (showTooltip = false)}
				class="flex flex-col gap-20 desktop:gap-6 hover:opacity-40 opacity-60 h-full w-1/5 mx-10 my-4 border-r-2 border-slate-200"
			>
				<div class="flex flex-col gap-4 desktop:gap-2">
					<div class="flex gap-3 items-center text-primary-500">
						<Filter styles="desktop:w-5 desktop:h-5"/>
						<span class="text-xl desktop:text-lg font-medium">Filters</span>
					</div>
					<hr />
				</div>

				<div class="flex flex-col gap-4 text-lg desktop:text-sm text-slate-800">
					<span class="text-xl desktop:text-[16px] font-medium">Operating System</span>
					<ul>
						<li><Checkbox label="Linux" /></li>
						<li><Checkbox label="Windows" /></li>
					</ul>
					<hr />
				</div>

				<div class="flex flex-col gap-4 text-lg desktop:text-sm text-slate-800">
					<span class="text-xl desktop:text-[16px] font-medium">Categories</span>
					<ul>
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
					<hr />
				</div>
				<div class="flex flex-col gap-4 text-lg desktop:text-sm text-slate-700">
					<span class="text-xl desktop:text-[16px] font-medium">Architectures</span>
					<ul>
						<li><Checkbox label="ARM32" /></li>
						<li><Checkbox label="ARM64" /></li>
						<li><Checkbox label="X86" /></li>
						<li><Checkbox label="X86-64" /></li>
					</ul>
					<hr />
				</div>
			</div>
			<div class="flex flex-col w-3/4 my-8">
				<div class="flex px-4 pb-2 justify-between uw:px-36 apple:px-24">
					<Menu title="Sort">
						<MenuItem>
							<button
								on:click={() => {
									sortBy = 'last_updated';
									fetchPageData(0);
								}}
								class="{sortBy === 'last_updated' ? 'font-normal bg-white' : ''} 
                				w-full py-3 border-none inline-flex items-center bg-white justify-center rounded-b-none rounded-md gap-2 m-0 hover:bg-slate-100 text-sm"
							>
								<ClockIcon styles="h-5 w-5" />
								Last Updated
							</button>
						</MenuItem>
						<MenuItem class="bg-gray-100">
							<button
								on:click={() => {
									sortBy = 'namespace';
									fetchPageData(0);
								}}
								class="{sortBy === 'namespace' ? 'font-normal bg-white' : ''} 
         						inline-flex py-3 justify-center gap-2 items-center w-full  m-0 border-none rounded-t-none rounded-md hover:bg-slate-100 text-sm"
							>
								<div
									class="rounded-full border-2 border-slate-600 text-slate-600 text-sm h-4 inline-flex justify-center items-center w-4"
								>
									A
								</div>
								Image Name
							</button>
						</MenuItem>
					</Menu>
					{#if showModal}
						<Modal>
							<NewRepository />
						</Modal>
					{/if}
				</div>

				{#if catalog && catalog.repositories && catalog.repositories.length > 0}
					<div class="w-11/12">
						{#each catalog.repositories as repo}
							<Repository data={repo} compact={false} />
						{/each}
					</div>

					<div class="flex justify-center py-4">
						<Pagination pages={Math.ceil(catalog.total / backend.DefaultPageSize)} />
					</div>
				{:else}
					<div class="flex justify-center items-center">
						<div
							class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5 flex justify-center items-center"
						>
							<span class="text-primary-600 text-4xl">No Repositories</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Pulse>
<ErrorModal open={openErrorModal} error={httpError} />
