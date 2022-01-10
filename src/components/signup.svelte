<script lang="ts">
	import Button from "../lib/button.svelte";
	import Textfield from "../lib/textfield.svelte";
	import { getContext } from 'svelte';

	const toggleSignUpForm: Function = getContext('toggleSignUpForm')
	const toggleSignInForm: Function = getContext('toggleSignInForm')
	let isLoading = false;

	const toggleModals = () => {
		toggleSignInForm();
		toggleSignUpForm();
	}

	const onClickSignUp = () => {
		isLoading = true;
			fetch('http://localhost:5000/auth/github/login', {redirect: 'follow'}).then(res => res.json()).then(res => {
		console.log("response from server: ", res)
			isLoading = false
		}).catch(err => {
			console.log('error: ', err.string())
		})
	}


</script>

<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg dark:bg-gray-800 lg:max-w-4xl">
	<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py-4 mb-8">
			<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg">
		</div>
		<a href="#" on:click={onClickSignUp} class="flex bg-gray-100 items-center justify-center mt-4 text-gray-800 border-2 border-black transition-colors duration-200 transform rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-200 hover:no-underline dark:hover:bg-gray-600">
			<div class="py-2">
				<svg class="w-8 h-8 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
				d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
				</path>
			</svg>
			</div>
			<span class="w-5/6 pr-7 font-bold text-center">Sign in with GitHub</span>
		</a>

		<div class="flex items-center justify-between mt-4">
			<span class="w-full border-b dark:border-gray-400"></span>
		</div>

		<div class="mt-4">
			<Textfield label="Username" type="email"/>
		</div>

		<div class="mt-4">
			<Textfield label="Email Address" type="email"/>
		</div>

		<div class="mt-4">
			<Textfield label="Password" type="password" />
		</div>

		<div class="mt-4">
			<Textfield label="Confirm Password" type="password" />
		</div>

		<div class="flex mt-8 w-full">
			<Button isLoading={isLoading} onClick={() => onClickSignUp()} styles="text-gray-50 w-full mr-2" label="Sign Up" />
			<Button onClick={toggleModals} styles="bg-gray-300 text-gray-800 w-2/3 ml-2" label="Close" />
		</div>
	</div>
</div>

<style>
</style>
