<script lang="ts">
	import { createCombobox, melt, type ComboboxOption } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { fly } from 'svelte/transition';

	type ListItem = {
		name: string;
		id: number;
		disabled: boolean;
		handler?: (val: unknown) => void;
	};

	export let items: ListItem[];
	export let placeholder = '';

	const onSelectedChange: ChangeFn<ComboboxOption<ListItem> | undefined> = ({ curr, next }) => {
		console.log('curr: ', curr);
		console.log('next: ', next);

		return next;
	};

	$: items_render = new Map(Object.entries(items));
	let selectedItem: ListItem = items[0];
	function setSelectItem(e: CustomEvent<string>) {
		selectedItem = items_render.get(e.detail)!;
		if (selectedItem?.handler) {
			selectedItem.handler(selectedItem.name);
		}
	}

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected },
	} = createCombobox({
		forceVisible: true,
		onSelectedChange: onSelectedChange,
		closeOnEscape: true,
		closeOnOutsideClick: true,
	});
</script>

<div class="flex flex-col gap-1 w-full">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label}> </label>

	<input
		use:melt={$input}
		class="placeholder-slate-500 form-control block w-11/12 px-3 py-3 h-10 lg:h-12 text-sm lg:text-base font-normal
      text-slate-700 bg-white bg-clip-padding border-solid border-primary-100 transition
      ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-primary-200
      focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500 disabled:text-slate-400"
		{placeholder}
	/>
</div>
{#if $open}
	<ul
		class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black" tabindex="0">
			{#each items as item (item.id)}
				<li
					use:melt={$option({
						value: item,
						label: item.name,
						disabled: item.disabled,
					})}
					class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
		  data-[highlighted]:bg-primary-200 data-[highlighted]:text-primary-900
			data-[disabled]:opacity-50"
				>
					<div class="pl-4">
						<span class="font-medium">{item.name}</span>
					</div>
				</li>
			{:else}
				<li
					class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
		  data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-700"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}
