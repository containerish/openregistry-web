<script lang="ts">
	import '../../app.css';
	export let data: any;
	import NavbarAuth from '$lib/navbar-auth.svelte';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
</script>

<main
	class="flex flex-col selection:bg-primary-500 min-h-max
      selection:text-white lg:w-screen uw:min-w-[30vw] uw:max-w-[2000px] apple:max-w-[2000px] justify-center"
>
	<div class="flex flex-row gap-4 items-baseline">
		<Sidebar user={data.user} />
		<slot />
	</div>
	<Footer />
</main>
