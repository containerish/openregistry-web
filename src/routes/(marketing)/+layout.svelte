<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { LayoutServerData } from './$types';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	export let data: LayoutServerData;

	onMount(() => {
		if (data.isAuthenticated && data.user) {
			goto('/repositories');
		}
	});
</script>

<main
	class="lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<Navbar openSignInModal={false} />
	<slot />
	<Footer />
</main>
