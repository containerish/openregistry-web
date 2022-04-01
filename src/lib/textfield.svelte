<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
	export let error = '';
	export let onInput = (e: any) => {};
</script>

<div class="flex items-center px-2">
	<label for={label} class="block font-semibold text-sm text-gray-800">{label}</label>
	{#if subHeading !== ''}
		<span class="px-2 text-xs text-brown-800">({subHeading})</span>
	{/if}
</div>
<input
	on:input={onInput}
	{name}
	{type}
	{placeholder}
	class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
/>
<div class="w-full pt-1 capitalize text-center">
	<span class="text-xs font-semibold text-center text-red-600 uppercase">
		{error}
	</span>
</div>
