<script lang="ts">
	import { browser } from '$app/environment';
	import Card from '$lib/card.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';
	import { backInOut } from 'svelte/easing';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.fromTo(
			'.paragraph1',
			{ duration: 0.5, opacity: 0, x: -30 },
			{
				duration: 1,
				opacity: 1,
				x: 30,

				ease: backInOut,
				scrollTrigger: {
					trigger: '.pic1',
					start: 'top center'
				}
			}
		);

		gsap.fromTo(
			'.paragraph2',
			{ duration: 0.5, opacity: 0, x: 30 },
			{
				duration: 1,
				opacity: 1,
				x: -30,

				ease: backInOut,
				scrollTrigger: {
					trigger: '.pic2',
					start: 'top center'
				}
			}
		);

		gsap.fromTo(
			'.paragraph3',
			{ duration: 0.5, opacity: 0, x: -30 },
			{
				duration: 1,
				opacity: 1,
				x: 30,

				ease: backInOut,
				scrollTrigger: {
					trigger: '.pic3',
					start: 'top center'
				}
			}
		);
	});
</script>

<Card id="overview" class="bg-primary-50/50 py-12">
	<div class="w-full h-full flex flex-col gap-20 max-w-[1500px]">
		<div
			class="px-6 md:px-9 w-full flex justify-between gap-6 items-center flex-col md:flex-row my-3"
		>
			<div class="pic1 w-80 md:w-fit max-w-xl">
				<picture>
					<img src="overview.svg" alt="Operations" width="600px" />
				</picture>
			</div>
			<div class="paragraph1 w-full mx-8 flex justify-center flex-col max-w-xl">
				<span class=" text-primary-600 whitespace-nowrap font-semibold pb-4 text-2xl lg:text-4xl">
					Overview
				</span>
				<p class="lg:text-lg text-slate-700">
					OpenRegistry is fully compliant with OCI(Open Container Initiative) Distribution
					Specification and has received an official certification from OCI. This means there is no
					difference in operations of OpenRegistry than any other popular container registries like
					GHCR or Dockerhub. The best part is, OpenRegistry is decentralised since it uses
					<a
						class="text-rose-700 font-semibold"
						href="https://akash.network/"
						target="_blank"
						rel="noreferrer"
					>
						Akash Network
					</a>
					as it's compute layer and
					<a
						class="text-cyan-600 font-semibold"
						href="https://ipfs.tech/"
						target="_blank"
						rel="noreferrer"
					>
						IPFS
					</a> for storage
				</p>
				<div class="flex pt-2 cursor-pointer">
					<a
						class="text-primary-500 font-medium text-lg mt-1 hover:no-underline"
						href="https://conformance.opencontainers.org/"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="transition-all duration-500 ease-in-out bg-transparent hover:transform hover:translate-x-2
            			hover:scale-110 border border-none w-5 p-1 mt-0.5"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
		</div>
		<div class="px-6 w-full flex justify-between items-center flex-col-reverse md:flex-row my-2">
			<div class="paragraph2 w-full mx-8 flex justify-center flex-col max-w-xl">
				<span class="text-primary-600 whitespace-nowrap font-semibold pb-4 text-2xl lg:text-4xl">
					Collaborations
				</span>
				<p class="lg:text-lg text-slate-700">
					Want to Collaborate? It's super easy with OpenRegistry. Our code is OpenSource and free to
					use. We are open to collaborations with projects that share similar vision and can be
					integrated together to serve larger audience. Simply contribute to OpenRegistry by helping
					with one of the
					<a
						class="font-semibold capitalize"
						href="https://github.com/containerish/OpenRegistry/issues"
						target="_blank"
						rel="noreferrer">github issues</a
					>
					or start a discussion at
					<a
						class="font-semibold capitalize"
						href="https://github.com/containerish/OpenRegistry/discussions/47"
						target="_blank"
						rel="noreferrer">github discussions</a
					>. We would love to hear from you.
				</p>
				<div class="flex pt-2 cursor-pointer">
					<a
						class="text-primary-500 text-lg mt-1 font-medium hover:no-underline"
						href="https://blog.openregistry.dev/posts/collaborations"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="transition-all duration-500 ease-in-out bg-transparent hover:transform hover:translate-x-2
            			hover:scale-110 border border-none w-5 p-1 mt-0.5"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
			<div class="pic2 w-80 md:w-fit max-w-xl">
				<picture>
					<img src="/collaboration.svg" alt="Collaborations" width="600px" />
				</picture>
			</div>
		</div>
		<div class="px-6 w-full flex justify-between gap-6 items-center flex-col md:flex-row">
			<div class="pic3 w-80 md:w-fit max-w-xl">
				<picture>
					<img src="man-arrow-up.svg" alt="Storage" width="600px" />
				</picture>
			</div>
			<div class="paragraph3 w-full mx-8 flex justify-center flex-col max-w-xl">
				<span class="text-primary-600 whitespace-nowrap font-semibold pb-4 text-2xl lg:text-4xl">
					Web 3.0 Infrastructure
				</span>

				<p class="lg:text-lg text-slate-700">
					Web 3.0 is the internet's layer of trust. It offers the decentralisation from web 1.0 and
					richness of web 2.0. It's Trustless, Self-Governing, Distributed and many more things. We
					at OpenRegistry believe in dWorld full of dApps. With our initiative, we want to make
					OpenRegistry free for everyone
				</p>
				<div class="flex pt-2 cursor-pointer">
					<a
						class="text-primary-500 text-lg mt-1 font-medium hover:no-underline"
						href="https://blog.openregistry.dev/posts/web3-infrastructure"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="transition-all duration-500 ease-in-out bg-transparent hover:transform hover:translate-x-2
            			hover:scale-110 border border-none w-5 p-1 mt-0.5"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
		</div>
	</div>
</Card>
