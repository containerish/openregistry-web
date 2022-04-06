<script context="module" lang="ts">
	import { Auth, type User } from '../apis/auth';
	const auth = new Auth();

	export const load = async ({ url }) => {
		const signinPath = url.pathname === '/search' ? url.pathname : undefined;
		const u = new URLSearchParams(url.search);
		const openSignInModal = u.get('signin');
		const pathname = url.pathname;

		if (auth.publicPaths.has(pathname)) {
			return {
				props: {
					signinPath: signinPath,
					pathname: url.pathname,
					openSignInModal: openSignInModal,
					authenticated: false
				}
			};
		}

		let s: number;
		try {
			const { data, status } = await auth.GetUserWithSession();
			s = status;
			return {
				props: {
					signinPath: signinPath,
					pathname: url.pathname,
					openSignInModal: openSignInModal,
					user: data,
					authenticated: true
				}
			};
		} catch (err) {
			if (err) {
				return {
					status: s,
					error: err,
					props: {
						signinPath: signinPath,
						pathname: url.pathname,
						openSignInModal: openSignInModal,
						authenticated: false
					}
				};
			}
		}
	};
</script>

<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { session } from '$app/stores';
	export let signinPath: string;
	export let openSignInModal: boolean;
	export let user: User;

	onMount(async () => {
		if (user) {
			// @ts-ignore
			$session.user = user;
			// @ts-ignore
			$session.authenticated = true;
			return;
		}

		// @ts-ignore
		$session.authenticated = false;
	});
</script>

<main
	class="prose lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<Navbar pathname={signinPath} {openSignInModal} />
	<slot />
	<Footer />
</main>
