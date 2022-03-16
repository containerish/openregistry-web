<script context="module" lang="ts">
	export const prerender = true;

	/* import sessionStore from '../stores/session'; */
	/* export async function load({ session }) { */
	/* 	sessionStore.subscribe(async ({ isAuthenticated, user }) => { */
	/* 		session.user = user; */
	/* 		session.authenticated = isAuthenticated; */

	/* 		if (!isAuthenticated) { */
	/* 			return { */
	/* 				status: 302, */
	/* 				redirect: '/auth/unauthorized' */
	/* 			}; */
	/* 		} */
	/* 	}); */

	/* 	return { */
	/* 		props: { */
	/* 			session: session */
	/* 		} */
	/* 	}; */
	/* } */
</script>

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
		const { error, data, status } = await auth.GetUserWithSession();
		if (status === 200) {
			// @ts-ignore
			$session.user = data;
			// @ts-ignore
			$session.authenticated = true;
			return;
		}
	});
</script>

<main class="lg:w-screen uw:min-w-[55vw] uw:max-w-[65vw] flex justify-center flex-col">
	<NavbarAuth />
	<Navbar />
	<slot />
	<Footer />
</main>
