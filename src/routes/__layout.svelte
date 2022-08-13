<script context="module" lang="ts">
	import cookie from 'js-cookie';
	import { Auth, type User } from '../apis/auth';
	const auth = new Auth();

	export const load = async ({ url }) => {
		const signinPath = url.pathname === '/search' ? url.pathname : undefined;
		const u = new URLSearchParams(url.search);
		const openSignInModal = u.get('signin');
		const pathname: string = url.pathname;

		const sessionCookiePresent = cookie.get('session_id');
		console.log("session cookie present")
		const pubPath = pathname.startsWith('/u/') && pathname.split('/').length >= 3;
		if (pubPath && !sessionCookiePresent) {
			return {
				props: {
					signinPath: signinPath,
					pathname: url.pathname,
					openSignInModal: openSignInModal,
					authenticated: false
				}
			};
		}

		if (auth.publicPaths.has(pathname) && !sessionCookiePresent) {
			return {
				props: {
					signinPath: signinPath,
					pathname: url.pathname,
					openSignInModal: openSignInModal,
					authenticated: false
				}
			};
		}

		const { data, error, status } = await auth.GetUserWithSession();
		if (error) {
			return {
				status: status,
				error: JSON.stringify(error.message),
				props: {
					signinPath: signinPath,
					pathname: url.pathname,
					openSignInModal: openSignInModal,
					authenticated: false
				}
			};
		}

		return {
			props: {
				signinPath: signinPath,
				pathname: url.pathname,
				openSignInModal: openSignInModal,
				user: data,
				authenticated: true
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { userStore } from '$lib/userStore';
	export let signinPath: string;
	export let openSignInModal: boolean;
	export let user: User;
	export let authenticated: boolean = true;

	$: {
		userStore.setUser(user, authenticated);
	}
</script>

<main
	class="prose lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<Navbar pathname={signinPath} {openSignInModal} />
	<slot />
	<Footer />
</main>
