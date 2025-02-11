<script lang="ts">
	import { createCombobox, melt, type ComboboxOption } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { fly } from 'svelte/transition';
	import { Check } from './icons';
	import type { ListItem } from '$lib/types/components';

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => Promise<void>) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			await callback();
		}, 200);
	};

	$: {
		if ($touchedInput) {
			debounce(async () => {
				await onChangeHandler($inputValue, $selected);
			});
		}

		if ($inputValue) {
			debounce(async () => {
				await onChangeHandler($inputValue, $selected);
			});
		}
	}

	export let onSelectedChange: ChangeFn<ComboboxOption<ListItem<any>>[] | undefined>;
	export let onChangeHandler: (...args: any[]) => Promise<void>;
	export let multiple = true;
	export let items: ListItem<unknown>[];
	export let placeholder = '';

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox({
		forceVisible: true,
		closeOnEscape: true,
		closeOnOutsideClick: true,
		multiple: multiple,
		onSelectedChange: onSelectedChange,
	});
</script>

<div class="flex flex-col gap-1 w-full">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label}> </label>

	<input
		use:melt={$input}
		class="placeholder-slate-500 form-control block w-full px-3 py-3 h-10 lg:h-12 text-sm lg:text-base font-normal
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
		<div
			class="flex max-h-full flex-col gap-0 border rounded border-primary-200 overflow-y-auto bg-white px-2 py-2 text-black"
			tabindex="0"
		>
			{#each items as item, index (index)}
				<li
					use:melt={$option({
						value: item,
						label: item.label,
						disabled: item.disabled,
					})}
					class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4 data-[highlighted]:bg-primary-100
					data-[highlighted]:text-primary-900 data-[disabled]:opacity-50"
				>
					{#if $isSelected(item)}
						<div class="check absolute left-2 top-1/2 z-10 text-primary-900">
							<Check class="square-4 text-primary-700" />
						</div>
					{/if}
					<div class="pl-4 p-1 rounded">
						<span class="font-medium">{item.label}</span>
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

<style lang="postcss">
	.check {
		@apply absolute left-2 top-1/2 text-primary-500;
		translate: 0 calc(-50% + 1px);
	}
</style>
