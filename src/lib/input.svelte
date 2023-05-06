<script lang="ts">
	export let placeholder = '';
	export let name = '';
	export let error = '';
	export let value = '';
</script>

<input
	{name}
	{placeholder}
	bind:value
	class="placeholder-gray-500 w-full form-control block px-3 py-2 text-sm lg:text-base font-normal text-gray-700 bg-white
	 bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
	 border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-500"
/>
<div class="w-full pt-1 capitalize text-center">
	<span class="text-xs font-semibold text-center text-rose-600 uppercase">
		{error}
	</span>
</div>
