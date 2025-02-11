<script lang="ts">
	import Cube from './icons/cube.svelte';
	import { debounce, throttle } from 'throttle-debounce';
	import { goto } from '$app/navigation';
	import type { Catalog } from '$apis/registry';
	import Search from './icons/search.svelte';
	export let onAutoComplete: (q: string) => Promise<{ data: Catalog; error: string }>;
	let showItems = false;
	let searchQuery = '';
	let catalog: Catalog = {
		repositories: [],
		total: 0,
	};

	const handleOnChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.value === '' || target.value.length < 2) {
			showItems = false;
			catalog.repositories = [];
			return;
		}

		if (target.value.length < 5) {
			autoCompleteThrottled(target.value);
		} else {
			autoCompleteDebounced(target.value);
		}
	};

	const autoComplete = async (q: string) => {
		console.log('auto complete input:', q);
		if (q === '') {
			catalog.repositories = [];
			showItems = false;
			return;
		}

		const { data, error } = await onAutoComplete(q);
		if (error) {
			catalog.repositories = [];
			showItems = false;
			return;
		}

		if (!data.repositories) {
			catalog.repositories = [];
			showItems = false;
			return;
		}

		if (searchQuery !== '') {
			showItems = true;
			catalog = data;
		}
	};

	const autoCompleteDebounced = debounce(500, autoComplete);
	const autoCompleteThrottled = throttle(500, autoComplete);

	const getHref = async (item: string) => {
		showItems = false;
		searchQuery = '';
		await goto(`/u/${item}`, {
			replaceState: true,
		});
	};
</script>

<div class="relative flex w-full flex-wrap items-stretch">
	<span
		class="z-10 font-normal text-center absolute bg-transparent
		rounded text-base items-center justify-center pl-4 pt-3"
	>
		<Search class="text-primary-400 w-5 h-5" />
	</span>
	<input
		aria-label="autocomplete"
		on:input={handleOnChange}
		type="search"
		class="placeholder-slate-500 form-control block w-full px-3 py-2 text-base
		font-normal text-slate-700 bg-white bg-clip-padding border-solid border-primary-100
		transition ease-in-out m-0 focus:text-gray-700 focus:bg-slate-50 border rounded-md focus:border-primary-200
		focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-primary-50 disabled:text-slate-400 pl-12"
	/>

	{#if !showItems && catalog.repositories === null && searchQuery !== ''}
		<div class="pt-6 z-50">
			<div
				class="absolute divide-y-2 text-left inset-x-0 mx-5 mt-4 overflow-y-auto bg-white border rounded-md
				max-h-96"
			>
				<button aria-label="no results found" disabled class="py-1 m-0 w-full border-none block no-underline">
					<div
						class="2xl:px-4 2xl:py-5 px-4 hover:bg-slate-50 gap-1 py-3 flex flex-row items-center
						justify-start"
					>
						<h3 class=" font-lg text-gray-700">No Results Found</h3>
					</div>
				</button>
			</div>
		</div>
	{/if}
	{#if showItems && catalog?.repositories.length > 0}
		<div class="pt-6 z-50">
			<div
				class="absolute divide-y-2 text-left inset-x-0 mx-5 mt-4 overflow-y-auto bg-white border rounded-md
				max-h-96"
			>
				{#each catalog.repositories as item}
					<button
						aria-label="namespaces"
						on:click={() => getHref(item.namespace)}
						class="py-1 w-full m-0 border-none block no-underline"
					>
						<div
							class="2xl:px-4 2xl:py-5 px-4 hover:bg-slate-50 gap-1 py-3 flex flex-row items-center
							justify-start"
						>
							<Cube />
							<h3 class=" font-lg text-gray-700">
								{item.namespace}
							</h3>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
