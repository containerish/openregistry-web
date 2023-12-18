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
	<label for={name ?? id} class="block font-semibold text-sm lg:text-base -ml-1 text-slate-500">
		{label}
	</label>
	{#if subHeading !== ''}
		<span class="px-2 text-xs text-primary-700">({subHeading})</span>
	{/if}
</div>
<input
	{readonly}
	aria-label="text input"
	id={name ?? id}
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
		`placeholder-slate-500 form-control block w-full px-3 py-3 h-10 lg:h-12 text-sm lg:text-base font-normal
		 text-slate-700 bg-white bg-clip-padding border-solid border-primary-100 transition 
		 ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-primary-200 
		 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500 disabled:text-slate-400 
		 {errors && errors.length > 0 ? 'border-rose-600' : ''}`,
		$$props.class
	)}
/>
{#if errors && errors.length > 0}
	<div class="w-full pl-2 capitalize text-left">
		<span class="text-xs font-semibold text-rose-600 uppercase">
			{errors[0]}
		</span>
	</div>
{/if}
