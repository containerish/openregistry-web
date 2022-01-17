<script>
	import Advert from '$lib/advert.svelte';
	import Card from '$lib/card.svelte';
	import Modal from '$lib/modal.svelte';
	import Pagination from '$lib/pagination.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { setContext } from 'svelte';
	import NewRepository from '../../components/newRepository.svelte';
	import Repository from '../../components/repository.svelte';

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	setContext('toggleModal', toggleModal);
</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-[#e5e2e0] dark:bg-brown-900">
	<div class="flex w-full h-full max-w-[3000px]">
		<div class="w-3/4 my-8">
			<div class="flex px-10 justify-between uw:px-20 lg:px-14 apple:px-24">
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

			<div class="w-full px-4">
				{#each [11, 2, 2, 2, 3, 4, 5, 6, 7, 3] as item}
					<Repository />
				{/each}
			</div>

			<div class="flex justify-center py-4 bg-cream-50 dark:bg-brown-900">
				<Pagination />
			</div>
		</div>
		<div class="my-20 flex justify-start flex-col items-center w-1/4">
			<Advert />
			<Advert />
		</div>
	</div>
</Card>
