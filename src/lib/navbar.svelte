<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import Cookies from 'js-cookie';
	import Search from '$lib/icons/search.svelte';
	import NavbarAuth from './navbar-auth.svelte';
	import NavbarDefault from './navbar-default.svelte';
	import Logo from './icons/logo.svelte';

	let isLoading = false;
	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
	};

	let isAuth = getContext('isAuth');
	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

<header
	class="bg-gradient-to-r from-brown-50 to-brown-500 {isAuth()
		? 'py-4'
		: 'pt-8'}"
>
	<nav class="uw:max-w-[70vw] apple:max-w-[100vw] px-16 mx-auto">
		<div class="container px-6 mx-auto half:px-1 uw:px-12">
			<div class="flex flex-col md:justify-between md:items-center">
				<div
					class="flex {isAuth() ? 'apple:justify-start' : ''} items-center justify-between w-full"
				>
					<div class="cursor-pointer flex items-center half:ml-5">
						<picture class="md:w-44" on:click={() => (location.href = '/')}>
							<img class="h-full w-full" src="/logo.svg" alt="opener" />
						</picture>

						<!-- Search input on desktop screen -->
						<div class="hidden mx-10 pt-2 md:block half:hidden">
							{#if isAuth()}
								<div class="relative">
									<span class="absolute inset-y-0 left-0 flex items-center pl-3">
										<svg class="w-7 pt-0 pb-1 mt-0 h-6 text-gray-500" viewBox="0 0 24 24" fill="">
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
										class="w-80 py-2 pl-10 pr-4 text-gray-700 border rounded-md focus:border-brown-800
										focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-brown-300"
										placeholder="Search"
									/>
								</div>
							{/if}
						</div>
					</div>

					{#if isAuth()}
						<NavbarAuth />
					{:else}
						<NavbarDefault />
					{/if}
				</div>
			</div>
		</div>
	</nav>
</header>
