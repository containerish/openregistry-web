<script lang="ts">
	import type { SelectOptions } from '$lib/client/selectTypes';
	import Check from '$lib/icons/check.svelte';
	import ChevronDown from '$lib/icons/chevron-down.svelte';
	import { createSelect, melt, type SelectOption } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	const dispatch = createEventDispatcher();
	export let options: SelectOptions;
	export let placeholder = '';
	export let titleStyles = '';
	export let title = '';

	export const handleChange: ChangeFn<SelectOption> = ({ next }) => {
		dispatch('change', next);
		return next;
	};
	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect({
		forceVisible: true,
		defaultSelected: options.filterBy[0],
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
		onSelectedChange: handleChange,
	});
</script>

<div class="flex flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class={twMerge('block text-slate-700', titleStyles)} use:melt={$label}>{title}</label>
	<button
		class="flex h-10 min-w-[190px] items-center justify-between rounded bg-white px-3 py-2
    text-slate-700 hover:shadow transition-opacity hover:opacity-90 border border-primary-100"
		use:melt={$trigger}
		aria-label="options"
	>
		{$selectedLabel || placeholder}
		<ChevronDown class="square-5" />
	</button>
	{#if $open}
		<div
			class="z-10 flex max-h-[300px] flex-col
      overflow-y-auto rounded-lg bg-white p-1
      shadow focus:!ring-0"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#each options.filterBy as item}
				<div
					class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-slate-800
                hover:bg-primary-100 focus:z-10
                focus:text-slate-700
                data-[highlighted]:bg-primary-100 data-[highlighted]:text-slate-800
                data-[disabled]:opacity-50"
					use:melt={$option({ value: item.value, label: item.label, disabled: item.disabled })}
				>
					<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
						<Check
							class="square-4 absolute z-20 left-2 -translate-x-1/2 ml-1 translate-y-1 text-primary-500"
						/>
					</div>
					{item.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
