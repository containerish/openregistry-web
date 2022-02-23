<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-brown-200 block m-h-screen py-12">
	<div class="w-full h-full">
		<div class="px-6 my-6 w-full flex justify-center items-center half:flex-col laptop:flex-col laptop:py-10 ipad:flex-col ipad:py-10">
			<div class="half:w-96">
				<picture>
					<img src="operations.svg" alt="Operations" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center whitespace-nowrap font-normal pb-4 text-5xl
					half:text-3xl half:font-semibold"
				>
					Overview
				</h3>
				<p class="font-lato text-[17.5px] text-center font-normal leading-6">
					OpenRegistry is fully compliant with OCI(Open Container Initiative) Distribution Specification
					and has received an official certification from OCI. This means there is no difference in operations
					of OpenRegistry than any other popular container registries like GHCR or Dockerhub.
					The best part is, OpenRegistry is decentralised since it uses
					<a class="text-red-700 text-lg font-semibold" href="https://akash.network/">Akash</a>
					as it's compute layer and
					<a class="text-green-600 text-lg font-semibold" href="https://siasky.net/">Skynet</a> for storage
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
					<a class="text-brown-900 text-xl mt-1" href="https://conformance.opencontainers.org/">More</a>
					<button
					   class="transition duration-500 ease-in-out
                       bg-transparent hover: transform
                       hover:translate-x-2 hover:scale-110
                      	 pb-3 border border-none">
						<Arrow/>
					</button>
				</div>
			</div>
		</div>
		<div class="px-6 my-6 w-full flex justify-center items-center half:flex-col-reverse laptop:flex-col-reverse laptop:py-10 ipad:flex-col-reverse ipad:py-10">
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center whitespace-nowrap font-normal pb-4 text-5xl
					half:text-3xl half:font-semibold"
				>
					Collaborations
				</h3>
				<p class="font-lato text-[17.5px] text-center font-normal leading-6">
					Want to Collaborate? It's super easy with OpenRegistry. Our code is OpenSource and free to use.
					We are open to collaborations with projects that share similar vision and can be integrated together
					to serve larger audience. You can also, simply contribute to OpenRegistry by helping with on of the
					<a class="font-semibold text-lg" href="https://github.com/containerish/OpenRegistry/issues">github issues</a>
					or start a discussion at
					<a class="font-semibold text-lg" href="https://github.com/containerish/OpenRegistry/discussions/47">github discussions</a>
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
					<a class="text-brown-900 text-xl mt-1" href="">More</a>
					<button
							class="transition duration-500 ease-in-out
                       bg-transparent hover: transform
                       hover:translate-x-2 hover:scale-110
                      	 pb-3 border border-none">
						<Arrow/>
					</button>
				</div>
			</div>
			<div class="half:w-96">
				<picture>
					<img src="/collaborations.svg" alt="Collaborations" />
				</picture>
			</div>
		</div>
		<div class="px-6 my-6 w-full flex justify-center items-center half:flex-col laptop:flex-col laptop:py-10 ipad:flex-col ipad:py-10">
			<div class="half:w-96 ipad:pb-4 half:pb-4">
				<picture>
					<img src="storage.svg" alt="Storage" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center whitespace-nowrap font-normal pb-4 text-5xl
					half:text-3xl half:font-semibold half:-ml-4 ipad:self-center"
				>
					Web 3.0 Infrastructure
				</h3>
				<p class="font-lato text-[17.5px] text-center font-normal leading-6">
					Web 3.0 is the internet's layer of trust. It offers the decentralisation from web 1.0 and richness of web 2.0.
					It's Trustless, Self-Governing, Distributed and many more things.
					We at OpenRegistry believe in dWorld full of dApps. With our initiative, we want to make OpenRegistry free for everyone
				</p>
				<div class="flex justify-center pt-2 cursor-pointer">
					<a class="text-brown-900 text-xl mt-1" href="">More</a>
					<button
							class="transition duration-500 ease-in-out
                       bg-transparent hover: transform
                       hover:translate-x-2 hover:scale-110
                      	 pb-3 border border-none">
						<Arrow/>
					</button>
				</div>
			</div>
		</div>
	</div>
</Card>
