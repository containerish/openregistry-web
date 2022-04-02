<script lang="ts">
	import Button from '../lib/button.svelte';
	import Textfield from '../lib/textfield.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { Auth } from '../apis/auth';

	const toggleSignupForm = getContext<VoidFunction>('toggleSignUpForm');
	const toggleModal = getContext<VoidFunction>('toggleSignInForm');
	let isLoading = false;

	const auth = new Auth();
	const dispatch = createEventDispatcher();
	let emailErr: string;
	let passwordErr: string;
	let formErr: string;
	let email: string;

	const validateEmail = (e: any) => {
		formErr = undefined;
		const email: string = e.target.value;
		const regexp = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		const regexFailed = regexp.test(email);
		// minimum length for email is 3 chars
		if (!email || email.length < 3 || !regexFailed) {
			emailErr = 'email is invalid';
			return false;
		}

		emailErr = '';
		return true;
	};

	const validatePassword = (e: any) => {
		const pwd: string = e.target.value;

		formErr = undefined;

		const regexp = new RegExp(/^[ A-Za-z0-9]*$/);
		if (!pwd || pwd.length < 8 || regexp.test(pwd)) {
			passwordErr = 'password must be alphanumeric and atleast 8 characters long';
			return;
		}

		passwordErr = '';
	};

	let showForgotPasswordForm = false;
	let formMsg: string;
	const handleForgotPassword = async (e: any) => {
		// dont know why, but this is the way
		e.preventDefault();
		if (!email || email === '') {
			emailErr = 'email is a required field';
			return;
		}

		const { error, data } = await auth.ForgotPassword(email);
		if (error) {
			formErr = error.message;
			return;
		}

		formMsg = data.message;
		email = '';
		formErr = '';
	};

	const onClickSignIn = async (e: any) => {
		isLoading = true;
		const email = e.target.email.value;
		const password = e.target.password.value;

		if (email === '' || password === '') {
			isLoading = false;
			emailErr = 'email is a required field';
			passwordErr = 'password is a required field';
			return;
		}

		const { error, status } = await auth.Login(email, password);
		/* const { error, status } = await auth.Login('buggu@jsdp.dev', 'Qwerty@123'); */
		if (error) {
			isLoading = false;
			formErr = error.message;
			return;
		}

		isLoading = false;
		if (status === 200) {
			dispatch('success');
		}
	};
</script>

<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg lg:max-w-4xl">
	<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py4 mb-8">
			<picture>
				<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg" />
			</picture>
		</div>

		<button
			on:click={auth.LoginWithGithub}
			class="w-full h-12 flex bg-gray-100 items-center justify-center mt-4 text-gray-800 border-2 border-black
			transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:no-underline"
		>
			<span class="w-5/6 pr-7 font-semibold text-center">Sign in with GitHub</span>
		</button>

		<div class="flex items-center justify-between mt-4">
			<span class="w-1/5 border-b lg:w-1/4" />

			<span
				href="#"
				class="text-xs font-semibold text-center text-gray-600 uppercase hover:no-underline"
			>
				or sign in with email
			</span>

			<span class="w-1/5 border-b lg:w-1/4" />
		</div>
		{#if !showForgotPasswordForm}
			<form on:submit|preventDefault={(e) => onClickSignIn(e)}>
				<div class="mt-4">
					<Textfield
						error={emailErr}
						onInput={(e) => validateEmail(e)}
						name="email"
						label="Email Address"
						type="email"
					/>
				</div>
				<div class="mt-4">
					<Textfield
						error={passwordErr}
						onInput={(e) => validatePassword(e)}
						name="password"
						label="Password"
						type="password"
					/>
				</div>

				{#if formErr}
					<div class="w-full pt-1 capitalize text-center">
						<span class="text-xs font-semibold text-center text-red-600 uppercase">
							{formErr}
						</span>
					</div>
				{/if}

				<div class="flex mt-4 w-full">
					<Button
						disabled={!!emailErr || !!passwordErr}
						onClick={onClickSignIn}
						{isLoading}
						styles="text-gray-50 w-full mr-2 disabled:cursor-not-allowed disabled:bg-opacity-20"
						label="Sign In"
					/>
					<Button
						onClick={toggleModal}
						styles="bg-gray-50 text-gray-800 w-2/3 ml-2"
						label="Close"
					/>
				</div>
			</form>
		{/if}

		{#if showForgotPasswordForm}
			<form on:submit|preventDefault={(e) => handleForgotPassword(e)}>
				<div class="mt-4">
					{#if !formMsg}
						<div class="flex items-center px-2">
							<label for="reset_password" class="block font-semibold text-sm text-gray-800">
								Email
							</label>
						</div>
						<input
							on:input={(e) => validateEmail(e)}
							name="reset_password"
							bind:value={email}
							placeholder="Email"
							class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
						/>
						{#if emailErr}
							<div class="w-full pt-1 capitalize text-center">
								<span class="text-xs font-semibold text-center text-red-600 uppercase">
									{emailErr}
								</span>
							</div>
						{/if}
					{/if}
				</div>

				{#if formErr}
					<div class="w-full pt-1 capitalize text-center">
						<span class="text-xs font-semibold text-center text-red-600 uppercase">
							{formErr}
						</span>
					</div>
				{/if}

				{#if formMsg}
					<div class="w-full pt-1 capitalize text-center">
						<span class="text-xs font-semibold text-center text-green-600 uppercase">
							{formMsg}
						</span>
					</div>
				{/if}

				<div class="flex mt-4 w-full">
					<Button
						disabled={!!emailErr}
						onClick={handleForgotPassword}
						{isLoading}
						styles="text-gray-50 w-full mr-2 disabled:cursor-not-allowed disabled:bg-opacity-20"
						label="Submit"
					/>
					<Button
						onClick={toggleModal}
						styles="bg-gray-50 text-gray-800 w-2/3 ml-2"
						label="Close"
					/>
				</div>
			</form>
		{/if}

		<div class="flex items-center w-full justify-center gap-4 mt-4">
			<span
				on:click={() => toggleSignupForm()}
				class="text-xs cursor-pointer underline m-0 border-none font-semibold text-gray-700 uppercase hover:underline"
			>
				sign up
			</span>
			<span class="border-2">|</span>
			<span
				on:click={() => (showForgotPasswordForm = true)}
				class="text-xs cursor-pointer underline m-0 border-none font-semibold text-gray-700 uppercase hover:underline"
			>
				Forgot password?
			</span>
		</div>
	</div>
</div>
