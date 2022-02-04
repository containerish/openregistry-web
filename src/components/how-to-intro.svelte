<script>
	import Card from '$lib/card.svelte';
	import Xterm from '$lib/xterm.svelte';
</script>

<Card
	styles="bg-brown-400 half:flex-col laptop:flex-col apple:flex-col desktop:flex-col desktop:items-center half:pt-0 py-12 min-h-[70vh] dark:bg-brown-900"
>
	<div class="flex w-1/2 flex-col items-center px-6 pb-10 half:pt-24">
		<span
			class="font-poppins text-center dark:text-gray-300 whitespace-nowrap font-normal pb-4 text-5xl
			half:text-4xl half:font-semibold"
		>
			How does it work?
		</span>
		<ul class="font-lato text-center font-normal list-disc">
			<li class="text-left font-lato text-gray-800 text-xl dark:text-gray-300 half:text-[19px]">
				Create an account on <a href="#" class="dark:text-brown-50 underline text-brown-800"
					>OpenRegistry.dev</a
				>
			</li>
			<li class="dark:text-gray-300 text-left font-lato text-gray-800 text-xl half:text-[19px]">
				Install Docker/Nerdctl/Podman
			</li>
			<li class="dark:text-gray-300 text-left font-lato text-gray-800 text-xl half:text-[19px]">
				Login into OpenRegistry using Docker CLI
			</li>
		</ul>
	</div>

	<div class="w-3/4 h-[30vh] max-h-fit half:px-10 half:mb-10 laptop:px-10 apple:w-3/5 uw:w-3/6 uw:px-32">
		<Xterm />
	</div>
</Card>
