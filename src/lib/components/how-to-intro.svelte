<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Card from '$lib/card.svelte';
	import Xterm from '$lib/xterm.svelte';
	import { LaboratoryIcon, CloudIcon, ConfirmIcon, LayersIcon } from '$lib/icons';
	import { goto } from '$app/navigation';
	import Dialog from '$lib/dialog.svelte';
	import Signup from './signup.svelte';
	import Steps from './steps.svelte';
	let showSignUpForm = false;
	const handleSignupForm = () => {
		showSignUpForm = !showSignUpForm;
	};
</script>

<div class="bg-slate-100 relative bg-contain" style="background-image:url('/mesh.png');">
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

		<Steps/>
	</Card>
</div>
{#if showSignUpForm}
	<Dialog class="top-0">
		<Signup toggleSignInForm={() => {}} toggleSignUpForm={handleSignupForm} />
	</Dialog>
{/if}
