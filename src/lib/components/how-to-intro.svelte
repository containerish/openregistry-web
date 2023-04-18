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
	import { setContext } from 'svelte';
	import Dialog from '$lib/dialog.svelte';
	import Signup from './signup.svelte';
	let showSignUpForm = false;
	const handleSignupForm = () => {
		showSignUpForm = !showSignUpForm;
	};
</script>

<div class=" bg-slate-100 relative">
	<Card
		class="min-h-[800px] flex flex-col items-center space-y-8 gap-10 
		py-20 lg:min-w-[1000px] max-w-[2000px] px-16 mx-auto"
	>
		<div class="w-full flex flex-col lg:flex-row lg:justify-between items-center">
			<div class="flex flex-col gap-12 w-[380px] md:w-3/5 px-6">
				<div class="flex flex-col justify-center gap-3">
					<span class="text-3xl lg:text-5xl font-bold text-primary-600">
						A truly decentralized container registry
					</span>
					<span class="text-lg lg:text-xl font-medium text-primary-600">
						in just a few simple steps, you can get started with OpenRegsitry
					</span>

					<ul class="text-center font-normal list-disc ml-6 mt-4">
						<li class="text-left text-primary-600 text-base xl:text-xl">
							Create an account on
							<a href="https://OpenRegistry.dev/?signup=true" class="underline text-primary-600">
								OpenRegistry.dev
							</a>
						</li>
						<li class="text-left text-primary-600 text-base xl:text-xl">
							Install Docker/Nerdctl/Podman
						</li>
						<li class="text-left text-primary-600 text-base xl:text-xl">
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

			<div class="w-[380px] md:w-4/5 py-9 flex justify-center items-center">
				<Xterm />
			</div>
		</div>

		<div
			class="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-12 py-12 px-6 items-center"
		>
			<div class="col-span-4 lg:col-span-2 2xl:col-span-4 text-center flex flex-col">
				<span
					class="text-primary-600 lg:col-span-2 text-center whitespace-nowrap pb-4 text-4xl lg:text-5xl 
					font-semibold"
				>
					How does it work?
				</span>
				<span class="text-lg text-slate-700 w-96 lg:w-full"
					>A step by step description on how a layer is pushed to OpenRegistry</span
				>
			</div>

			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl 
				bg-slate-100 p-4 aspect-square max-w-[420px]"
			>
				<LaboratoryIcon />
				<span class="text-center text-primary-600 text-base lg:text-lg"
					>The container image subitted by user is divided into 1 or more layers depending on a few
					factors like size.</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 1</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl 
				bg-slate-100 p-4 aspect-square max-w-[420px]"
			>
				<LayersIcon />
				<span class="text-center text-primary-600 text-base lg:text-lg"
					>The layers are further divided into blobs and sequentially uploaded to the storage
					backend of user's preference like IPFS or Storj</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 2</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl 
				bg-slate-100 p-4 aspect-square max-w-[420px]"
			>
				<CloudIcon />
				<span class="text-center text-primary-600 text-base lg:text-lg"
					>A resolver component uploads the blobs to IPFS/Stoj and brings back the content hash
					which is mapped to the container image</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 3</span>
			</div>
			<div
				class="rounded border-2 border-primary-100 flex flex-col items-center justify-center shadow-2xl 
				bg-slate-100 p-4 aspect-square max-w-[420px]"
			>
				<ConfirmIcon />
				<span class="text-center text-primary-600 text-base lg:text-lg"
					>Once all the blobs for a layer are recieved,a digest is calculated which is used with
					content hash while retrival of the layer</span
				>
				<span class="text-3xl font-bold text-primary-500 mt-3">step 4</span>
			</div>
		</div>
	</Card>
</div>
{#if showSignUpForm}
	<Dialog class="top-0">
		<Signup toggleSignInForm={() => {}} toggleSignUpForm={handleSignupForm} />
	</Dialog>
{/if}
