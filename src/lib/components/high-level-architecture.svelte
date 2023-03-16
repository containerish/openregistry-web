<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-primary-100 block py-12 lg:py-20 flex flex-col gap-6">
	<div class="flex w-1/2 lg:w-full flex-col justify-center lg:max-w-2xl items-center">
		<span
			class="text-primary-600 text-center whitespace-nowrap font-bold pb-6 text-3xl lg:text-5xl">
			High Level Architecture
		</span>

		<p class="text-center text-base lg:text-lg font-normal leading-normal text-primary-600">
			The following diagram tries to depict the high level architecture of OpenRegistry. We are
			hosted on Akash dCloud and the container images are stored on decentralised storage systems
			like IPFS. OpenRegistry is designed as a pluggable platform to adapt to any modern
			infrastructure or frameworks. We are exploring ways of collaborating with iExec, Arweave and
			Storj
		</p>

		<div class="flex cursor-pointer justify-center pt-2">
			<a
				class="mt-1 text-lg font-semibold text-primary-400"
				href="https://blog.openregistry.dev/posts/overview"
				target="_blank"
				rel="noreferrer">More</a
			>
			<button
				class="hover: transform border border-none bg-transparent pb-3 transition 
				duration-500 ease-in-out hover:translate-x-2 hover:scale-110">
				<Arrow styles="text-primary-400" />
			</button>
		</div>
	</div>
	<div
		class="w-11/12 max-w-[2300px]"
	>
		<picture>
			<img
				class="w-full"
				src="/high-level-arch.png"
				alt="OpenRegistry High Level Architecture Diagram"
			/>
		</picture>
	</div>
</Card>
