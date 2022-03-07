<script lang="ts">
	import Signin from '../components/signin.svelte';
	import Button from './button.svelte';
	import Modal from './modal.svelte';
	import Signup from '../components/signup.svelte';

	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import Cookies from 'js-cookie';

	const dispatch = createEventDispatcher();

	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm;
	};

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm;
		showSignUpForm = !showSignUpForm;
	};

	onMount(async () => {
		const cookie = Cookies.get('access');
		if (cookie) {
		}
	});

	const redirectToRepositories = () => {};
	setContext('toggleSignInForm', toggleSignInForm);
	setContext('toggleSignUpForm', toggleSignUpForm);
</script>

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

	{#if showSignInForm}
		<Modal>
			<Signin on:success={redirectToRepositories} />
		</Modal>
	{/if}

	{#if showSignUpForm}
		<Modal>
			<Signup on:success={redirectToRepositories} />
		</Modal>
	{/if}
</div>
