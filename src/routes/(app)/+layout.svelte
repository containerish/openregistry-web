<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import '../../app.css';
	import Footer from '$lib/footer.svelte';
	import { Sidebar } from '$lib/components';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	export let data: LayoutData;

	let height = '';
	if (browser) {
		height = 'min-h-[' + window.screen.height + 'px]';
		// height = 'min-h-['+ window.innerHeight + 'px]';
	}

	afterNavigate(() => {
		const main = window.document.getElementById('svelte');
		if (main) {
			main.scrollIntoView();
		}
	});
</script>

<!-- {#if data.user} -->
<main
	class="{height} min-h-[1700px] flex flex-row selection:bg-primary-500 selection:text-white w-screen max-w-[2000px]
	bg-slate-50/50"
>
	{#if data.user}
		<div
			class="bg-primary-50/60 sticky top-0 left-0 h-full border border-primary-100/50 rounded
		mb-3 mr-6 p-3"
		>
			<Sidebar user={data.user} />
		</div>
	{/if}
	<div class="flex overflow-y-auto w-full mb-9">
		<slot />
	</div>
</main>
<Footer />
<!-- {/if} -->
