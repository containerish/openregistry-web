<script context="module" lang="ts">
	export async function load({ session }) {
		if (session.authenticated) {
			return {
				status: 302,
				redirect: '/repositories'
			};
		}

		return {
			props: {
				session
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
