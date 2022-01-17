<script>
	import ArrowLeft from '$lib/icons/arrow-left.svelte';
	import ArrowRight from '$lib/icons/arrow-right.svelte';
</script>

<div class="flex dark:bg-brown-900">
	<button
		class="flex items-center justify-center px-4 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-brown-900 dark:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		<ArrowLeft />
	</button>

	<button
		class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		1
	</button>

	<button
		class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		2
	</button>

	<button
		class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		...
	</button>

	<button
		class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		10
	</button>

	<button
		class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100 dark:border-brown-800 dark:border-2"
	>
		<ArrowRight />
	</button>
</div>
