<script lang="ts">
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
	import { ClockIcon, ArrowRIcon, FilterIcon } from '$lib/icons';
	import { pulseStore } from '$lib/components/pulse';
	import { NewRepository, Repository, Pulse } from '$lib/components';
	import ErrorModal from '$lib/errorModal.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Dialog from '$lib/dialog.svelte';
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
	<div
		class="flex justify-center items-start w-full h-full min-w-max min-h-[1610px] desktop:min-h-max laptop:min-h-max 
	half:min-h-max py-8 laptop:py-2 bg-white px-0"
	>
		<div
			class="flex justify-center apple:items-center uw:items-center w-full h-full max-w-[3000px]"
		>
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
			{#if showFilter}
				<Dialog>
					<div class="flex flex-col gap-5 items-center p-8 laptop:p-2 half:p-2 half:overflow-auto">
						<div class="flex justify-center items-center gap-4">
							<span class="text-xl apple:text-2xl uw:text-2xl text-primary-500 font-bold"
								>Advance Filters</span
							>
							<FilterIcon styles="desktop:w-5 desktop:h-5 laptop:w-5 laptop:h-5 text-primary-500" />
						</div>

						<div class="flex gap-8 half:gap-3 justify-center items-start px-6 py-3">
							<div
								class="flex flex-col gap-4 text-lg desktop:text-sm laptop:text-sm half:text-sm text-primary-500"
							>
								<span
									class="text-xl desktop:text-base laptop:text-base half:text-base font-medium antialiased"
									>Operating System</span
								>
								<ul class="text-slate-600">
									<li><Checkbox label="Linux" /></li>
									<li><Checkbox label="Windows" /></li>
								</ul>
							</div>
							<div
								class="flex flex-col gap-4 text-lg desktop:text-sm laptop:text-sm half:text-sm text-primary-500"
							>
								<span
									class="text-xl desktop:text-base laptop:text-base half:text-base font-medium antialiased"
									>Categories</span
								>
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
							<div
								class="flex flex-col gap-4 text-lg desktop:text-sm laptop:text-sm half:text-sm text-primary-500"
							>
								<span
									class="text-xl desktop:text-base laptop:text-base half:text-base font-medium antialiased"
									>Architectures</span
								>
								<ul class="text-slate-600">
									<li><Checkbox label="ARM32" /></li>
									<li><Checkbox label="ARM64" /></li>
									<li><Checkbox label="X86" /></li>
									<li><Checkbox label="X86-64" /></li>
								</ul>
							</div>
						</div>
						<div class="flex w-full justify-between px-20">
							<ButtonOutlined onClick={toggleFilter}>Cancel</ButtonOutlined>
							<ButtonSolid
								>Apply
								<ArrowRIcon styles="desktop:w-4 desktop:h-4 laptop:w-4 laptop:h-4 mt-0.5" />
							</ButtonSolid>
						</div>
					</div>
				</Dialog>
			{/if}
			<div class="flex flex-col w-3/4 my-8 items-start">
				<div class="flex flex-row gap-10 justify-between w-full max-w-[850px] pb-2">
					<Menu title="Sort">
						<MenuItem>
							<button
								on:click={() => {
									sortBy = 'last_updated';
									fetchPageData(0);
								}}
								class="{sortBy === 'last_updated' ? 'font-normal bg-white' : ''} 
                				w-full py-3 border-none inline-flex items-center bg-white justify-center rounded-b-none rounded-sm gap-2 m-0 hover:bg-slate-100 text-sm"
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

					<ButtonOutlined styles="gap-2" onClick={toggleFilter}
						>Advance Filter
						<FilterIcon styles="desktop:w-5 desktop:h-5 laptop:w-5 laptop:h-5" />
					</ButtonOutlined>
					{#if showModal}
						<Modal>
							<NewRepository />
						</Modal>
					{/if}
				</div>
				<div class="w-full flex flex-col justify-center items-center max-w-[850px]">
					{#if catalog && catalog.repositories && catalog.repositories.length > 0}
						<div class="w-full">
							{#each catalog.repositories as repo}
								<Repository data={repo} compact={false} />
							{/each}
						</div>

						<div class="flex py-4">
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
	</div>
</Pulse>
<ErrorModal open={openErrorModal} error={httpError} />
