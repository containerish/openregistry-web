<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { onMount, setContext } from 'svelte';
	import '../app.css';
	import Cookies from 'js-cookie';

	const isAuth = async (cookie: string): Promise<boolean> => {
		if (cookie) {
			return new Promise<boolean>((resolve) => {
				resolve(true);
			});
		}

		return new Promise<boolean>((_, reject) => {
			reject(false);
		});
	};

	setContext('isAuth', isAuth);
	onMount(() => {
		isAuth(Cookies.get('access'))
			.then((auth) => {
				console.log('auth: ', auth);
			})
			.catch((err) => {
				console.log('error: ', err);
			});
	});
</script>

<main
	class="dark:bg-brown-900 bg-brown-900 lg:w-screen uw:min-w-[55vw] uw:max-w-[65vw] flex justify-center flex-col"
>
	<Navbar />
	<slot />
	<Footer />
</main>
