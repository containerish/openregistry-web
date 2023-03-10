<script lang="ts">
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	export let openSignInModal: boolean;

	import ButtonSolid from './button-solid.svelte';
	import Modal from './modal.svelte';
	import { Signin, Signup } from '$lib/components';
	import Dialog from '$lib/dialog.svelte';
	import Logo from './components/logo.svelte';
	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		openSignInModal = false;
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {''
		console.log('in signup func');
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
		openSignInModal = false;
	};

	// // @ts-ignore
	// setContext('toggleSignInForm', toggleSignInForm);
	// setContext('toggleSignUpForm', toggleSignUpForm);
</script>

<header class="sticky top-0 z-50 bg-primary-50 apple:pt-6">
	<nav class="mx-auto px-16 apple:max-w-[100vw] uw:max-w-[50vw]">
		<div class="container mx-auto px-1 sm:px-6 uw:px-12">
			<div class="flex flex-col md:items-center md:justify-between">
				<div class="flex w-full items-center justify-between">
					<div
						on:keydown={() => {}}
						on:click={() => goto('/')}
						class="flex cursor-pointer items-center sm:ml-5"
					>
						<Logo type="dark" />
					</div>
					<div class="flex items-center justify-center py-2">
						<div class="flex flex-col md:mx-1 md:mt-0 md:flex-row laptop:gap-3">
							<a
								rel="noreferrer"
								class="my-1 transform text-base leading-5 tracking-wider text-primary-600 duration-500
			hover:scale-125 md:mx-4 md:my-0 apple:text-lg uw:leading-10"
								href="https://blog.openregistry.dev"
								target="_blank"
							>
								Blog
							</a>

							<a
								class="my-1 transform text-base leading-5 tracking-wider text-primary-600 duration-500
			hover:scale-125 md:mx-4 md:my-0 apple:text-lg uw:leading-10"
								href="/about"
							>
								About
							</a>
							<a
								rel="noreferrer"
								class="my-1 transform text-base leading-5 tracking-wider text-primary-600 duration-500
			hover:scale-125 md:mx-4 md:my-0 apple:text-lg uw:leading-10"
								href="https://github.com/containerish/OpenRegistry.git"
								target="_blank"
							>
								Github
							</a>
							<a
								class="my-1 transform text-base leading-5 tracking-wider text-primary-600 duration-500
			hover:scale-125 md:mx-4 md:my-0 apple:text-lg uw:leading-10"
								href="/faq"
							>
								FAQ
							</a>
						</div>

						<div
							class="-mx-1 hidden md:flex items-center sm:mx-0 laptop:ml-2 desktop:mt-1 uw:py-4"
						>
							<ButtonSolid onClick={() => toggleSignInForm()}>Sign In</ButtonSolid>
						</div>

						{#if showSignInForm || openSignInModal}
							<div>
								<Dialog>
									<Signin {toggleSignUpForm} {toggleSignInForm} />
								</Dialog>
							</div>
						{/if}

						{#if showSignUpForm}
							<Dialog styles="top-0">
								<Signup {toggleSignUpForm} {toggleSignInForm} />
							</Dialog>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
