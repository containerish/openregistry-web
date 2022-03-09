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
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import '../app.css';
	import NavbarAuth from '$lib/navbar-auth.svelte';

	export let session: any;
</script>

<main class="lg:w-screen uw:min-w-[55vw] uw:max-w-[65vw] flex justify-center flex-col">
	{#if session?.authenticated}
		<NavbarAuth user={session?.user} />
	{:else}
		<Navbar {session} />
	{/if}
	<slot />
	<Footer />
</main>
