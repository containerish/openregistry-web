<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let href = '';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.fromTo(
			'.repobox',
			{ duration: 0.5, opacity: 0, y: -30 },
			{
				duration: 1,
				opacity: 1,
				y: 30,
				stagger: 0.1,
				ease: backInOut,
				scrollTrigger: {
					trigger: '.repobox',
					start: 'top center',
					id: 'tile',
				},
			}
		);

		let mm = gsap.matchMedia();
		mm.add('(max-width: 500px)', () => {
			gsap.fromTo(
				'.repobox',
				{ duration: 0.5, opacity: 0, y: -30 },
				{ duration: 0.3, opacity: 1, y: 30, delay: 2, stagger: 0.1 }
			);
		});
	});
</script>

<a
	{href}
	aria-label="popular repositories read more about {href}"
	class={twMerge(
		`flex items-center justify-center bg-slate-50/80 border border-slate-400 rounded-sm 
		hover:no-underline hover:shadow-3xl hover:shadow-slate-400/80 h-[75px] w-[150px]`,
		$$props.class
	)}
>
	<slot />
</a>
