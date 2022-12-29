<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-primary-100 block py-12 lg:py-20 laptop:pt-20">
	<div class="w-full h-full">
		<div class="px-6 my-6 w-full h-full flex justify-center flex-col items-center">
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<div class="flex justify-center items-center text-center">
					<span
						class="text-center whitespace-nowrap font-bold
				pb-4 text-6xl half:invisible ipad:self-center text-primary-700"
					>
						High Level Architecture
					</span>
				</div>

				<div class="flex text-center justify-center items-center">
					<span
						class="invisible text-center whitespace-nowrap font-semibold
					pb-4 text-3xl half:font-semibold half:visible"
					>
						High Level
					</span>
					<span
						class="invisible text-center whitespace-nowrap font-semibold
					pb-4 text-3xl half:font-semibold half:visible"
					>
						&nbsp;Architecture
					</span>
				</div>
				<div class="half:px-4">
					<p
						class="text-lg half:text-sm text-center font-normal leading-6 tracking-wide half:tracking-normal text-primary-600"
					>
						The following diagram tries to depict the high level architecture of OpenRegistry. We
						are hosted on Akash dCloud and the container images are stored on decentralised storage
						systems like IPFS. OpenRegistry is designed as a pluggable platform to adapt to any
						modern infrastructure or frameworks. We are exploring ways of collaborating with iExec,
						Arweave and Storj
					</p>
				</div>

				<div class="flex justify-center pt-2 cursor-pointer">
					<a
						class="text-primary-400 text-xl mt-1 font-semibold"
						href="https://blog.openregistry.dev/posts/overview"
						target="_blank"
						rel="noreferrer">More</a
					>
					<button
						class="transition duration-500 ease-in-out
                       bg-transparent hover: transform
                       hover:translate-x-2 hover:scale-110
                      	 pb-3 border border-none"
					>
						<Arrow styles="text-primary-400" />
					</button>
				</div>
			</div>
			<div class="half:w-[45%] laptop:w-1/2 laptop:mr-14 ipad:w-3/4 mr-14 half:mr-0">
				<picture>
					<img
						class="w-full"
						src="/openregistry-highlevel.png"
						alt="OpenRegistry High Level Architecture Diagram"
					/>
				</picture>
			</div>
		</div>
	</div>
</Card>
