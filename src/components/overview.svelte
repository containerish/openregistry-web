<script>
	import Card from '$lib/card.svelte';
</script>

<Card styles="bg-brown-200 block m-h-screen py-12 dark:bg-brown-800">
	<div class="w-full h-full">
		<div class="px-6 my-6 w-full  flex justify-center items-center">
			<div>
				<picture>
					<img src="operations.svg" alt="Operations" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center whitespace-nowrap font-normal pb-4 text-5xl dark:text-gray-200"
				>
					Operations
				</h3>
				<p class="font-lato text-center font-normal dark:text-gray-200">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
			</div>
		</div>
		<div class="px-6 my-6 w-full flex justify-center items-center">
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
				<h3
					class="font-poppins text-center whitespace-nowrap font-normal pb-4 text-5xl dark:text-gray-200"
				>
					Collaborations
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
					<img src="/collaborations.svg" alt="Collaborations" />
				</picture>
			</div>
		</div>
		<div class="px-6 my-6 w-full flex justify-center items-center">
			<div>
				<picture>
					<img src="storage.svg" alt="Storage" />
				</picture>
			</div>
			<div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl dark:text-gray-200">
				<h3
					class="font-poppins text-center dark:text-gray-200 whitespace-nowrap font-normal pb-4 text-5xl"
				>
					Web 3.0 Infrastructure
				</h3>
				<p class="font-lato text-center font-normal">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
			</div>
		</div>
	</div>
</Card>
