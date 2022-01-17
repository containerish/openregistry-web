<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import Search from '$lib/icons/search.svelte';
	import NavbarAuth from './navbar-auth.svelte';
	import NavbarDefault from './navbar-default.svelte';
	import Logo from './icons/logo.svelte';

	let isLoading = false;
	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
		console.log(showSignInForm);
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
		console.log(showSignInForm, showSignUpForm);
	};

	let isAuth = getContext<Function>('isAuth');
	let loggedIn = false;
	onMount(async () => {
		loggedIn = await isAuth(document.cookie);
	});

	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

<header
	class="bg-gradient-to-r from-brown-50 to-brown-500 dark:bg-brown-900 {isAuth
		? 'pt-2 dark:mt-4 dark:pt-0'
		: 'pt-8'}"
>
	<nav class="uw:max-w-[70vw] apple:max-w-[100vw] dark:bg-brown-900 px-16 mx-auto">
		<div class="container px-6 mx-auto uw:px-12">
			<div class="flex flex-col sm:flex-row md:justify-between md:items-center">
				<div
					class="flex {loggedIn ? 'apple:justify-start' : ''} items-center justify-between w-full"
				>
					<div class="cursor-pointer flex items-center">
						<picture on:click={() => (window.location.href = '/')}>
							<source srcset="/logo-light.svg" media="(prefers-color-scheme: dark)" />
							<img class="h-full w-full" src="/logo.svg" alt="opener" />
						</picture>

						<!-- Search input on desktop screen -->
						<div class="hidden mx-10 pt-2 md:block">
							{#if loggedIn}
								<div class="relative">
									<span class="absolute inset-y-0 left-0 flex items-center pl-3">
										<svg
											class="w-6 pt-0 pb-1 mt-0 h-6 text-gray-400"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</span>

									<input
										type="text"
										class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-cream-50 dark:text-gray-100 dark:border-gray-600 focus:border-blue-400 dark:focus:border-brown-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-brown-300"
										placeholder="Search"
									/>
								</div>
							{/if}
						</div>
					</div>

					{#if loggedIn}
						<NavbarAuth />
					{:else}
						<NavbarDefault />
					{/if}
				</div>
			</div>
		</div>
	</nav>
</header>
