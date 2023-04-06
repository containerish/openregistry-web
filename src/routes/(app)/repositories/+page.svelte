<script lang="ts">
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { throttle } from 'throttle-debounce';
	import { onMount, setContext } from 'svelte';
	import { NewRepository, Repository, Pulse } from '$lib/components';
	import type { PageData } from './$types';
	import { RegistryBackend } from '$apis/registry';
	import type { Catalog } from '$apis/registry';
	import type { User } from '$apis/auth';
	import { navigating } from '$app/stores';
	import { pulseStore } from '$lib/components/pulse';
	import ErrorModal from '$lib/errorModal.svelte';

	/** @type {import('./$types').PageData} */
	export let data: PageData;
	const u: User = data.user;

	const backend = new RegistryBackend();
	const pageSize = 10;
	export let catalog: Catalog;
	import { createPopperActions } from 'svelte-popperjs';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Dialog from '$lib/dialog.svelte';
	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});
	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	// @ts-ignore

	const fetchPageData = async (offset?: number) => {
		const resp = await backend.ListCatalog(
			backend.DefaultPageSize,
			backend.DefaultPageSize * offset,
			data.user.username
		);

		if (resp.error) {
			console.error('error in repo/index: fetchPageData: ', data.error);
			return;
		}

		catalog = resp.data;
	};
	let showTooltip = false;

	setContext('fetchPageData', fetchPageData);

	onMount(async () => {
		// @ts-ignore
		const resp = await backend.ListCatalog(backend.DefaultPageSize, 0, u.username);
		if (resp.error) {
			return;
		}

		catalog = resp.data;
	});

	let showModal = false;
	const toggleModal = () => {
		console.log('came here');
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);

	const handleOnChange = async (e: any) => {
		autoCompleteThrottled(e.target.value);
	};

	const autoComplete = async (q: string) => {
		let query = u.username;

		if (q !== '') {
			query += '/' + q;
		}

		const { error, data } = await backend.SearchRepositories(query);
		if (error || !data) {
			catalog.repositories = [];
			return;
		}

		catalog = data;
	};

	const autoCompleteThrottled = throttle(1000, autoComplete);

	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}
</script>

<svelte:head>
	<title>Repositories | OpenRegistry</title>
</svelte:head>

<Pulse>
	<div class="flex justify-start items-start w-full h-full min-w-max min-h-max py-8">
		<div class="w-full flex flex-col my-8 max-w-[850px] px-9 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-4 px-2 justify-between ">
				<div class="w-4/5 lg:w-3/5">
					<Textfield onInput={handleOnChange} placeholder="Search Repositories" />
				</div>
				{#if showTooltip}
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
				{/if}

				<ButtonOutlined class="max-w-[202px]" on:click={toggleModal}
					>Create Respository</ButtonOutlined
				>

				<Dialog isOpen={showModal}>
					<NewRepository />
				</Dialog>
			</div>

			{#if catalog && catalog.repositories && catalog.repositories.length > 0}
				<div class="w-full">
					{#each catalog.repositories as repo}
						<Repository data={repo} compact={false} />
					{/each}
				</div>

				<div class="flex justify-center">
					{#if catalog.total > backend.DefaultPageSize}
						<Pagination pages={Math.ceil(catalog.total / pageSize)} />
					{/if}
				</div>
			{:else}
				<div class="w-full flex justify-center items-center">
					<div
						class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5 
							flex justify-center items-center"
					>
						<span class="text-slate-500 text-2xl md:text-3xl lg:text-4xl">
							No Repositories Yet
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Pulse>
