<script context="module" lang="ts">
	export const load = async ({ url }) => {
		const pathname = url.pathname === '/search' ? url.pathname : undefined;

		const u = new URLSearchParams(url.search);
		const signin = u.get('signin');

		return {
			props: {
				pathname: pathname,
				openSignInModal: signin
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { Auth } from '../apis/auth';
	export let pathname: string;
	export let openSignInModal: boolean;

	const auth = new Auth();
	onMount(async () => {
		if (pathname === '/' || pathname === '/about') {
			return;
		}
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
	<Navbar {pathname} {openSignInModal} />
	<slot />
	<Footer />
</main>
