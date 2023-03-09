<script>
	import Card from '$lib/card.svelte';
	import Arrow from '$lib/icons/arrow-r.svelte';
</script>

<Card styles="bg-primary-100 block py-12 lg:py-20 laptop:pt-10">
	<div class="h-full w-full">
		<div class="my-6 flex h-full w-full flex-col items-center justify-center px-6">
			<div class="mx-8 flex w-1/2 flex-col justify-center lg:max-w-2xl">
				<div class="flex items-center justify-center text-center">
					<span
						class="whitespace-nowrap pb-4 text-center
				text-6xl font-bold text-primary-700 half:invisible laptop:text-5xl ipad:self-center desktop:text-5xl desktop:font-semibold"
					>
						High Level Architecture
					</span>
				</div>

				<div class="flex items-center justify-center text-center">
					<span
						class="invisible whitespace-nowrap pb-4 text-center
					text-3xl font-semibold half:visible half:font-semibold"
					>
						High Level
					</span>
					<span
						class="invisible whitespace-nowrap pb-4 text-center
					text-3xl font-semibold half:visible half:font-semibold"
					>
						&nbsp;Architecture
					</span>
				</div>
				<div class="half:px-4 laptop:-mt-10 desktop:-mt-10">
					<p
						class="text-center text-lg font-normal leading-normal text-primary-600 half:text-sm desktop:text-[16px]"
					>
						The following diagram tries to depict the high level architecture of OpenRegistry. We
						are hosted on Akash dCloud and the container images are stored on decentralised storage
						systems like IPFS. OpenRegistry is designed as a pluggable platform to adapt to any
						modern infrastructure or frameworks. We are exploring ways of collaborating with iExec,
						Arweave and Storj
					</p>
				</div>

				<div class="flex cursor-pointer justify-center pt-2">
					<a
						class="mt-1 text-lg font-semibold text-primary-400 desktop:font-normal"
						href="https://blog.openregistry.dev/posts/overview"
						target="_blank"
						rel="noreferrer">More</a
					>
					<button
						class="hover: transform border
                       border-none bg-transparent pb-3
                       transition duration-500
                      	 ease-in-out hover:translate-x-2 hover:scale-110"
					>
						<Arrow styles="text-primary-400" />
					</button>
				</div>
			</div>
			<div
				class="mr-14 w-11/12 max-w-[2300px] half:mr-0 half:w-[45%] laptop:mr-14 laptop:w-1/2 ipad:w-3/4"
			>
				<picture>
					<img
						class="w-full"
						src="/high-level-arch.png"
						alt="OpenRegistry High Level Architecture Diagram"
					/>
				</picture>
			</div>
		</div>
	</div>
</Card>
