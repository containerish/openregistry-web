<script lang="ts">
	import Card from '$lib/card.svelte';
	import Xterm from '$lib/xterm.svelte';
</script>

<Card styles="bg-brown-400 min-h-[1000px] block flex-col desktop:items-center half:pt-0 pb-12">
	<div class="flex w-1/2 flex-col items-center px-6 pb-10 half:pt-24">
		<span
			class="text-brown-800 font-poppins text-center whitespace-nowrap pb-4 text-4xl md:text-6xl font-semibold"
		>
			How does it work?
		</span>
		<ul class="font-lato text-center font-normal list-disc">
			<li class="text-left font-lato text-gray-800 text-xl half:text-[19px]">
				Create an account on
				<a href="https://OpenRegistry.dev/?signup=true" class="underline text-brown-800">
					OpenRegistry.dev
				</a>
			</li>
			<li class="text-left font-lato text-gray-800 text-xl half:text-[19px]">
				Install Docker/Nerdctl/Podman
			</li>
			<li class="text-left font-lato text-gray-800 text-xl half:text-[19px]">
				Login into OpenRegistry using Docker CLI
			</li>
		</ul>
	</div>

	<div class="w-3/4 apple:w-3/5 max-h-fit half:px-10 half:mb-10 laptop:px-10 uw:px-32">
		<Xterm />
	</div>
</Card>
