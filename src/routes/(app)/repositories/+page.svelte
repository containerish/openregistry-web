<script lang="ts">
	import Advert from '$lib/advert.svelte';
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
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
	import Sidebar from '$lib/components/sidebar.svelte';
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
			openErrorModal = true;
			httpError = resp.error.message;
			return;
		}

		catalog = resp.data;
	});

	let showModal = false;
	const toggleModal = () => {
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
	let openErrorModal: boolean = false;
	let httpError: string;
</script>

<svelte:head>
	<title>Repositories | OpenRegistry</title>
</svelte:head>

<Pulse>
	
	<div class="flex justify-center items-start desktop:items-start w-full min-h-[1500px] desktop:min-h-max m-w-[70vw] h-max bg-white">
		<div class="flex w-full min-h-full max-w-[3000px] items-center">
			<div class="w-3/4 px-8 my-8">
				<div class="flex px-4 justify-between lg:px-8">
					<div class="w-2/5">
						<Textfield onInput={handleOnChange} placeholder="Search Repositories" />
					</div>
					{#if showTooltip}
						<div
							id="tooltip"
							class=" bg-cyan-200 rounded py-3 px-4 desktop:min-w-max desktop:py-1 desktop:px-2"
							use:popperContent={extraOpts}
						>
							<span class=" text-slate-700 desktop:text-xs">
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
					<div
						use:popperRef
						on:mouseenter={() => (showTooltip = true)}
						on:mouseleave={() => (showTooltip = false)}
					>
						<ButtonOutlined disabled>Create Respository</ButtonOutlined>
					</div>

					{#if showModal}
						<Modal>
							<NewRepository />
						</Modal>
					{/if}
				</div>

				{#if catalog && catalog.repositories && catalog.repositories.length > 0}
					<div class="w-full px-4">
						{#each catalog.repositories as repo}
							<Repository data={repo} compact={false} />
						{/each}
					</div>

					<div class="flex justify-center py-4 bg-white">
						{#if catalog.total > backend.DefaultPageSize}
							<Pagination pages={Math.ceil(catalog.total / pageSize)} />
						{/if}
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

			<div
				class="invisible lg:visible py-2 rounded-lg px-4 my-20 flex justify-start flex-col items-center w-1/4"
			/>
			<!-- <div class="rounded-md px-4 py-2 bg-slate-100">
				<Advert
					link="https://akash.network"
					styles="hover:bg-red-600"
					logo="akash-logo.svg"
					body="Infrastructure that powers web3 for cloud compute akash network is a distributed
					peer-to-peer marketplace for cloud compute"
				/>
				<Advert
					link="https://ipfs.io"
					styles="hover:bg-[#65c3ca]"
					logo="ipfs-logo.png"
					body="A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web
            		upgradeable, resilient, and more open."
				/>
				<Advert
					link="https://skynetlabs.com/developers"
					styles="hover:bg-[#00C65E]"
					logo="skynet-logo.png"
					body="Skynet is an open protocol and toolkit for creating a better web — one built on decentralized storage
          			and applications."
				/>
			</div> -->
		</div>
	</div>
</Pulse>
<ErrorModal open={openErrorModal} error={httpError} />
