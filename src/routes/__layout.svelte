<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { onMount, setContext } from 'svelte';
	import '../app.css';
	import Cookies from 'js-cookie';

	const isAuth = () => {
		const sessionCookie = Cookies.get('session_id')
		return !!sessionCookie;
	};

	setContext('isAuth', isAuth);
</script>

<main
	class="lg:w-screen uw:min-w-[55vw] uw:max-w-[65vw] flex justify-center flex-col"
>
	<Navbar />
	<slot />
	<Footer />
</main>
