<script context="module" lang="ts">
	import Cookies from 'js-cookie';
	export const prerender = true;
</script>

<script lang="ts">
	import Landing from './landing.svelte';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const isAuth = getContext<Function>('isAuth');

	let loggedIn = false;
	onMount(async () => {
		loggedIn = await isAuth(Cookies.get('session_id'));
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<Landing />
</div>
