<script lang="ts">
	import '../../app.css';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

{#if data.user}
	<main class="flex flex-col selection:bg-primary-500 selection:text-white w-screen max-w-[2000px]">
		<div class="bg-slate-100 flex flex-row gap-1 items-start overflow-y-auto tall:min-h-[1700px]">
			<Sidebar user={data.user} />
			<slot />
		</div>
		<Footer />
	</main>
{/if}
