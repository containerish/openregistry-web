<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-brown-400 block py-12 uw:py-20 laptop:pt-20">
	<div class="w-full h-full">
		<div class="px-6 my-6 w-full h-full flex justify-center flex-col items-center">
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h4
				class="font-poppins text-center whitespace-nowrap font-normal
				pb-4 text-5xl half:invisible ipad:self-center"
				>
					High Level Architecture
				</h4>
				<div class="flex -ml-4 -mt-10">
					<h4
							class="invisible font-poppins text-center whitespace-nowrap font-normal
					pb-4 text-3xl half:font-semibold half:visible half:pr-2 half:-ml-2"
					>
						High Level
					</h4>
					<h4
							class="invisible font-poppins text-center whitespace-nowrap font-normal
					pb-4 text-3xl half:font-semibold half:visible"
					>
						Architecture
					</h4>
				</div>
				<p class="font-lato text-[17.5px] text-center font-normal leading-6">
					The following diagram tries to depict the high level architecture of OpenRegistry.
					We are hosted on Akash dCloud and the container images are stored on decentralised storage systems
					like skynet. OpenRegistry is designed as a pluggable platform to adapt to any modern infrastructure
					or frameworks. We are exploring ways of collaborating with IPFS, Arweave and Storj
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
			<div class="half:w-96 laptop:w-3/4 laptop:mr-14 ipad:w-3/4 ipad:mr-14">
				<picture>
					<img src="/high-level-arch.png" alt="OpenRegistry High Level Architecture Diagram" />
				</picture>
			</div>
		</div>
	</div>
</Card>
