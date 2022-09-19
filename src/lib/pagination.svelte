<script lang="ts">
	import { ArrowRightIcon, ArrowLeftIcon } from '$lib/icons';
	import { getContext } from 'svelte';

	let activePage = 0;
	const fetchPageData = getContext<Function>('fetchPageData');
	export let pages: number = 0;

	const setActivePage = async (offset: number) => {
		if (offset > pages - 1 || offset < 0) {
			return;
		}
		await fetchPageData(offset);
		activePage = offset;
	};
</script>

<div class="flex">
	<button
		on:click={() => setActivePage(activePage - 1)}
		class="{activePage === 0
			? 'disabled cursor-not-allowed bg-cream-50'
			: 'bg-cream-50 hover:bg-gray-200 hover:text-gray-700'}
			flex items-center justify-center px-4 mx-1 text-gray-500 capitalize rounded-md border-brown-100"
	>
		<ArrowLeftIcon />
	</button>
	{#each new Array(pages).fill(0) as i, page}
		<button
			id={i}
			on:click={() => setActivePage(page)}
			class=" {activePage === page ? 'bg-brown-400' : 'bg-cream-50'} px-4 py-2 mx-1 text-gray-700
				transition-colors duration-200 transform rounded-md sm:inline hover:bg-gray-200 hover:text-gray-700 border-brown-100"
		>
			{page + 1}
		</button>
	{/each}
	<button
		on:click={() => setActivePage(activePage + 1)}
		class="{activePage === pages - 1
			? 'disabled cursor-not-allowed bg-cream-50 border-1 focus:border-1'
			: 'bg-cream-50 hover:bg-gray-200 hover:text-gray-700'}
		px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform rounded-md sm:inline border-brown-100"
	>
		<ArrowRightIcon />
	</button>
</div>
