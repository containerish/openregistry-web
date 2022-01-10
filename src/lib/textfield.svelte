<script>
	export let label = "";
	export let type = "text";
</script>

<div>
	<label for={label} class="block text-sm text-gray-800 dark:text-gray-200">{label}</label>
	<input type={type}
		   class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
</div>
