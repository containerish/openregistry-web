<script lang="ts">
	import '../../app.css';
	export let data: any;
	import NavbarAuth from '$lib/navbar-auth.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<main
	class="lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-primary-500
      selection:text-cream-50"
>
	<NavbarAuth user={data.user} />
	<slot />
	<Footer />
</main>
