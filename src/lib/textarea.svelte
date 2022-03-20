<script lang="ts">
	export let placeholder = '';
	export let name = '';
	export let onInput = (e: any, key: string) => {};
</script>

<div class="my-2 xl:w-full">
	<textarea
		class="placeholder-gray-500 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
		id="FormControlTextarea"
		rows="3"
		maxlength="300"
		on:input={(e) => onInput(e, name)}
		{name}
		{placeholder}
	/>
</div>
