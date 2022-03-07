<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ session }) {
		return {
			props: {
				session: session
			}
		};
	}
</script>

<script lang="ts">
	import Landing from './landing.svelte';
	import Repository from './repositories/index.svelte';

	export let session: any;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	{#if session?.authenticated}
		<Repository />
	{:else}
		<Landing />
	{/if}
</div>
