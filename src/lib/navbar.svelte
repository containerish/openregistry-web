<script lang="ts">
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	import NavbarDefault from './navbar-default.svelte';
	import { session } from '$app/stores';

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
	};

	let sessionOk: boolean = true;
	// @ts-ignore
	session.subscribe(async ({ authenticated }) => {
		if (authenticated) sessionOk = false;
	});

	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

{#if sessionOk}
	<header class="bg-gradient-to-r from-brown-50 to-brown-500 pt-4">
		<nav class="uw:max-w-[70vw] apple:max-w-[100vw] px-16 mx-auto">
			<div class="container px-6 mx-auto half:px-1 uw:px-12">
				<div class="flex flex-col md:justify-between md:items-center">
					<div class="flex items-center justify-between w-full">
						<div class="cursor-pointer flex items-center half:ml-5">
							<picture class="md:w-44" on:click={() => goto('/')}>
								<img class="h-full w-full" src="/logo.svg" alt="opener" />
							</picture>
						</div>
						<NavbarDefault />
					</div>
				</div>
			</div>
		</nav>
	</header>
{/if}
