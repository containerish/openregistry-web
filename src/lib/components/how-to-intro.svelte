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
	import { goto } from '$app/navigation';
</script>

<div class=" bg-slate-100 relative">
	<Card
		styles="min-h-[800px] desktop:min-h-[800px] flex flex-col desktop:items-center desktop:py-2 space-y-8 gap-10 py-20 laptop:min-w-[1000px]"
	>
		<div class="w-full flex justify-between half:flex-col laptop:flex-col items-center">
			<div class="flex flex-col gap-12 w-1/2">
				<div class="flex flex-col justify-center gap-3 half:px-4">
					<span
						class="text-4xl apple:text-5xl uw:text-5xl half:text-3xl font-black
						 text-primary-700"
					>
						A truly decentralized container registry
					</span>
					<span class="text-[17px] apple:text-[24px] uw:text-[24px] text-primary-600"
						>in just a few simple steps, you can get started with OpenRegsitry</span
					>

					<ul class="text-center font-normal list-disc ml-4 mt-4">
						<li
							class="text-left text-primary-600 text-xl desktop:text-[16px] laptop:text-base half:text-[16px]"
						>
							Create an account on
							<a href="https://OpenRegistry.dev/?signup=true" class="underline text-primary-400">
								OpenRegistry.dev
							</a>
						</li>
						<li
							class="text-left text-primary-600 text-xl desktop:text-[16px] laptop:text-base half:text-[16px]"
						>
							Install Docker/Nerdctl/Podman
						</li>
						<li
							class="text-left text-primary-600 text-xl desktop:text-[16px] laptop:text-base half:text-[16px]"
						>
							Login into OpenRegistry using Docker CLI
						</li>
					</ul>
				</div>

				<div class="flex half:justify-center items-center gap-5">
					<ButtonSolid>Sign up for free</ButtonSolid>
					<ButtonOutlined
						onClick={() => {
							goto('https://docs.openregistry.dev');
						}}>Learn more</ButtonOutlined
					>
				</div>
			</div>

			<div
				class="w-3/4 apple:w-3/5 max-h-fit half:w-1/2 half:my-2 pt-14 uw:px-32 laptop:max-w-[950px]"
			>
				<Xterm />
			</div>
		</div>
		<div
			class="grid grid-cols-4 laptop:grid-cols-2 gap-12 laptop:gap-4 laptop:w-4/5 half:flex half:flex-col half:w-96 half:gap-4 py-20 px-4"
		>
			<div class="col-span-4 text-center flex flex-col">
				<span
					class="text-primary-600  laptop:col-span-2 text-center whitespace-nowrap pb-4 text-4xl apple:text-5xl uw:5xl desktop:text-4xl font-semibold"
				>
					How does it work?
				</span>
				<span class="text-lg text-slate-700"
					>A step by step description on how a layer is pushed to OpenRegistry</span
				>
			</div>

			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl bg-slate-100 px-4 py-10"
			>
				<LaboratoryIcon />
				<span class="text-center text-primary-600 text-lg desktop:text-[17px] laptop:text-base"
					>The container image subitted by user is divided into 1 or more layers depending on a few
					factors like size.</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 1</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl bg-slate-100 p-4"
			>
				<LayersIcon />
				<span class="text-center text-primary-600 text-lg desktop:text-[17px] laptop:text-base"
					>The layers are further divided into blobs and sequentially uploaded to the storage
					backend of user's preference like IPFS or Storj</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 2</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl bg-slate-100 p-4"
			>
				<CloudIcon />
				<span class="text-center text-primary-600 text-lg desktop:text-[17px] laptop:text-base"
					>A resolver component uploads the blobs to IPFS/Stoj and brings back the content hash
					which is mapped to the container image</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 3</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl bg-slate-100 p-4"
			>
				<ConfirmIcon />
				<span class="text-center text-primary-600 text-lg desktop:text-[17px] laptop:text-base"
					>Once all the blobs for a layer are recieved,a digest is calculated which is used with
					content hash while retrival of the layer</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 4</span>
			</div>
		</div>
	</Card>
</div>
