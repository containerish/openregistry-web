<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-primary-50 block py-12">
	<div class="w-full h-full">
		<div
			class="px-6 w-full flex justify-center items-center half:flex-col
			laptop:flex-col laptop:py-10 ipad:flex-col ipad:py-10 my-28"
		>
			<div class="half:w-96">
				<picture>
					<img src="overview.svg" alt="Operations" width="600px" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class=" text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-6xl
					half:text-3xl"
				>
					Overview
				</h3>
				<p class="text-lg text-primary-700 text-center font-normal leading-6 tracking-wide">
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
						class="text-primary-400 font-semibold text-xl mt-1"
						href="https://conformance.opencontainers.org/"
						target="_blank"
						rel="noreferrer">More</a
					>
					<button
						class="transition-all duration-500 ease-in-out bg-transparent hover: transform hover:translate-x-2
            hover:scale-110 pb-3 border border-none"
					>
						<Arrow />
					</button>
				</div>
			</div>
		</div>
		<div
			class="px-6 w-full flex justify-center items-center half:flex-col-reverse laptop:flex-col-reverse
			laptop:py-10 ipad:flex-col-reverse ipad:py-10 my-28"
		>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-6xl
					half:text-3xl"
				>
					Collaborations
				</h3>
				<p class="text-lg text-primary-700 text-center font-normal leading-6 tracking-wide">
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
						class="text-primary-400 text-xl mt-1"
						href="https://blog.openregistry.dev/posts/collaborations"
						target="_blank"
						rel="noreferrer">More</a
					>
					<button
						class="transition duration-500 ease-in-out bg-transparent hover: transform hover:translate-x-2
       hover:scale-110 pb-3 border border-none"
					>
						<Arrow />
					</button>
				</div>
			</div>
			<div class="half:w-96">
				<picture>
					<img src="/collaboration.svg" alt="Collaborations" width="600px" />
				</picture>
			</div>
		</div>
		<div
			class="px-6 w-full flex justify-center items-center half:flex-col laptop:flex-col
			laptop:py-10 ipad:flex-col ipad:py-10 my-28"
		>
			<div class="half:w-96 ipad:pb-4 half:pb-4">
				<picture>
					<img src="man-arrow-up.svg" alt="Storage" width="600px" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<div class="flex justify-center items-center text-center">
					<span
						class="text-primary-600 text-center whitespace-nowrap font-semibold pb-4 text-6xl
					half:text-3xl ipad:self-center"
					>
						Web 3.0 Infrastructure
					</span>
				</div>

				<p class="text-lg text-primary-700 text-center font-normal leading-6 tracking-wide">
					Web 3.0 is the internet's layer of trust. It offers the decentralisation from web 1.0 and
					richness of web 2.0. It's Trustless, Self-Governing, Distributed and many more things. We
					at OpenRegistry believe in dWorld full of dApps. With our initiative, we want to make
					OpenRegistry free for everyone
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
					<a
						class="text-primary-400 text-xl mt-1"
						href="https://blog.openregistry.dev/posts/web3-infrastructure"
						target="_blank"
						rel="noreferrer">More</a
					>
					<button
						class="transition duration-500 ease-in-out bg-transparent hover: transform hover:translate-x-2
          hover:scale-110 pb-3 border border-none"
					>
						<Arrow />
					</button>
				</div>
			</div>
		</div>
	</div>
</Card>
