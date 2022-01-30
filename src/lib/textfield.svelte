<script>
	export let label = '';
	export let type = 'text';
	export let placeholder = '';
	export let subHeading = '';
	export let name = '';
</script>

<div>
	<div class="flex items-center px-2">
		<label for={label} class="block text-md text-gray-800 dark:text-gray-200">{label}</label>
		{#if subHeading !== ''}
			<span class="px-2 text-sm text-brown-800 dark:text-brown-50">({subHeading})</span>
		{/if}
	</div>
	<input
		{name}
		{type}
		{placeholder}
		class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-cream-50 dark:text-brown-900 dark:border-gray-600 focus:border-brown-600 dark:focus:border-brown-700 focus:outline-brown-100 focus:ring-brown-700"
	/>
</div>
