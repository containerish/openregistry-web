<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import type { LayoutServerData } from './$types';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { page } from '$app/stores';
	export let data: LayoutServerData;

	afterNavigate(() => {
		const main = window.document.getElementById('svelte');
		if (main) {
			main.scrollIntoView();
		}
	});

	onMount(() => {
		if (data.isAuthenticated && data.user && data.pathname === '/') {
			goto('/repositories');
		}
	});
	$: openSignInModal = new URL($page.url).searchParams.get('method') === 'signin';
	$: openSignUpModal = new URL($page.url).searchParams.get('method') === 'signup';
</script>

<main class="w-screen flex justify-center flex-col selection:bg-primary-500 selection:text-white">
	<Navbar {openSignInModal} {openSignUpModal} />
	<div class="tall:min-h-[1650px]">
		<slot />
	</div>

	<Footer />
</main>
