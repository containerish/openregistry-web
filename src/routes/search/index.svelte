<script lang="ts" context="module">
	/** @type import('@sveltejs/kit').Load} */
	export async function load({ url }) {
		const u = new URLSearchParams(url.search);
		return {
			props: {
				query: u.get('query')
			}
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import { onMount, setContext } from 'svelte';
	import NewRepository from '../../components/newRepository.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend } from '../../apis/registry';
	import Checkbox from '$lib/checkbox.svelte';
	import type { Catalog } from '../../apis/registry';
	import { createPopperActions } from 'svelte-popperjs';
	export let query: string = '';

	const [popperRef, popperContent] = createPopperActions({
		placement: 'top-start',
		strategy: 'fixed'
	});
	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	const backend = new RegistryBackend();

	const fetchPageData = (offset: number) => {
		backend
			.ListCatalog(backend.DefaultPageSize, backend.DefaultPageSize * offset)
			.then((data: Catalog) => {
				catalog = data;
			});
	};

	setContext('getPageData', fetchPageData);
	let catalog: Catalog;

	onMount(async () => {
		console.log('query from url: ', query);
		if (query && query !== '') {
			const { error, data } = await backend.SearchRepositories(query);
			if (error) {
				console.error('error in search/ListCatalog: ', error);
				return;
			}

			catalog = data;
			return;
		}

		let { data, error } = await backend.ListCatalog(backend.DefaultPageSize);
		if (error) {
			console.error('error in search/ListCatalog: ', error);
			return;
		}
		catalog = data;
		console.log('catalog: ', catalog);
	});

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	let showTooltip = false;

	setContext('toggleModal', toggleModal);
</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50">
	<div class="flex w-full h-full max-w-[3000px]">
		{#if showTooltip}
			<div id="tooltip" class="z-50 bg-white rounded-lg py-4 px-4" use:popperContent={extraOpts}>
				<span class=" text-gray-800">
					Coming soon
					<svg
						class="absolute text-white h-6 left-0 ml-3 top-full"
						x="0px"
						y="0px"
						viewBox="0 0 255 255"
						xml:space="preserve"
						><polygon class="fill-current" points="0,0 127.5,127.5 255,0" /></svg
					>
				</span>
				<div id="arrow" data-popper-arrow />
			</div>
		{/if}
		<div
			use:popperRef
			on:mouseenter={() => (showTooltip = true)}
			on:mouseleave={() => (showTooltip = false)}
			class="hover:opacity-50 opacity-60 h-full w-1/3 px-4 py-4 my-4"
		>
			<h3 class="font-semibold font-lato text-xl mb-4 text-brown-900">Filters</h3>
			<div class="my-5">
				<span class="text-lg font-lato text-brown-800">Operating System</span>
				<ul>
					<li><Checkbox label="Linux" /></li>
					<li>
						<Checkbox label="Windows" />
					</li>
				</ul>
			</div>
			<div class="my-5">
				<span class="text-lg font-lato text-brown-800">Categories</span>
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
			</div>
			<div class="my-5">
				<span class="text-lg font-lato text-brown-800">Architectures</span>
				<ul>
					<li><Checkbox label="ARM32" /></li>
					<li><Checkbox label="ARM64" /></li>
					<li><Checkbox label="X86" /></li>
					<li><Checkbox label="X86-64" /></li>
				</ul>
			</div>
		</div>
		<div class="w-3/4 my-8">
			<div class="flex px-4 pb-2 justify-between uw:px-36 apple:px-24">
				<button
					class="px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 bg-white
                        rounded-md sm:inline hover:bg-brown-50 hover:text-gray-700"
				>
					Sort
				</button>
				{#if showModal}
					<Modal>
						<NewRepository />
					</Modal>
				{/if}
			</div>

			{#if catalog && catalog.repositories && catalog.repositories.length > 0}
				<div class="w-full">
					{#each catalog.repositories as repo}
						<Repository data={repo} compact={false} />
					{/each}
				</div>

				<div class="flex justify-center py-4 bg-cream-50">
					<Pagination pages={Math.ceil(catalog.total / backend.DefaultPageSize)} />
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
	</div>
</Card>
