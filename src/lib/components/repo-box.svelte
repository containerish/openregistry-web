<script>
	import { twMerge } from 'tailwind-merge';
	export let href = '';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	onMount(() => {
		gsap.fromTo(
			'.repobox',
			{ duration: 0.5, opacity: 0, y: -30 },
			{ duration: 1, opacity: 1, y: 30, stagger: 0.15, ease: backInOut }
		);
	});
</script>

<a
	{href}
	aria-label="popular repositories read more about {href}"
	class={twMerge(
		`repobox flex items-center justify-center bg-slate-50/80 border border-slate-400 rounded-sm 
		hover:no-underline hover:shadow-3xl hover:shadow-slate-400/80 h-[75px] w-[150px]`,
		$$props.class
	)}
>
	<slot />
</a>
