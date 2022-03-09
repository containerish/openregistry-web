<script lang="ts">
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	import NavbarDefault from './navbar-default.svelte';
	import Textfield from './textfield.svelte';

	export let session: any;

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
	};

	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

<header
	class="bg-gradient-to-r from-brown-50 to-brown-500 {session?.authenticated ? 'py-4' : 'pt-8'}"
>
	<nav class="uw:max-w-[70vw] apple:max-w-[100vw] px-16 mx-auto">
		<div class="container px-6 mx-auto half:px-1 uw:px-12">
			<div class="flex flex-col md:justify-between md:items-center">
				<div
					class="flex {session?.authenticated
						? 'apple:justify-start'
						: ''} items-center justify-between w-full"
				>
					<div class="cursor-pointer flex items-center half:ml-5">
						<picture class="md:w-44" on:click={() => goto('/')}>
							<img class="h-full w-full" src="/logo.svg" alt="opener" />
						</picture>

						<!-- Search input on desktop screen -->
						<div class="hidden mx-10 pt-2 md:block half:hidden">
							{#if session?.authenticated}
								<Textfield name="auto-complete" label="" placeholder="Seach..." type="" />
							{/if}
						</div>
					</div>
					<NavbarDefault />
				</div>
			</div>
		</div>
	</nav>
</header>
