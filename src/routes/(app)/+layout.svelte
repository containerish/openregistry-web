<script lang="ts">
	import '../../app.css';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/navbar.svelte';

	export let data: LayoutData;
</script>

<main
	class="flex flex-col selection:bg-primary-500 min-h-[1500px] desktop:min-h-max laptop:min-h-max
      selection:text-white w-screen uw:min-w-[30vw] uw:max-w-[2000px] apple:max-w-[2000px]"
>
	{#if !data.user}
		<Navbar openSignInModal={false} />
		<div class="flex h-full w-full justify-center items-center">
			<slot />
		</div>
	{:else}
		<div
			class="bg-slate-100 flex flex-row gap-1 items-start half:overflow-y-auto laptop:overflow-y-auto"
		>
			<Sidebar user={data.user} />
			<slot />
		</div>
	{/if}

	<Footer />
</main>
