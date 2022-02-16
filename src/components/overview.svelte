<script>
	import Card from '$lib/card.svelte';
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
					Operations
				</h3>
				<p class="font-lato text-center font-normal">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
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
				<p class="font-lato text-center font-normal">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit
				</p>
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
