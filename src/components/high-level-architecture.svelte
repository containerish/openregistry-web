<script>
	import Card from '$lib/card.svelte';
</script>

<Card styles="bg-brown-400 block py-12 uw:py-20 dark:bg-brown-900">
	<div class="w-full h-full">
		<div class="px-6 my-6 w-full h-full flex justify-center flex-col items-center">
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center dark:text-gray-200 whitespace-nowrap font-normal pb-4 text-5xl"
				>
					High Level Architecture
				</h3>
				<p class="font-lato text-center font-normal dark:text-gray-200">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
			</div>
			<div>
				<picture>
					<img src="/high-level-arch.png" alt="OpenRegistry High Level Architecture Diagram" />
				</picture>
			</div>
		</div>
	</div>
</Card>
