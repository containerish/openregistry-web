<script lang="ts">
	import { page } from '$app/stores';
	import ButtonSolid from '$lib/button-solid.svelte';
	import '../app.css';
</script>

<div
	class="bg-white text-center min-h-max py-8 2xl:py-16 flex-col w-full h-full flex justify-center items-center"
>
	{#if $page.status === 400 || $page.status === 401}
		<img class="w-1/2" src="/unauth.svg" alt="unauthorised" />
	{:else}
		<img class="w-1/2" src="/not-found.svg" alt="not found" />
	{/if}
	<div class="w-full flex flex-col justify-start gap-4 items-center">
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
