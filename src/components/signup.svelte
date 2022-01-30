<script lang="ts">
	import Button from '../lib/button.svelte';
	import Textfield from '../lib/textfield.svelte';
	import { getContext } from 'svelte';
	import Github from '$lib/github.svelte';
	import {SignupResponse,Auth} from "../apis/auth";

	const toggleSignUpForm: Function = getContext('toggleSignUpForm');
	const toggleSignInForm: Function = getContext('toggleSignInForm');
	let isLoading = false;

	const auth = new Auth()

	const toggleModals = () => {
		toggleSignInForm();
		toggleSignUpForm();
	};




	const handleSignup = (e) => {
		isLoading = true;
			auth.Signup(e.target.username.value, e.target.email.value, e.target.password.value).then((response: SignupResponse)  => {
				console.log('msg ', response.msg)
			}).catch(error => {
				console.log("error happened",error)
			})
			console.log(e.target.username.value, e.target.email.value, e.target.password.value)

	}

	const onClickSignUp = () => {
		isLoading = true;
		fetch('http://localhost:5000/auth/github/login', { redirect: 'follow' })
			.then((res) => res.json())
			.then((res) => {
				console.log('response from server: ', res);
				isLoading = false;
			})
			.catch((err) => {
				console.log('error: ', err.string());
			});
	};
</script>

<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg dark:bg-brown-900 lg:max-w-4xl">
	<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py-4 mb-8">
			<picture>
				<source srcset="/logo-light.svg" media="(prefers-color-scheme: dark)" />
				<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg" />
			</picture>
		</div>
		<a
			href="#"
			on:click={onClickSignUp}
			class="flex bg-gray-100 items-center justify-center mt-4 text-gray-800 border-2 border-black transition-colors duration-200 transform rounded-lg dark:border-brown-800 dark:text-gray-100 dark:bg-brown-800 hover:bg-gray-200 hover:no-underline dark:hover:bg-brown-800"
		>
			<div class="py-2 dark:bg-brown-800">
				<Github />
			</div>
			<span class="w-5/6 pr-7 font-bold text-center">Sign in with GitHub</span>
		</a>

		<div class="flex items-center justify-between mt-4">
			<span class="w-full border-b dark:border-gray-400" />
		</div>
		<form on:submit|preventDefault={e => handleSignup(e)}>
		<div class="mt-4">
			<Textfield label="Username" type="text" name="username"/>
		</div>

		<div class="mt-4">
			<Textfield label="Email Address" type="email" name="email"/>
		</div>

		<div class="mt-4">
			<Textfield label="Password" type="password" name="password"/>
		</div>

		<div class="mt-4">
			<Textfield label="Confirm Password" type="password" name="confirmPassword"/>
		</div>

		<div class="flex mt-8 w-full">
			<Button
				{isLoading}
				type="submit"
				styles="text-gray-50 w-full mr-2"
				label="Sign Up"
			/>
			<Button onClick={toggleModals} styles="bg-gray-50 text-gray-800 w-2/3 ml-2" label="Close" />
		</div>
		</form>
	</div>
</div>

<style>
</style>
