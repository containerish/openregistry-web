<script lang="ts">
	import { ArrowRightIcon, ArrowLeftIcon } from '$lib/icons';
	import { getContext } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';

	let activePage = 0;
	const fetchPageData = getContext<Function>('fetchPageData');
	export let pages: number = 0;

	animateScroll.setGlobalOptions({
		duration: 0,
		easing: () => {}
	});

	const setActivePage = async (offset: number) => {
		animateScroll.scrollToTop();
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
			? 'disabled cursor-not-allowed bg-slate-100'
			: 'bg-slate-100 hover:bg-gray-200 hover:text-gray-700'}
			flex items-center justify-center px-4 mx-1 text-gray-500 capitalize rounded-md border-primary-100"
	>
		<ArrowLeftIcon />
	</button>
	{#each new Array(pages).fill(0) as i, page}
		<button
			id={i}
			on:click={() => setActivePage(page)}
			class=" {activePage === page ? 'bg-primary-200' : 'bg-primary-50'} px-4 py-2 mx-1 text-gray-700
				transition-colors duration-200 transform rounded-md sm:inline hover:bg-gray-200 hover:text-gray-700 border-primary-100"
		>
			{page + 1}
		</button>
	{/each}
	<button
		on:click={() => setActivePage(activePage + 1)}
		class="{activePage === pages - 1
			? 'disabled cursor-not-allowed bg-slate-100 border-1 focus:border-1'
			: 'bg-slate-100 hover:bg-gray-200 hover:text-gray-700'}
		px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform rounded-md sm:inline border-primary-100"
	>
		<ArrowRightIcon />
	</button>
</div>
