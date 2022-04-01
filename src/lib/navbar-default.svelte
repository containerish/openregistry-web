<script lang="ts">
	import Signin from '../components/signin.svelte';
	import Button from './button.svelte';
	import Modal from './modal.svelte';
	import Signup from '../components/signup.svelte';

	import { Auth } from '../apis/auth';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Autocomplete from './autocomplete.svelte';
	import { RegistryBackend } from '../apis/registry';

	export let pathname: string;
	export let openSignInModal: boolean;
	const auth = new Auth();
	const registry = new RegistryBackend();

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		openSignInModal = undefined;
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
		openSignInModal = false;
	};

	const handleAutoComplete = async (query: string) => {
		return await registry.SearchRepositories(query);
	};

	const redirectToRepositories = async () => {
		const { error, data } = await auth.GetUserWithSession();
		if (error) {
			console.error('error signin: ', error);
			return;
		}

		// @ts-ignore
		$session.user = data;
		// @ts-ignore
		$session.authenticated = true;
		goto('/repositories');
		return;
	};

	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

{#if pathname}
	<div class="w-1/3 pt-2 mx-10 justify-center items-center flex md:block half:hidden">
		<Autocomplete onAutoComplete={handleAutoComplete} />
	</div>
{/if}
<div class="items-center sm:flex">
	<div class="flex flex-row half:flex-col half:mr-5 mt-2 md:mt-0 md:mx-1">
		<a
			class="my-1 border-b-2 border-black no-underline hover:no-underline font-poppins text-md leading-5 text-brown-900
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
			href="https://blog.openregistry.dev"
			target="_blank">Blog</a
		>
		<a
			class="my-1 border-b-2 border-black no-underline hover:no-underline text-md leading-5 font-poppins text-[#241d19]
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
			href="/about">About</a
		>
		<a
			class="my-1 text-md border-b-2 border-black no-underline hover:no-underline font-poppins leading-5 text-[#241d19]
			duration-500 transform md:mx-4 md:my-0 uw:text-xl uw:leading-10"
			href="https://github.com/containerish/OpenRegistry.git"
			target="_blank">Github</a
		>
	</div>

	<div class="flex items-center py-2 -mx-1 sm:mx-0 uw:py-4 half:hidden">
		<Button onClick={() => toggleSignInForm()} styles="text-gray-50" label="Sign In" />
	</div>

	{#if showSignInForm || openSignInModal}
		<Modal>
			<Signin on:success={redirectToRepositories} />
		</Modal>
	{/if}

	{#if showSignUpForm}
		<Modal>
			<Signup />
		</Modal>
	{/if}
</div>
