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
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<Landing />
</div>
