<script lang="ts">
	import Cube from './icons/cube.svelte';
	import { debounce, throttle } from 'throttle-debounce';
	import { goto } from '$app/navigation';
	export let onAutoComplete: Function;
	let showItems = false;
	let searchQuery = '';
	let items = [];

	const handleOnChange = async (e: any) => {
		if (e.target.value === '') {
			showItems = false;
			return;
		}

		if (e.target.value.length < 5) {
			autoCompleteThrottled(e.target.value);
		} else {
			autoCompleteDebounced(e.target.value);
		}
	};

	const getList = async (q: string) => {
		const { data, error } = await onAutoComplete(q);
		if (error || !data) {
			showItems = false;
			return;
		}

		showItems = true;
		items = data;
	};

	const autoComplete = (q: string) => {
		getList(q);
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
	{#if showItems}
		<div class="pt-6 z-50">
			<div
				class="absolute divide-y-2 text-left inset-x-0 mx-5 mt-4 overflow-y-auto bg-white border rounded-md max-h-96"
			>
				{#each items as item}
					<a href="#" on:click={() => getHref(item)} class="py-1 block no-underline ">
						<div
							class="2xl:px-4 2xl:py-5 px-4 hover:bg-brown-50 gap-1 py-3 flex flex-row items-center justify-start"
						>
							<Cube />
							<h3 class=" font-lg text-gray-700 ">
								{item}
							</h3>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
