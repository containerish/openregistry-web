<script>
	import Button from '$lib/button-solid.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { getContext } from 'svelte';

	let onClick = getContext('onClickRegister');
	export let isLoading = false;
</script>

<div class="bg-red-900 z-[10000000] p-8 h-full w-full">
	<form class="my-8 w-full">
		<Textfield />
		<Button />
	</form>
</div>

<style>
	.flex-3 {
		flex: 3;
	}

	.btn {
		background-color: #14110d;
		border: none;
	}
</style>
