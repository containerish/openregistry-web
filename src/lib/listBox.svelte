<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { Check, ChevronIcon } from './icons/';
	type ListItem = {
		name: string;
		id: number;
		disabled: boolean;
		handler?: (val: unknown) => void;
	};

	export let items: ListItem[];

	$: items_render = new Map(Object.entries(items));
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	let selectedItem: ListItem = items[0];
	function setSelectItem(e: CustomEvent<string>) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		selectedItem = items_render.get(e.detail)!;
		if (selectedItem?.handler) {
			selectedItem.handler(selectedItem.name);
		}
	}
</script>

<div class="flex justify-center items-start flex-col">
	<div class="w-72">
		<div>
			<div class="relative mt-1">
				<Listbox value={selectedItem} on:change={setSelectItem}>
					<ListboxButton
						aria-label="list button"
						class="flex w-full px-4 py-3 h-10 lg:h-11 justify-between items-center border border-primary-100 rounded-md
						placeholder-slate-700 focus:bg-slate-50
						 focus:border-primary-200 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500
						disabled:text-slate-400"
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
							class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1
							 ring-black ring-opacity-5 focus:outline-none"
						>
							{#each items as item (item.id)}
								<ListboxOption
									class="hover:bg-primary-50 cursor-pointer flex items-center gap-2 select-none relative py-2 pr-4 text-slate-600 {selectedItem.id ===
									item.id
										? 'bg-emerald-100/40 text-slate-600 font-semibold pl-4'
										: 'pl-10'}"
									value={item.name}
									disabled={item.disabled}
								>
									{#if selectedItem.id === item.id}
										<span><Check class="h-4 w-4 text-emerald-600" /></span>
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
