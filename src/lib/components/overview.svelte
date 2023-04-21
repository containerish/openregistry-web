<script>
	import Card from '$lib/card.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card class="bg-primary-50 py-12">
	<div class="w-full h-full">
		<div
			class="px-6 md:px-9 w-full flex justify-center items-center flex-col xl:flex-row my-3 lg:my-28"
		>
			<div class="w-80 md:w-fit">
				<picture>
					<img src="overview.svg" alt="Operations" width="600px" />
				</picture>
			</div>
			<div class="w-full mx-8 flex justify-center flex-col max-w-2xl">
				<span
					class=" text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-3xl lg:text-5xl"
				>
					Overview
				</span>
				<p class="text-base lg:text-lg text-slate-800 text-center font-normal">
					OpenRegistry is fully compliant with OCI(Open Container Initiative) Distribution
					Specification and has received an official certification from OCI. This means there is no
					difference in operations of OpenRegistry than any other popular container registries like
					GHCR or Dockerhub. The best part is, OpenRegistry is decentralised since it uses
					<a
						class="text-red-700 text-lg font-semibold"
						href="https://akash.network/"
						target="_blank"
						rel="noreferrer"
					>
						Akash Network
					</a>
					as it's compute layer and
					<a
						class="text-cyan-600 text-lg font-semibold"
						href="https://ipfs.tech/"
						target="_blank"
						rel="noreferrer"
					>
						IPFS
					</a> for storage
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
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
		<div
			class="px-6 w-full flex justify-center items-center flex-col-reverse xl:flex-row my-2 lg:my-28"
		>
			<div class="w-full mx-8 flex justify-center flex-col max-w-2xl">
				<span
					class="text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-3xl lg:text-5xl"
				>
					Collaborations
				</span>
				<p
					class="text-base lg:text-lg text-slate-800 text-center font-normal 
					leading-6 tracking-wide "
				>
					Want to Collaborate? It's super easy with OpenRegistry. Our code is OpenSource and free to
					use. We are open to collaborations with projects that share similar vision and can be
					integrated together to serve larger audience. Simply contribute to OpenRegistry by helping
					with one of the
					<a
						class="font-semibold text-lg capitalize"
						href="https://github.com/containerish/OpenRegistry/issues"
						target="_blank"
						rel="noreferrer">github issues</a
					>
					or start a discussion at
					<a
						class="font-semibold capitalize text-lg"
						href="https://github.com/containerish/OpenRegistry/discussions/47"
						target="_blank"
						rel="noreferrer">github discussions</a
					>. We would love to hear from you.
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
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
			<div class="w-80 md:w-fit">
				<picture>
					<img src="/collaboration.svg" alt="Collaborations" width="600px" />
				</picture>
			</div>
		</div>
		<div class="px-6 w-full flex justify-center items-center flex-col xl:flex-row my-28">
			<div class="w-80 md:w-fit">
				<picture>
					<img src="man-arrow-up.svg" alt="Storage" width="600px" />
				</picture>
			</div>
			<div class="w-full mx-8 flex justify-center flex-col max-w-2xl">
				<div class="flex justify-center items-center text-center">
					<span
						class="text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-3xl lg:text-5xl"
					>
						Web 3.0 Infrastructure
					</span>
				</div>

				<p class="text-base lg:text-lg text-slate-800 text-center font-normal">
					Web 3.0 is the internet's layer of trust. It offers the decentralisation from web 1.0 and
					richness of web 2.0. It's Trustless, Self-Governing, Distributed and many more things. We
					at OpenRegistry believe in dWorld full of dApps. With our initiative, we want to make
					OpenRegistry free for everyone
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
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
