<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
	export let error = '';
	export let onInput = (e: any) => {};
</script>

<div>
	<div class="flex items-center px-2">
		<label for={label} class="block text-md text-gray-800">{label}</label>
		{#if subHeading !== ''}
			<span class="px-2 text-xs text-brown-800">({subHeading})</span>
		{/if}
	</div>
	<input
		on:input={onInput}
		{name}
		{type}
		{placeholder}
		class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-brown-600
		 focus:outline-brown-100 focus:ring-brown-700"
	/>
	<span class="text-red-400">{error}</span>
</div>
