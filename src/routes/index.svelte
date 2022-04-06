<script lang="ts">
	import Landing from './landing.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(async () => {
		// @ts-ignore
		if ($session.authenticated) {
			goto('/repositories');
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<Landing />
</div>
