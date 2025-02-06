<script lang="ts">
	import Card from '$lib/card.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card id="high-level-architecture" class="flex flex-col gap-6 bg-primary-100/40 py-12 lg:py-20">
	<div class="flex w-full max-w-2xl flex-col items-center justify-center px-6">
		<span class="whitespace-nowrap pb-6 text-center text-3xl font-bold text-primary-600 lg:text-5xl">
			High Level Architecture
		</span>

		<p class="text-center font-normal leading-normal text-slate-800 lg:text-lg">
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
				class="trigger mt-0.5 w-5 border border-none bg-transparent p-1
            			transition-all duration-500 ease-in-out hover:translate-x-2 hover:scale-110 hover:transform"
			>
				<Arrow class="text-primary-500" />
			</IconButton>
		</div>
	</div>
	<div class="w-11/12 max-w-[1000px]">
		<picture>
			<img class="w-full" src="/high-level-arch.webp" alt="OpenRegistry High Level Architecture Diagram" />
		</picture>
	</div>
</Card>
