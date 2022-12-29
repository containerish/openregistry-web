<script lang="ts">
	import { page } from '$app/stores';
	import ButtonSolid from '$lib/button-solid.svelte';
	import '../app.css';
</script>

<div
	class="bg-brown-200 text-center min-h-[70vh] py-8 2xl:py-16 flex-col w-full h-full flex justify-center items-center"
>
	{#if $page.status === 400 || $page.status === 401}
		<img class="w-full" src="/unauthorised.svg" alt="" />
	{:else}
		<img class="w-full" src="/404-not-found.svg" alt="" />
	{/if}
	<div class="w-full h-full flex flex-col justify-start gap-4 items-center">
		<span class="text-brown-900 text-xl">
			Status Code: {$page.status}
			{JSON.stringify($page.error)}
		</span>
		<div class="flex gap-4 justify-center items-center">
			<ButtonSolid>Login</ButtonSolid>
			<span class="font-bold">Or</span>
			<ButtonSolid>Sign Up</ButtonSolid>
		</div>
	</div>
</div>
