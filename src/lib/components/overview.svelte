<script lang="ts">
	import Card from '$lib/card.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card id="overview" class="bg-primary-50/50 py-12">
	<div class="flex h-full w-full max-w-[1500px] flex-col gap-20">
		<div class="my-3 flex w-full flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-9">
			<div class="w-80 max-w-xl md:w-fit">
				<picture>
					<img src="overview.svg" alt="Operations" width="600px" />
				</picture>
			</div>
			<div class="mx-8 flex w-full max-w-xl flex-col justify-center">
				<span class=" whitespace-nowrap pb-4 text-2xl font-semibold text-primary-600 lg:text-4xl">
					Overview
				</span>
				<p class="text-slate-700 lg:text-lg">
					OpenRegistry is fully compliant with OCI(Open Container Initiative) Distribution Specification and
					has received an official certification from OCI. This means there is no difference in operations of
					OpenRegistry than any other popular container registries like GHCR or Dockerhub. The best part is,
					OpenRegistry is decentralised since it uses
					<a
						class="font-semibold text-rose-700"
						href="https://akash.network/"
						target="_blank"
						rel="noreferrer"
					>
						Akash Network
					</a>
					as it's compute layer and
					<a class="font-semibold text-cyan-600" href="https://ipfs.tech/" target="_blank" rel="noreferrer">
						IPFS
					</a> for storage
				</p>
				<div class="flex cursor-pointer pt-2">
					<a
						class="mt-1 text-lg font-medium text-primary-500 hover:no-underline"
						href="https://conformance.opencontainers.org/"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="mt-0.5 w-5 border border-none bg-transparent p-1
            			transition-all duration-500 ease-in-out hover:translate-x-2 hover:scale-110 hover:transform"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
		</div>
		<div class="my-2 flex w-full flex-col-reverse items-center justify-between px-6 md:flex-row">
			<div class=" mx-8 flex w-full max-w-xl flex-col justify-center">
				<span class="whitespace-nowrap pb-4 text-2xl font-semibold text-primary-600 lg:text-4xl">
					Collaborations
				</span>
				<p class="text-slate-700 lg:text-lg">
					Want to Collaborate? It's super easy with OpenRegistry. Our code is OpenSource and free to use. We
					are open to collaborations with projects that share similar vision and can be integrated together to
					serve larger audience. Simply contribute to OpenRegistry by helping with one of the
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
				<div class="flex cursor-pointer pt-2">
					<a
						class="mt-1 text-lg font-medium text-primary-500 hover:no-underline"
						href="https://blog.openregistry.dev/posts/collaborations"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="mt-0.5 w-5 border border-none bg-transparent p-1
            			transition-all duration-500 ease-in-out hover:translate-x-2 hover:scale-110 hover:transform"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
			<div class="w-80 max-w-xl md:w-fit">
				<picture>
					<img src="/collaboration.svg" alt="Collaborations" width="600px" />
				</picture>
			</div>
		</div>
		<div class="flex w-full flex-col items-center justify-between gap-6 px-6 md:flex-row">
			<div class="w-80 max-w-xl md:w-fit">
				<picture>
					<img src="man-arrow-up.svg" alt="Storage" width="600px" />
				</picture>
			</div>
			<div class="webthree mx-8 flex w-full max-w-xl flex-col justify-center">
				<span class="whitespace-nowrap pb-4 text-2xl font-semibold text-primary-600 lg:text-4xl">
					Web 3.0 Infrastructure
				</span>

				<p class="text-slate-700 lg:text-lg">
					Web 3.0 is the internet's layer of trust. It offers the decentralisation from web 1.0 and richness
					of web 2.0. It's Trustless, Self-Governing, Distributed and many more things. We at OpenRegistry
					believe in dWorld full of dApps. With our initiative, we want to make OpenRegistry free for everyone
				</p>
				<div class="flex cursor-pointer pt-2">
					<a
						class="mt-1 text-lg font-medium text-primary-500 hover:no-underline"
						href="https://blog.openregistry.dev/posts/web3-infrastructure"
						target="_blank"
						rel="noreferrer">More</a
					>
					<IconButton
						class="mt-0.5 w-5 border border-none bg-transparent p-1
            			transition-all duration-500 ease-in-out hover:translate-x-2 hover:scale-110 hover:transform"
					>
						<Arrow class="text-primary-500" />
					</IconButton>
				</div>
			</div>
		</div>
	</div>
</Card>
