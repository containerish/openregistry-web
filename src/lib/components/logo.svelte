<script lang="ts">
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	export let type: 'light' | 'dark' = 'light';

	onMount(() => {
		gsap.set('.dark', { transformOrigin: '50% 50%' });
		gsap.to('.dark', { duration: 1, rotation: 360, ease: backInOut });
	});
</script>

{#if type == 'light'}
	<picture class=" flex items-center gap-2">
		<img class="w-[42px]" src="/logo-light.png" alt="OpenRegistry-Logo" />
		<span class="text-xl font-semibold text-white"> OpenRegistry</span>
	</picture>
{/if}

{#if type == 'dark'}
	<picture class="flex items-center gap-2">
		<img class="dark w-[42px]" src="/logo-new.png" alt="OpenRegistry-Logo" />
		<span class="text-xl font-semibold text-primary-500"> OpenRegistry</span>
	</picture>
{/if}
