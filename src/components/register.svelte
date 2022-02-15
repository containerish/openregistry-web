<script>
	import  { getContext } from 'svelte';

	let onClick = getContext('onClickRegister')
	export let isLoading = false;
</script>

<form class="my-8 w-full">
	<div class="flex items-center">
		<div class="flex-4 float-left w-80 half:w-full">
			<input placeholder="Email" id="register-for-beta-email" type="email" class="block w-full px-5 py-3.5
			text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-300 dark:text-gray-300
			dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
			desktop:ml-28 half:px-3 half:py-2.5 half:text-sm">
		</div>
		<div class="flex flex-3">
			<button on:click={onClick} class="inline-flex tracking-wider ml-4 items-center px-8 py-3.5
			font-normal leading-6 text-md shadow rounded-md text-gray-50 btn transition ease-in-out duration-150
			half:px-4 half:py-2 half:mt-1 desktop:ml-32">
				{#if isLoading}
				<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
				5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Processing...
				{:else}
					Register
				{/if}
			</button>
		</div>
	</div>
</form>

<style>
	.flex-3 {
		flex: 3
	}

	.btn{
		background-color: #14110d;
		border: none;
	}
</style>
