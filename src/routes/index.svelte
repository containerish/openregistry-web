<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Landing from './landing.svelte';
	import { RegistryBackend } from '../apis/registry';
	import { getContext, onMount } from 'svelte';
	import Repository from '../routes/repositories/index.svelte';

	const getCookie = async () => {
		let rb = new RegistryBackend();
		rb.ListRepositories();
	};

	const isAuth = getContext<Function>('isAuth');

	let loggedIn = false;
	onMount(async () => {
		loggedIn = await isAuth(document.cookie);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div on:load={getCookie}>
	{#if loggedIn}
		<Repository />
	{:else}
		<Landing />
	{/if}
</div>
