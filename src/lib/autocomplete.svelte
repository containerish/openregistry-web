<script lang="ts">
	import Cube from './icons/cube.svelte';
	import { debounce, throttle } from 'throttle-debounce';
	import { goto } from '$app/navigation';
	import type { Catalog } from '$apis/registry';
	export let onAutoComplete: Function;
	let showItems = false;
	let searchQuery = '';
	let catalog: Catalog = {
		repositories: [],
		total: 0
	};

	const handleOnChange = async (e: any) => {
		if (e.target.value === '' || e.target.value.length < 2) {
			showItems = false;
			catalog.repositories = [];
			return;
		}

		if (e.target.value.length < 5) {
			autoCompleteThrottled(e.target.value);
		} else {
			autoCompleteDebounced(e.target.value);
		}
	};

	const autoComplete = async (q: string) => {
		if (q === '') {
			catalog.repositories = [];
			showItems = false;
			return;
		}

		const { data, error } = await onAutoComplete(q);
		if (error) {
			catalog.repositories = null;
			showItems = false;
			return;
		}

		if (!data.repositories) {
			catalog.repositories = null;
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
			replaceState: true
		});
	};
</script>

<div class="relative flex w-full flex-wrap items-stretch">
	<span
		class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-500"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
				clip-rule="evenodd"
			/>
		</svg>
	</span>
	<input
		on:input={handleOnChange}
		bind:value={searchQuery}
		type="text"
		placeholder="Search..."
		class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-md text-sm border-0 shadow outline-none focus:outline-none focus:border-brown-600 focus:ring-brown-700 w-full pl-10"
	/>
	{#if !showItems && catalog.repositories === null && searchQuery !== ''}
		<div class="pt-6 z-50">
			<div
				class="absolute divide-y-2 text-left inset-x-0 mx-5 mt-4 overflow-y-auto bg-white border rounded-md max-h-96"
			>
				<button href="#" disabled class="py-1 m-0 w-full border-none block no-underline ">
					<div
						class="2xl:px-4 2xl:py-5 px-4 hover:bg-brown-50 gap-1 py-3 flex flex-row items-center justify-start"
					>
						<h3 class=" font-lg text-gray-700 ">No Results Found</h3>
					</div>
				</button>
			</div>
		</div>
	{/if}
	{#if showItems && catalog?.repositories.length > 0}
		<div class="pt-6 z-50">
			<div
				class="absolute divide-y-2 text-left inset-x-0 mx-5 mt-4 overflow-y-auto bg-white border rounded-md max-h-96"
			>
				{#each catalog.repositories as item}
					<button
						href="#"
						on:click={() => getHref(item.namespace)}
						class="py-1 w-full m-0 border-none block no-underline "
					>
						<div
							class="2xl:px-4 2xl:py-5 px-4 hover:bg-brown-50 gap-1 py-3 flex flex-row items-center justify-start"
						>
							<Cube />
							<h3 class=" font-lg text-gray-700 ">
								{item.namespace}
							</h3>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
