<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import NavbarAuth from '$lib/navbar-auth.svelte';
	import { Auth } from '../apis/auth';
	import '../app.css';
	import { session } from '$app/stores';

	const auth = new Auth();
	onMount(async () => {
		const { data, status } = await auth.GetUserWithSession();
		if (status === 200) {
			// @ts-ignore
			$session.user = data;
			// @ts-ignore
			$session.authenticated = true;
			return;
		}
	});
</script>

<main
	class="prose lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<NavbarAuth />
	<Navbar />
	<slot />
	<Footer />
</main>
