<script context="module" lang="ts">
	export async function load({ session }) {
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}

		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	import Advert from '$lib/advert.svelte';
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { onMount, setContext } from 'svelte';
	import NewRepository from '../../components/newRepository.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend } from '../../apis/registry';
	import type { Catalog } from '../../apis/registry';
	import type { AxiosResponse } from 'axios';

	const backend = new RegistryBackend();
	const pageSize = 10;
	const fetchPageData = (offset: number) => {
		backend.ListCatalog(pageSize, pageSize * offset).then((data: Catalog) => {
			catalog = data;
		});
	};

	setContext('getPageData', fetchPageData);
	let catalog: Catalog;

	onMount(() => {
		backend.ListTags('johndoe/openregistry');
		backend.ListCatalog(pageSize).then((data: Catalog) => {
			catalog = data;
		});
	});

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);
</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50">
	<div class="flex w-full h-full max-w-[3000px]">
		<div class="w-3/4 mx-8 my-8">
			<div class="flex px-10 pb-2 justify-between uw:px-36 lg:px-14 apple:px-24">
				<div class="w-2/5">
					<Textfield placeholder="Search Repositories" />
				</div>
				<button
					on:click={toggleModal}
					class="px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 bg-white rounded-md sm:inline
					hover:bg-brown-50 hover:text-gray-700"
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
					<Pagination pages={Math.ceil(catalog.total / pageSize)} />
				</div>
			{:else}
				<div class="flex justify-center items-center">
					<div
						class="bg-gray-50 w-10/12 rounded-md px-20 py-20 my-5 flex justify-center items-center"
					>
						<span class="text-brown-800 text-4xl">No Repositories</span>
					</div>
				</div>
			{/if}
		</div>

		<div class="my-20 flex justify-start flex-col items-center w-1/4">
			<Advert />
			<Advert />
		</div>
	</div>
</Card>
