<script>
	import Button from '../lib/button.svelte';
	import Textfield from '../lib/textfield.svelte';
	import { getContext } from 'svelte';

	const toggleSignupForm = getContext('toggleSignUpForm');
	const toggleSignInForm = getContext('toggleSignInForm');
	let isLoading = false;
	let isSignUpForm = false;

	const renderSignUpForm = () => {
		isSignUpForm = !isSignUpForm;
		toggleSignupForm();
	};

	const onClickSignIn = () => {
		isLoading = true;
		let client_id = 'ef57d82fbc5d0eede417';
		window.location.href = `https://github.com/login/oauth/authorize/?client_id=${client_id}&redirect_uri=http://localhost:5000/auth/github/callback&scope=user:email&state=skljdfkljsdjfklj`;
	};
</script>

<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg dark:bg-brown-900 lg:max-w-4xl">
	<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py4 mb-8">
			<picture>
				<source srcset="/logo-light.svg" media="(prefers-color-scheme: dark)" />
				<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg" />
			</picture>
		</div>

		<button
			on:click={onClickSignIn}
			class="w-full h-12 flex bg-gray-100 items-center justify-center mt-4 text-gray-800 border-2 border-black transition-colors duration-200 transform rounded-md dark:border-brown-900 dark:bg-brown-800 dark:text-gray-200 hover:bg-gray-200 hover:no-underline dark:hover:bg-brown-600"
		>
			<span class="w-5/6 pr-7 font-semibold text-center">Sign in with GitHub</span>
		</button>

		<div class="flex items-center justify-between mt-4">
			<span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />

			<span
				href="#"
				class="text-xs text-center text-gray-600 uppercase dark:text-gray-300 hover:no-underline"
			>
				or login with email
			</span>

			<span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
		</div>
		<form>
			<div class="mt-4">
				<Textfield label="Email Address" type="email" />
			</div>
			<div class="mt-4">
				<Textfield label="Password" type="password" />
			</div>
		</form>
		<div class="flex mt-8 w-full">
			<Button
				{isLoading}
				onClick={onClickSignIn}
				styles="text-gray-50 w-full mr-2"
				label="Sign In"
			/>
			<Button
				onClick={toggleSignInForm}
				styles="bg-gray-50 text-gray-800 w-2/3 ml-2"
				label="Close"
			/>
		</div>

		<div class="flex items-center justify-between mt-4">
			<span class="w-1/5 border-b dark:border-gray-700 md:w-1/4" />
			<a
				on:click={() => toggleSignupForm()}
				href="#"
				class="text-xs text-gray-700 uppercase dark:text-gray-400 hover:underline">or sign up</a
			>
			<span class="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
		</div>
	</div>
</div>
