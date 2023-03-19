<script lang="ts">
	import '../../app.css';
	import Footer from '$lib/footer.svelte';
	import Navbar from '$lib/navbar.svelte';
	import { page } from '$app/stores';

	$: openSignInModal = new URL($page.url).searchParams.get('method') === 'signin';
	$: openSignUpModal = new URL($page.url).searchParams.get('method') === 'signup';
</script>

<main
	class="w-screen flex justify-center flex-col selection:bg-primary-500 
selection:text-white"
>
	<Navbar {openSignInModal} {openSignUpModal} />
	<div class="tall:min-h-[1545px] bg-primary-50">
		<slot />
	</div>
	<Footer />
</main>
