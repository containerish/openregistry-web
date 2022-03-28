<script lang="ts">
	import Button from '../lib/button.svelte';
	import Textfield from '../lib/textfield.svelte';
	import { getContext, createEventDispatcher } from 'svelte';
	import Github from '$lib/github.svelte';
	import { Auth } from '../apis/auth';

	const toggleSignUpForm: Function = getContext('toggleSignUpForm');
	const toggleSignInForm: Function = getContext('toggleSignInForm');
	let isLoading = false;

	const auth = new Auth();
	const dispatch = createEventDispatcher();

	const toggleModals = () => {
		toggleSignInForm();
		toggleSignUpForm();
	};

	let usernameErr = '';
	let emailErr = '';
	let passwordErr = '';
	let confirmPasswordErr = '';
	let password = '';
	let formErr = '';

	const onClickSignUpUser = async (e: any) => {
		const { error, status } = await auth.Signup(
			e.target.username.value,
			e.target.email.value,
			e.target.password.value
		);
		if (error || status !== 201) {
			console.error('error signup: ', status, error);
			return;
		}

		dispatch('success');
	};

	const loginWithGithub = () => {
		auth.LoginWithGithub();
	};

	const validateUsername = (e: any) => {
		const username: string = e.target.value;

		if (!username || username.length < 3) {
			usernameErr = 'invalid username';
			return;
		}

		usernameErr = '';
	};

	const validatePassword = (e: any) => {
		const pwd: string = e.target.value;

		if (!pwd || pwd.length < 8) {
			passwordErr = 'invalid password';
			return;
		}

		password = pwd;
		passwordErr = '';
	};

	const validateConfirmPassword = (e: any) => {
		const confirmPassword: string = e.target.value;

		if (confirmPassword !== password) {
			confirmPasswordErr = 'password and confirm password mismatch';
			return;
		}

		confirmPasswordErr = '';
	};

	const validateEmail = (e: any) => {
		const email: string = e.target.value;
		const regexp = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		const regexFailed = regexp.test(email);
		// minimum length for email is 3 chars
		if (!email || email.length < 3 || !regexFailed) {
			emailErr = 'invalid email';
			return;
		}

		emailErr = '';
	};
</script>

<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg lg:max-w-4xl">
	<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py-4 mb-8">
			<picture>
				<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg" />
			</picture>
		</div>
		<a
			href="#"
			on:click={loginWithGithub}
			class="flex bg-gray-100 items-center justify-center mt-4 text-gray-800 border-2 border-black transition-colors
			duration-200 transform rounded-lg hover:bg-gray-200 hover:no-underline"
		>
			<div class="py-2">
				<Github />
			</div>
			<span class="w-5/6 pr-7 font-bold text-center">Sign in with GitHub</span>
		</a>

		<div class="flex items-center justify-between mt-4">
			<span class="w-full border-b" />
		</div>
		<form on:submit|preventDefault={(e) => onClickSignUpUser(e)}>
			<div class="mt-4">
				<Textfield
					onInput={validateUsername}
					error={usernameErr}
					label="Username"
					type="text"
					name="username"
				/>
			</div>

			<div class="mt-4">
				<Textfield
					onInput={validateEmail}
					error={emailErr}
					label="Email Address"
					type="email"
					name="email"
				/>
			</div>

			<div class="mt-4">
				<Textfield
					error={passwordErr}
					onInput={validatePassword}
					subHeading="alphanumeric and min 8 chars"
					label="Password"
					type="password"
					name="password"
				/>
			</div>

			<div class="mt-4">
				<Textfield
					error={confirmPasswordErr}
					onInput={validateConfirmPassword}
					label="Confirm Password"
					type="password"
					name="confirmPassword"
				/>
			</div>

			{#if formErr.length > 0}
				<div class="mt-4 p-2 rounded-md bg-red-50">
					<span class="text-red-500">
						{formErr}
					</span>
				</div>
			{/if}

			<div class="flex mt-8 w-full">
				<Button {isLoading} type="submit" styles="text-gray-50 w-full mr-2" label="Sign Up" />
				<Button onClick={toggleModals} styles="bg-gray-50 text-gray-800 w-2/3 ml-2" label="Close" />
			</div>
		</form>
	</div>
</div>

<style>
</style>
