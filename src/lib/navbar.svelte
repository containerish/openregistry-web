<script lang="ts">
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	import NavbarDefault from './navbar-default.svelte';
	import { userStore as session } from '$lib/userStore';
	import NavbarAuth from './navbar-auth.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	export let openSignInModal: boolean;
	export let data: PageData;

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
	};

	// @ts-ignore
	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

{#if !data.authenticated}
	<header class="bg-gradient-to-r from-brown-50 to-brown-500 pt-4">
		<nav class="uw:max-w-[70vw] apple:max-w-[100vw] px-16 mx-auto">
			<div class="container px-6 mx-auto half:px-1 uw:px-12">
				<div class="flex flex-col md:justify-between md:items-center">
					<div class="flex items-center justify-between w-full">
						<div on:click={() => goto('/')} class="cursor-pointer flex items-center half:ml-5">
							<picture class="md:w-44">
								<img class="h-full w-full" src="/logo.svg" alt="openeregistry" />
							</picture>
						</div>
						<NavbarDefault {openSignInModal} />
					</div>
				</div>
			</div>
		</nav>
	</header>
{:else}
	<NavbarAuth user={data.user}/>
{/if}