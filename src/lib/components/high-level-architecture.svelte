<script lang="ts">
	import Card from '$lib/card.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.from('.diagram', {
			duration: 1.5,
			opacity: 0,
			ease: backInOut,
			scale: 0.3,
			scrollTrigger: {
				trigger: '.trigger',
			},
		});

		let mm = gsap.matchMedia();
		mm.add('(max-width: 500px)', () => {
			gsap.to('.diagram', {
				opacity: 1,
				scale: 1,
			});
		});
	});
</script>

<Card id="high-level-architecture" class="bg-primary-100/40 py-12 lg:py-20 flex flex-col gap-6">
	<div class="flex px-6 w-full flex-col justify-center max-w-2xl items-center">
		<span class="text-primary-600 text-center whitespace-nowrap font-bold pb-6 text-3xl lg:text-5xl">
			High Level Architecture
		</span>

		<p class="text-center lg:text-lg font-normal leading-normal text-slate-800">
			The following diagram tries to depict the high level architecture of OpenRegistry. We are hosted on Akash
			dCloud and the container images are stored on decentralised storage systems like IPFS. OpenRegistry is
			designed as a pluggable platform to adapt to any modern infrastructure or frameworks. We are exploring ways
			of collaborating with iExec, Arweave and Storj
		</p>

		<div class="flex cursor-pointer justify-center pt-2">
			<a
				class="mt-1 text-lg font-semibold text-primary-500"
				href="https://blog.openregistry.dev/posts/overview"
				target="_blank"
				rel="noreferrer">More</a
			>
			<IconButton
				class="trigger transition-all duration-500 ease-in-out bg-transparent hover:transform hover:translate-x-2
            			hover:scale-110 border border-none w-5 p-1 mt-0.5"
			>
				<Arrow class="text-primary-500" />
			</IconButton>
		</div>
	</div>
	<div class="diagram w-11/12 max-w-[1000px]">
		<picture>
			<img class="w-full" src="/high-level-arch.webp" alt="OpenRegistry High Level Architecture Diagram" />
		</picture>
	</div>
</Card>
