<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	export let data;
	import '../app.css';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (data.pathname === '/' && data.user) {
			goto('/repositories');
			return;
		}
	});
</script>

<main
	class="prose lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<Navbar openSignInModal={false} {data} />
	<slot />
	<Footer />
</main>
