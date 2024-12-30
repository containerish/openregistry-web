<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let label = '';
	export let type: HTMLInputTypeAttribute = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
	export let errors: string[] = [];
	export let value: string | undefined = undefined;
	export let disabled = false;
	export let readonly = false;

	const id = crypto.randomUUID();
</script>

<div class="flex items-center px-2">
	<label for={name ?? id} class="-ml-1 block text-sm font-semibold text-slate-500 lg:text-base">
		{label}
	</label>
	{#if subHeading !== ''}
		<span class="px-2 text-xs text-primary-700">({subHeading})</span>
	{/if}
</div>
<input
	{readonly}
	aria-label="text_input_{name}"
	{id}
	on:input
	on:change
	on:focus
	{type}
	on:keypress
	{name}
	value={value ?? ''}
	{placeholder}
	{disabled}
	class={twMerge(
		`form-control {errors && errors.length > 0 ? 'border-rose-600' : ''} m-0 block h-10 w-full rounded-md border border-solid border-primary-100 bg-white bg-clip-padding px-3 py-3 text-sm font-normal text-slate-700 placeholder-slate-500 transition ease-in-out focus:border-primary-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-40 disabled:text-slate-400 lg:h-12 lg:text-base`,
		$$props.class
	)}
/>
{#if errors && errors.length > 0}
	<div class="w-full pl-2 text-left capitalize">
		<span class="text-xs font-semibold uppercase text-rose-600">
			{errors[0]}
		</span>
	</div>
{/if}
