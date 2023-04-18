<script lang="ts">
	import { ArrowRightIcon, ArrowLeftIcon } from '$lib/icons';
	import { getContext } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';
	import IconButton from './icon-button.svelte';

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
	<IconButton
		on:click={() => setActivePage(activePage - 1)}
		class="{activePage === 0
			? 'disabled cursor-not-allowed bg-slate-200'
			: 'bg-slate-100 hover:bg-slate-300 hover:text-gray-700'}
			px-3 mx-1 text-gray-500 rounded "
	>
		<ArrowLeftIcon />
	</IconButton>
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
	<IconButton
		on:click={() => setActivePage(activePage + 1)}
		class="{activePage === 0
			? 'disabled cursor-not-allowed bg-slate-200'
			: 'bg-slate-100 hover:bg-slate-300 hover:text-gray-700'}
			px-3 mx-1 text-gray-500 rounded"
	>
		<ArrowRightIcon />
	</IconButton>
</div>
