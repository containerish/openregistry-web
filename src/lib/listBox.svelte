<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { CheckIcon, ChevronIcon } from './icons/';
	import { ghStore } from './stores';

	type ListItem = {
		name: string;
		id: number;
		disabled: boolean;
		handler?: VoidFunction;
	};

	export let items: ListItem[];

	let selectedItem: ListItem = items[0];
	function setSelectItem(item: ListItem) {
		selectedItem = item;
		item?.handler();
	}
</script>

<div class="flex justify-center items-start flex-col">
	<div class="w-72">
		<div>
			<div class="relative mt-1">
				<Listbox value={selectedItem} on:change={(e) => setSelectItem(e.detail)}>
					<ListboxButton
						class="flex w-full px-4 justify-between border-2 border-brown-400 rounded-md"
					>
						{selectedItem.name}
						<ChevronIcon />
					</ListboxButton>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<ListboxOptions
							class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							{#each items as item (item.id)}
								<ListboxOption
									class="hover:bg-cream-50 cursor-pointer flex gap-2 select-none relative py-2 pr-4 text-gray-900 {selectedItem.id ===
									item.id
										? 'bg-cream-50 text-brown-800 font-semibold pl-4'
										: 'pl-10'}"
									value={item}
									disabled={item.disabled}
								>
									{#if selectedItem.id === item.id}
										<span><CheckIcon styles="h-5 w-5 text-brown-600" /></span>
									{/if}
									<span>{item.name}</span>
								</ListboxOption>
							{/each}
						</ListboxOptions>
					</Transition>
				</Listbox>
			</div>
		</div>
	</div>
</div>
