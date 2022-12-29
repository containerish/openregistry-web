<script lang="ts">
	import ButtonOutlined from '../button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { GithubIcon, FingerprintIcon } from '$lib/icons';
	import { createEventDispatcher, getContext } from 'svelte';
	import { Auth } from '$apis/auth';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Textfield from '$lib/textfield.svelte';

	const toggleSignupForm = getContext<VoidFunction>('toggleSignUpForm');
	const toggleModal = getContext<VoidFunction>('toggleSignInForm');
	let isLoading = false;

	const auth = new Auth();
	const dispatch = createEventDispatcher();
	let emailErr: string;
	let passwordErr: string;
	let formErr: string | undefined;
	let email = $page.form?.data?.email as string;
	let password = $page.form?.data?.password as string;
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

	const handleSignInSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					// await update();
					goto('/repositories');
					break;
				case 'failure':
					// handle error here
					await applyAction(result);
					await update();
					break;
				case 'error':
					// handle server side error here
					await update();
					await applyAction(result);
				default:
					await update();
			}
			isLoading = false;
		};
	};

	let isWebAuthN: boolean = false;
	const handleIsWebAuthn = () => {
		isWebAuthN = !isWebAuthN;
	};
	const webAuthnSignIn = async (e: any) => {
		e.preventDefault();
		isLoading = true;
		const email = e.target.username.value;
		const { error, status } = await auth.WebAuthNBeginLogin(email);
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
	<div class="flex flex-col w-4/5 px-6 py-8 md:px-8 lg:w-full">
		<div class="flex justify-center py-4 mb-8">
			<picture>
				<img class="" src="/logo.svg" alt="openregistry-logo.svg" />
			</picture>
		</div>

		<ButtonOutlined onClick={auth.LoginWithGithub}>
			<GithubIcon styles="text-brown-800 mr-2" />
			Sign in with Github
		</ButtonOutlined>
		<div class="mt-4" />

		{#if !showForgotPasswordForm && !isWebAuthN}
			<ButtonOutlined onClick={handleIsWebAuthn}>
				<FingerprintIcon styles="text-brown-800 mr-2" />
				Sign in using Security key
			</ButtonOutlined>

			<div class="flex items-center justify-between mt-4">
				<span class="w-1/5 border-b lg:w-1/4" />

				<span
					href="#"
					class="text-xs font-semibold text-center text-gray-600 capitalize hover:no-underline"
				>
					or sign in with email
				</span>
				<span class="w-1/5 border-b lg:w-1/4" />
			</div>
			<form method="POST" action="?/signin" use:enhance={handleSignInSubmit}>
				<div class="mt-4">
					<Textfield
						errors={$page.form?.errors?.email}
						name="email"
						label="Email"
						type="text"
						value={$page.form?.data?.email || ''}
					/>
				</div>
				<div class="mt-4">
					<Textfield
						errors={$page.form?.errors?.password}
						name="password"
						label="Password"
						type="password"
						value={password}
					/>
				</div>

				{#if $page.form?.formErrors && $page.form?.formErrors.length}
					<div class="w-full pt-1 capitalize text-center">
						<span class="text-xs font-semibold text-center text-red-600 uppercase">
							{$page.form?.formErrors[0]}
						</span>
					</div>
				{/if}

				<div class="flex mt-4 w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>
					<ButtonOutlined onClick={toggleModal}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}

		{#if isWebAuthN}
			<ButtonOutlined onClick={handleIsWebAuthn}>
				<FingerprintIcon styles="text-brown-800 mr-2" />
				Sign in using Email Password
			</ButtonOutlined>

			<form on:submit={(e) => webAuthnSignIn(e)}>
				<div class="mt-4">
					<Textfield name="username" label="Username" type="text" />
				</div>

				{#if formErr}
					<div class="w-full pt-1 capitalize text-center">
						<span class="text-xs font-semibold text-center text-red-600 uppercase">
							{formErr}
						</span>
					</div>
				{/if}

				<div class="flex mt-4 w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>

					<ButtonOutlined onClick={toggleModal}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}

		{#if showForgotPasswordForm}
			<form method="POST" id="reset_password">
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
							class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-700 
							bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 
							focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
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

				<div class="flex justify-center mt-4 w-full space-x-5">
					<ButtonSolid disabled={!!emailErr} onClick={handleForgotPassword} {isLoading}>
						Submit
					</ButtonSolid>
					<ButtonOutlined onClick={toggleModal}>Close</ButtonOutlined>
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
