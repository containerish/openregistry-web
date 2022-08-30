<script lang="ts">
	import Advert from '$lib/advert.svelte';
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { throttle } from 'throttle-debounce';
	import { onMount, setContext } from 'svelte';
	import NewRepository from '../../components/newRepository.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend } from '../../apis/registry';
	import type { Catalog } from '../../apis/registry';
	import type { User } from '../../apis/auth';
	import { navigating } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data: PageData;
	
	const backend = new RegistryBackend();
	const pageSize = 10;
	export let catalog: Catalog;
	import { createPopperActions } from 'svelte-popperjs';
	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});
	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	import { goto } from '$app/navigation';
	import Pulse from '../../components/pulse.svelte';
	import { pulseStore } from '../../components/pulse';
	import ErrorModal from '$lib/errorModal.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	// @ts-ignore

	const fetchPageData = async (offset?: number) => {
		const resp = await backend.ListCatalog(
			backend.DefaultPageSize,
			backend.DefaultPageSize * offset,
			data.user.username
		);

		if (resp.error) {
			console.error('error in repo/index: fetchPageData: ', error);
			return;
		}

		catalog = resp.data;
	};
	let showTooltip = false;

	setContext('fetchPageData', fetchPageData);

	onMount(async () => {
		// @ts-ignore
		if (!data.authenticated) {
			goto('/auth/unauthorized');
			return;
		}

		// @ts-ignore
		const u: User = data.user;
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

<Pulse>
	<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50">
		<div class="flex w-full h-full max-w-[3000px]">
			<div class="w-3/4 px-8 my-8">
				<div class="flex px-4 justify-between lg:px-8">
					<div class="w-2/5">
						<Textfield onInput={handleOnChange} placeholder="Search Repositories" />
					</div>
					{#if showTooltip}
						<div
							id="tooltip"
							class="z-50 bg-white rounded-lg py-3 px-4"
							use:popperContent={extraOpts}
						>
							<span class=" text-gray-800">
								Coming soon
								<svg
									class="absolute text-white h-6 left-0 ml-3 top-full"
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
					<button
						use:popperRef
						on:mouseenter={() => (showTooltip = true)}
						on:mouseleave={() => (showTooltip = false)}
						class="cursor-not-allowed px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 bg-white rounded-md sm:inline
					"
					>
						Create Repository
					</button>
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

					<div class="flex justify-center py-4 bg-cream-50">
						{#if catalog.total > backend.DefaultPageSize}
							<Pagination pages={Math.ceil(catalog.total / pageSize)} />
						{/if}
					</div>
				{:else}
					<div class="flex justify-center items-center">
						<div
							class="bg-gray-50 w-full rounded-md px-20 py-20 my-5 flex justify-center items-center"
						>
							<span class="text-brown-800 text-4xl">No Repositories</span>
						</div>
					</div>
				{/if}
			</div>

			<div
				class="invisible lg:visible py-2 rounded-lg px-4 my-20 flex justify-start flex-col items-center w-1/4"
			>
				<div class="border rounded-lg px-4 py-2 border-brown-500">
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
				</div>
			</div>
		</div>
	</Card>
</Pulse>
<ErrorModal open={openErrorModal} error={httpError} />
