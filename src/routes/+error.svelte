<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ButtonSolid from '$lib/button-solid.svelte';
	import '../app.css';
</script>

<div class="text-center min-h-max flex-col w-full h-full flex justify-center items-center">
	<div class="flex flex-col justify-center items-center w-2/3">
		{#if $page.status === 400 || $page.status === 401}
			<img class="w-1/2" src="/unauth.svg" alt="unauthorised" />
		{:else}
			<img class="w-1/2" src="/not-found.svg" alt="not found" />
		{/if}
		<div class="w-full flex flex-col justify-start gap-4 items-center">
			<span class="text-slate-600 text-xl">
				Status Code: {$page.status}
			</span>
			<span class="text-slate-600 text-xl"> This page does not exist </span>
			<div class="flex gap-4 justify-center items-center">
				<ButtonSolid on:click={() => goto('/auth/signin')}>SignIn</ButtonSolid>
				<span class="font-bold">or</span>
				<ButtonSolid on:click={() => goto('/auth/signup')}>Sign Up</ButtonSolid>
			</div>
		</div>
	</div>
</div>
