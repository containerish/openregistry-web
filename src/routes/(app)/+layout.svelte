<script lang="ts">
	import '../../app.css';
	export let data: any;
	import NavbarAuth from '$lib/navbar-auth.svelte';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
</script>

<main
	class="flex flex-col selection:bg-primary-500 min-h-[1500px] desktop:min-h-max laptop:min-h-max
      selection:text-white w-screen lg:w-screen uw:min-w-[30vw] uw:max-w-[2000px] apple:max-w-[2000px]"
>
	<div
		class="bg-slate-100 flex flex-row gap-1 items-start half:overflow-y-auto laptop:overflow-y-auto"
	>
		<Sidebar user={data.user} />
		<slot />
	</div>
	<Footer />
</main>
