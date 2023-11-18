<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonSolid from './button-solid.svelte';
	import { Signin, Signup } from '$lib/components';
	import Dialog from '$lib/dialog.svelte';
	import Logo from './components/logo.svelte';
	import Menu from './burger-menu.svelte';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import IconButton from './icon-button.svelte';

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

	export let pathname = '/auth/signin';
</script>

<header class="sticky top-0 z-50 bg-primary-50">
	<nav class="px-1 md:px-16 pt-3 pb-2 max-w-[2500px] mx-auto">
		<div class="flex w-full items-center justify-between">
			<IconButton
				on:keyup={() => goto('/')}
				on:click={() => goto('/')}
				class="flex cursor-pointer items-center w-11 h-11 m-0 p-1"
			>
				<Logo type="dark" />
			</IconButton>
			<div class="md:hidden">
				<Menu>
					<div class="flex flex-col items-start">
						<MenuItem class="hover:bg-primary-100/20 hover:no-underline">
							<IconButton
								class="pr-16 pl-6 py-2 m-0 text-sm"
								on:click={() => {
									window.open('https://blog.openregistry.dev', '_blank');
								}}
							>
								Blog
							</IconButton>
						</MenuItem>
						<MenuItem class="hover:bg-primary-100/20 hover:no-underline">
							<IconButton
								class="pr-16 pl-6 py-2 m-0 text-sm"
								on:click={() => {
									window.open('/about', '_self');
								}}
							>
								About
							</IconButton>
						</MenuItem>
						<MenuItem class="hover:bg-primary-100/20 hover:no-underline">
							<IconButton
								class="pr-16 pl-6 py-2 m-0 text-sm"
								on:click={() => {
									window.open('https://github.com/containerish/OpenRegistry.git', '_blank');
								}}
							>
								Github
							</IconButton>
						</MenuItem>
						<MenuItem class="hover:bg-primary-100/20 hover:no-underline">
							<IconButton
								class="pr-16 pl-6 py-2 m-0 text-sm"
								on:click={() => {
									window.open('/faq', 'self');
								}}
							>
								FAQ
							</IconButton>
						</MenuItem>
						<MenuItem class="hover:bg-primary-100/20 hover:no-underline">
							<IconButton class="pr-16 pl-6 py-2 m-0 text-sm" on:click={() => goto('/auth/signin')}
								>Sign In</IconButton
							>
						</MenuItem>
					</div>
				</Menu>
			</div>

			<div class="hidden md:flex items-center">
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
				{#if pathname === '/' || pathname === '/auth/signup'}
					<div class="hidden md:flex ml-5">
						<ButtonSolid
							on:click={() => { goto('/auth/signin'); }}>Sign In</ButtonSolid>
					</div>
				{:else if pathname === '/auth/signin'}
					<div class="hidden md:flex ml-5">
						<ButtonSolid on:click={() => { goto('/auth/signup'); }}>Sign Up</ButtonSolid>
					</div>
				{/if}
				<!-- <div>
					<Dialog isOpen={openSignInModal}>
						<Signin toggleSignUpForm={toggleSignUp} toggleSignInForm={toggleSignIn} />
					</Dialog>
				</div>
				<Dialog isOpen={openSignUpModal} class="top-0">
					<Signup toggleSignUpForm={toggleSignUp} toggleSignInForm={toggleSignIn} />
				</Dialog> -->
			</div>
		</div>
	</nav>
</header>
