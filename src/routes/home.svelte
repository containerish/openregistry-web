<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Landing from './landing.svelte';
	import { RegistryBackend } from '../apis/registry';
	import Button from '$lib/button.svelte';

	let isAuthorized = false;

	const getCookie = async () => {
		let rb = new RegistryBackend();
		rb.ListRepositories();
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div on:load={getCookie}>
	{#if isAuthorized}
		<div>
			<Button styles="text-gray-50" onClick={() => getCookie()} label="Load Repositories" />
		</div>
	{:else}
		<Landing />
	{/if}
</div>
