<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import '../../app.css';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	afterNavigate(() => {
		const main = window.document.getElementById('svelte');
		if (main) {
			main.scrollIntoView();
		}
	});
</script>

{#if data.user}
	<main class="flex flex-col selection:bg-primary-500 selection:text-white w-screen max-w-[2000px]">
		<div class="bg-slate-100 flex flex-row gap-1 items-start overflow-y-auto">
			<Sidebar user={data.user} />
			<slot />
		</div>
		<Footer />
	</main>
{/if}
<!--  -->
