<script lang="ts">
	import Landing from './landing.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	// @ts-ignore
	session.subscribe(async ({ authenticated }) => {
		if (authenticated) goto('/repositories');
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<Landing />
</div>
