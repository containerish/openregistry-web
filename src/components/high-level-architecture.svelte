<script>
	import Card from '$lib/card.svelte';
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
				<p class="font-lato text-center font-normal">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
			</div>
			<div class="half:w-96 laptop:w-3/4 laptop:mr-14 ipad:w-3/4 ipad:mr-14">
				<picture>
					<img src="/high-level-arch.png" alt="OpenRegistry High Level Architecture Diagram" />
				</picture>
			</div>
		</div>
	</div>
</Card>
