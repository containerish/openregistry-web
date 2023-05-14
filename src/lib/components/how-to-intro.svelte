<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Card from '$lib/card.svelte';
	import Xterm from '$lib/xterm.svelte';
	import { LaboratoryIcon, CloudIcon, ConfirmIcon, LayersIcon } from '$lib/icons';
	import { goto } from '$app/navigation';
	import Dialog from '$lib/dialog.svelte';
	import Signup from './signup.svelte';
	let showSignUpForm = false;
	const handleSignupForm = () => {
		showSignUpForm = !showSignUpForm;
	};
</script>

<div
	class="bg-slate-100 relative bg-contain"
	style="background-image:url('/mesh.png');"
>
	<Card
		class="min-h-[800px] flex flex-col items-center space-y-8 gap-10 py-20 
	lg:min-w-[1000px] max-w-[1500px] px-3 md:px-16 mx-auto"
	>
		<div
			class="flex flex-col justify-center items-start lg:flex-row lg:justify-between lg:items-center gap-12 w-full md:gap-6
			py-12"
		>
			<div class="flex flex-col gap-12 lg:w-3/5 px-6 items-start bg-slate-100/50">
				<div class="flex flex-col justify-center gap-3">
					<span class="text-4xl font-bold text-primary-600"> Get started with OpenRegistry </span>
					<span class="text-base font-medium text-slate-600">
						in just a few simple steps, you can get started
					</span>

					<ul class="text-center font-normal list-disc ml-3 mt-4">
						<li class="text-left text-slate-600 text-sm">
							Create an account on
							<a href="https://OpenRegistry.dev/?signup=true" class="underline text-primary-600">
								OpenRegistry.dev
							</a>
						</li>
						<li class="text-left text-slate-600 text-sm">Install Docker/Nerdctl/Podman</li>
						<li class="text-left text-slate-600 text-sm">
							Login into OpenRegistry using Docker CLI
						</li>
					</ul>
				</div>

				<div class="flex justify-center md:justify-start items-center gap-5">
					<ButtonSolid on:click={handleSignupForm}>Sign up now</ButtonSolid>
					<ButtonOutlined
						on:click={() => {
							goto('https://docs.openregistry.dev');
						}}>Learn more</ButtonOutlined
					>
				</div>
			</div>

			<div class="flex justify-center items-center">
				<Xterm />
			</div>
		</div>

		<!-- <div
			class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 py-12 px-6 items-center"
		>
			<div class="col-span-4 md:col-span-2 lg:col-span-4 text-center flex flex-col">
				<span
					class="text-primary-600 lg:col-span-2 text-center whitespace-nowrap pb-4 text-4xl
					font-semibold"
				>
					How does it work?
				</span>
				<span class="text-base text-slate-700 w-96 md:w-full"
					>A step by step description on how a layer is pushed to OpenRegistry</span
				>
			</div>
		</div> -->

		<!-- <div class="flex flex-col items-center md:items-end gap-12 md:grid md:grid-cols-4 w-full md:gap-6 
		rounded-lg px-6 py-6">
			<div class="col-span-4 md:py-20 text-center flex flex-col gap-3">
				<span
					class="text-primary-500 text-center whitespace-nowrap text-3xl
					font-semibold"
				>
					How does it work?
				</span>
				<span class="text-base self-center text-slate-600 w-96 md:w-full px-3"
					>A step by step description on how a layer is pushed to OpenRegistry</span
				>
			</div>

			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 1</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 2</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 3</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 4</span>

			<div class="col-span-4">
				<img src="/steps-line.png" alt="steps" class="hidden md:flex" />
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 1 </span>
				<span class=" text-slate-600">
					The container image submitted by user is divided into one or more layers depending on a
					few factors like size.
				</span>
				<div
					class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
				>
					<LaboratoryIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 2 </span>
				<span class=" text-slate-600 px-1">
					The layers are further divided into blobs and sequentially uploaded to the storage backend
					of user's preference like IPFS or Storj.
				</span>
				<div
					class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
				>
					<LayersIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 3 </span>
				<span class=" text-slate-600 px-1">
					A resolver component uploads the blobs to IPFS/Stoj and brings back the content hash which
					is mapped to the container image.
				</span>
				<div
					class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
				>
					<CloudIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 4 </span>
				<span class=" text-slate-600 px-1">
					Once all the blobs for a layer are recieved,a digest is calculated which is used with
					content hash while retrival of the layer.
				</span>
				<div
					class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
				>
					<ConfirmIcon />
				</div>
			</div>
		</div> -->
	</Card>
</div>
{#if showSignUpForm}
	<Dialog class="top-0">
		<Signup toggleSignInForm={() => {}} toggleSignUpForm={handleSignupForm} />
	</Dialog>
{/if}
