<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Card from '$lib/card.svelte';
	import Xterm from '$lib/xterm.svelte';
	import {
		SettingsHowToIcon,
		LaboratoryIcon,
		CloudIcon,
		ConfirmIcon,
		LayersIcon
	} from '$lib/icons';
</script>

<div class=" bg-slate-100 relative">
	<Card
		styles="min-h-[800px] desktop:min-h-[800px] block flex flex-col desktop:items-center desktop:py-2 space-y-8 gap-10 py-20"
	>
		<div class="w-full flex justify-between half:flex-col half:px-4 laptop:flex-col items-center">
			<div class="flex flex-col gap-12 w-1/2">
				<div class="flex flex-col gap-3">
					<span
						class="text-7xl laptop:text-4xl desktop:text-5xl half:text-3xl font-black text-primary-700"
						>A truly decentralized container registry</span
					>
					<span class="text-2xl half:text-xl text-primary-600"
						>in just a few simple steps, you can get started with OpenRegsitry</span
					>

					<ul class="text-center font-normal list-disc ml-4 mt-4">
						<li class="text-left text-primary-600 text-xl half:text-[18px]">
							Create an account on
							<a href="https://OpenRegistry.dev/?signup=true" class="underline text-primary-400">
								OpenRegistry.dev
							</a>
						</li>
						<li class="text-left text-primary-600 text-xl half:text-[18px]">
							Install Docker/Nerdctl/Podman
						</li>
						<li class="text-left text-primary-600 text-xl half:text-[18px]">
							Login into OpenRegistry using Docker CLI
						</li>
					</ul>
				</div>

				<div class="flex justify-start items-center gap-5">
					<ButtonSolid>Sign up for free</ButtonSolid>
					<ButtonOutlined>Learn more</ButtonOutlined>
				</div>
			</div>

			<div class="w-3/4 apple:w-3/5 max-h-fit half:w-1/2 half:my-2 pt-4 uw:px-32">
				<Xterm />
			</div>
		</div>
		<div
			class="grid grid-cols-4 laptop:grid-cols-2 gap-12 laptop:gap-4 laptop:w-4/5 half:flex half:flex-col half:w-96 half:gap-4 py-20 px-4"
		>
			<span
				class="text-primary-600 col-span-4 laptop:col-span-2 text-center whitespace-nowrap pb-4 text-4xl md:text-5xl desktop:text-5xl font-semibold"
			>
				How does it work?
			</span>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center drop-shadow-lg bg-slate-100 px-4 py-10"
			>
				<LaboratoryIcon />
				<span class="text-center text-primary-600 text-lg"
					>The container image is divided in smaller chunks called layers which are further divided
					into blobs</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 1</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center drop-shadow-lg bg-slate-100 p-4"
			>
				<LayersIcon />
				<span class="text-center text-primary-600 text-lg"
					>The container image is divided in smaller chunks called layers which are further divided
					into blobs</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 2</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center drop-shadow-lg bg-slate-100 p-4"
			>
				<CloudIcon />
				<span class="text-center text-primary-600 text-lg"
					>The container image is divided in smaller chunks called layers which are further divided
					into blobs</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 3</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center drop-shadow-lg bg-slate-100 p-4"
			>
				<ConfirmIcon />
				<span class="text-center text-primary-600 text-lg"
					>The container image is divided in smaller chunks called layers which are further divided
					into blobs</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 4</span>
			</div>
		</div>
	</Card>
</div>
