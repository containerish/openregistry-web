<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { LayoutServerData } from './$types';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	export let data: LayoutServerData;

	onMount(() => {
		if (data.isAuthenticated && data.user && data.pathname === '/') {
			goto('/repositories');
		}
	});
</script>

<main
	class="w-screen flex justify-center flex-col selection:bg-primary-500 selection:text-white"
>
	<Navbar openSignInModal={false} />
	<div class="tall:min-h-[1545px] bg-primary-50">
		<slot />
	</div>
	
	<Footer />
</main>
