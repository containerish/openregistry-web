<script context="module" lang="ts">
	import Cookies from 'js-cookie';

	export const prerender = true;
</script>

<script lang="ts">
	import Landing from './landing.svelte';
	import { getContext, onMount } from 'svelte';

	const isAuth = getContext<Function>('isAuth');

	let loggedIn = false;
	onMount(async () => {
		loggedIn = await isAuth(Cookies.get('session_id'));
		console.log("logged in:",loggedIn)
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	{#if loggedIn}
		{location.href="/repositories"}
	{:else}
		<Landing />
	{/if}
</div>
