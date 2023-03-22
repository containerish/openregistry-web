<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonSolid from './button-solid.svelte';
	import { Signin, Signup } from '$lib/components';
	import Dialog from '$lib/dialog.svelte';
	import Logo from './components/logo.svelte';
	export let openSignInModal = false;
	export let openSignUpModal = false;

	const toggleSignIn = () => {
		openSignUpModal = false;
		openSignInModal = !openSignInModal;
	};
	const toggleSignUp = () => {
		openSignInModal = false;
		openSignUpModal = !openSignUpModal;
	};
</script>

<header class="sticky top-0 z-50 bg-primary-50">
	<nav class="px-16 pt-3 pb-2 max-w-[2500px] mx-auto">
		<div class="flex w-full items-center justify-between ">
			<div
				on:keydown={() => {}}
				on:click={() => goto('/')}
				class="flex cursor-pointer items-center"
			>
				<Logo type="dark" />
			</div>
			<div class="flex items-center">
				<div class="flex flex-col md:mx-1 md:flex-row gap-1 md:gap-9">
					<a
						rel="noreferrer"
						class="transform text-base tracking-wide text-primary-600 duration-500 hover:scale-125"
						href="https://blog.openregistry.dev"
						target="_blank"
					>
						Blog
					</a>

					<a
						class="transform text-base tracking-wide text-primary-600 duration-500 hover:scale-125"
						href="/about"
					>
						About
					</a>
					<a
						rel="noreferrer"
						class="transform text-base tracking-wide text-primary-600 duration-500 hover:scale-125"
						href="https://github.com/containerish/OpenRegistry.git"
						target="_blank"
					>
						Github
					</a>
					<a
						class="transform text-base tracking-wide text-primary-600 duration-500 hover:scale-125"
						href="/faq"
					>
						FAQ
					</a>
				</div>
				<div class="hidden md:flex ml-5">
					<ButtonSolid on:click={toggleSignIn}>Sign In</ButtonSolid>
				</div>
				<div>
					<Dialog isOpen={openSignInModal}>
						<Signin toggleSignUpForm={toggleSignUp} toggleSignInForm={toggleSignIn} />
					</Dialog>
				</div>
				<Dialog isOpen={openSignUpModal} styles="top-0">
					<Signup toggleSignUpForm={toggleSignUp} toggleSignInForm={toggleSignIn} />
				</Dialog>
			</div>
		</div>
	</nav>
</header>
