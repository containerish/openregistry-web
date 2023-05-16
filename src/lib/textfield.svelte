<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let label = '';
	export let type = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
	export let errors: string[] = [];
	export let value: any = undefined;
	export let onInput = (e: any) => {};
	export let disabled: boolean = false;
</script>

<div class="flex items-center px-2">
	<label for={label} class="block font-semibold text-sm lg:text-base -ml-2 text-slate-700"
		>{label}</label
	>
	{#if subHeading !== ''}
		<span class="px-2 text-xs text-primary-700">({subHeading})</span>
	{/if}
</div>
<input
	aria-label="text input"
	on:input={onInput}
	{name}
	{type}
	value={value ?? ''}
	{placeholder}
	{disabled}
	class={twMerge(
		`placeholder-slate-500 form-control block w-full px-3 py-3 h-11 text-sm lg:text-base font-normal
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
