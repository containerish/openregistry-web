<script lang="ts">
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	export let openSignInModal: boolean;

	import ButtonSolid from './button-solid.svelte';
	import Modal from './modal.svelte';
	import { Signin, Signup } from '$lib/components';

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		openSignInModal = false;
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
		openSignInModal = false;
	};

	// @ts-ignore
	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

<header class="bg-gradient-to-r from-brown-50 to-brown-500 pt-4">
	<nav class="uw:max-w-[70vw] apple:max-w-[100vw] px-16 mx-auto">
		<div class="container px-6 mx-auto half:px-1 uw:px-12">
			<div class="flex flex-col md:justify-between md:items-center">
				<div class="flex items-center justify-between w-full">
					<div
						on:keydown={() => {}}
						on:click={() => goto('/')}
						class="cursor-pointer flex items-center half:ml-5"
					>
						<picture class="md:w-44">
							<img class="h-full w-full" src="/logo.svg" alt="openeregistry" />
						</picture>
					</div>
					<div class="items-center sm:flex">
						<div class="flex flex-row half:flex-col half:mr-5 mt-2 md:mt-0 md:mx-1">
							<a
								rel="noreferrer"
								class="my-1 border-b-2 border-black no-underline hover:no-underline font-poppins text-md leading-5 text-brown-900
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
								href="https://blog.openregistry.dev"
								target="_blank"
							>
								Blog
							</a>
							<a
								class="my-1 border-b-2 border-black no-underline hover:no-underline text-md leading-5 font-poppins text-[#241d19]
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
								href="/about"
							>
								About
							</a>
							<a
								rel="noreferrer"
								class="my-1 text-md border-b-2 border-black no-underline hover:no-underline font-poppins leading-5 text-[#241d19]
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
								href="https://github.com/containerish/OpenRegistry.git"
								target="_blank"
							>
								Github
							</a>
							<a
								class="my-1 text-md border-b-2 border-black no-underline hover:no-underline font-poppins leading-5 text-[#241d19]
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
								href="/faq"
							>
								FAQ
							</a>
						</div>

						<div class="flex items-center py-2 -mx-1 sm:mx-0 uw:py-4 half:hidden">
							<ButtonSolid onClick={() => toggleSignInForm()}>Sign In</ButtonSolid>
						</div>

						{#if showSignInForm || openSignInModal}
							<Modal>
								<Signin />
							</Modal>
						{/if}

						{#if showSignUpForm}
							<Modal>
								<Signup />
							</Modal>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
