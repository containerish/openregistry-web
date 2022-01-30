<script lang="ts">
	import Advert from '$lib/advert.svelte';
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { onMount, setContext } from 'svelte';
	import NewRepository from '../../components/newRepository.svelte';
	import Repository from '../../components/repository.svelte';
	import { RegistryBackend } from '../../apis/registry.ts';
	import { Repository as Repo } from '../../apis/registry';
	import type { AxiosResponse } from 'axios';

	const backend = new RegistryBackend();

	let repositoryList: Repo[] = [];

	onMount(() => {
		backend.ListRepositories().then((repoList: Repo[]) => {
			if (!repoList) {
				return;
			}
			console.log('loiiiiii: ', repoList);
			repositoryList = repoList;
		});
		backend.ListTags('johndoe/openregistry');
	});

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);
	console.log('repo list', repositoryList);
</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-[#e5e2e0] dark:bg-brown-900">
	<div class="flex w-full h-full max-w-[3000px]">
		<div class="w-3/4 mx-8 my-8">
			<div class="flex px-10 pb-2 justify-between uw:px-36 lg:px-14 apple:px-24">
				<div class="w-2/5">
					<Textfield placeholder="Search Repositories" />
				</div>
				<button
					on:click={toggleModal}
					class="px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 dark:border-brown-800 bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-brown-50 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100"
				>
					Create Repository
				</button>
				{#if showModal}
					<Modal>
						<NewRepository />
					</Modal>
				{/if}
			</div>

			{#if repositoryList && repositoryList.length > 0}
				<div class="w-full px-4">
					{#each repositoryList as repo}
						<Repository data={repo} />
					{/each}
				</div>

				<div class="flex justify-center py-4 bg-cream-50 dark:bg-brown-900">
					<Pagination />
				</div>
			{:else}
				<div class="bg-gray-50 w-full rounded-md px-20 py-20 flex justify-center items-center">
					<span class="text-brown-800 text-5xl">No Repositories</span>
				</div>
			{/if}
		</div>

		<div class="my-20 flex justify-start flex-col items-center w-1/4">
			<Advert />
			<Advert />
		</div>
	</div>
</Card>
