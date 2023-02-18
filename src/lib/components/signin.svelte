<script lang="ts">
	import ButtonOutlined from '../button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { GithubIcon, FingerprintIcon, EmailIcon } from '$lib/icons';
	import { createEventDispatcher, getContext } from 'svelte';
	import { Auth } from '$apis/auth';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Textfield from '$lib/textfield.svelte';
	import Logo from './logo.svelte';
	import { WebAuthnSignInSchema } from '$lib/formSchemas';
	import { ZodError } from 'zod';

	export let toggleSignUpForm: () => void;
	export let toggleSignInForm: () => void;
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

	type WebAuthnFieldErrors = {
		[x: string]: string[] | undefined;
	};

	let isWebAuthN: boolean = false;
	const handleIsWebAuthn = () => {
		isWebAuthN = !isWebAuthN;
	};

	let webAuthnFieldErrors: WebAuthnFieldErrors | null;
	let webAuthnFormErrors: string[] | null;
	const webAuthnSignIn = async (e: SubmitEvent) => {
		e.preventDefault();
		const formdata = Object.fromEntries(new FormData(e.target as HTMLFormElement));

		isLoading = true;
		try {
			const body = WebAuthnSignInSchema.parse(formdata);
			webAuthnFieldErrors = null;
			webAuthnFormErrors = null;
			const username = body.username;
			const { error, data, status, headers } = await auth.WebAuthNBeginLogin(username);
			if (error) {
				isLoading = false;
				webAuthnFormErrors = [error.message];
				return;
			}

			isLoading = false;

			if (status === 200) {
				console.log('status from webauth:', headers);
				goto('/repositories', { invalidateAll: true });
				return;
			}
		} catch (err) {
			if (err instanceof ZodError) {
				const zError = err.flatten();
				webAuthnFieldErrors = zError.fieldErrors;
				webAuthnFormErrors = [...zError.formErrors];
			}
		}
	};
</script>

<svelte:head>
	<title>Sign in | OpenRegistry</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-sm overflow-hidden lg:max-w-4xl">
	<div class="flex w-full flex-col px-6 py-8 lg:w-full laptop:w-full laptop:py-4">
		<div class="mb-8 flex justify-center py-4 laptop:mb-6 laptop:py-1 desktop:mb-6 desktop:py-1">
			<Logo type="dark" />
		</div>

		<ButtonOutlined onClick={auth.LoginWithGithub}>
			<GithubIcon styles="text-black mr-2 h-8 w-8" />
			Sign in with Github
		</ButtonOutlined>
		<div class="mt-4" />

		{#if !showForgotPasswordForm && !isWebAuthN}
			<ButtonOutlined onClick={handleIsWebAuthn}>
				<FingerprintIcon styles="text-black mr-2" />
				Sign in using Security key
			</ButtonOutlined>

			<div class="mt-4 flex items-center justify-between">
				<span class="w-1/5 border-b lg:w-1/4" />

				<span
					class="text-center text-sm capitalize text-slate-600 hover:no-underline laptop:text-xs desktop:text-xs"
				>
					or sign in with email
				</span>
				<span class="w-1/5 border-b lg:w-1/4" />
			</div>
			<form
				class="mt-2 flex flex-col gap-4"
				method="POST"
				action="?/signin"
				use:enhance={handleSignInSubmit}
			>
				<div class="">
					<Textfield
						errors={$page.form?.errors?.email}
						name="email"
						label="Email"
						type="text"
						value={$page.form?.data?.email || ''}
					/>
				</div>
				<div class="">
					<Textfield
						errors={$page.form?.errors?.password}
						name="password"
						label="Password"
						type="password"
						value={password}
					/>
				</div>

				{#if $page.form?.formErrors && $page.form?.formErrors.length}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-red-600">
							{$page.form?.formErrors[0]}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>
					<ButtonOutlined onClick={toggleSignInForm}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}

		{#if isWebAuthN}
			<ButtonOutlined onClick={handleIsWebAuthn}>
				<EmailIcon styles="text-black mr-2" />
				Sign in using Email Password
			</ButtonOutlined>

			<form on:submit={webAuthnSignIn}>
				<div class="mt-4">
					<Textfield
						errors={webAuthnFieldErrors?.username}
						name="username"
						label="Username"
						type="text"
						value={$page.form?.data?.username || ''}
					/>
				</div>

				{#if webAuthnFormErrors && webAuthnFormErrors.length > 0}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-red-600">
							{webAuthnFormErrors[0]}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>

					<ButtonOutlined onClick={toggleSignInForm}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}

		{#if showForgotPasswordForm}
			<form method="POST" id="reset_password">
				<div class="mt-4">
					{#if !formMsg}
						<div class="flex items-center px-2">
							<label for="reset_password" class="block text-sm font-semibold text-gray-800">
								Email
							</label>
						</div>
						<input
							on:input={(e) => validateEmail(e)}
							name="reset_password"
							bind:value={email}
							placeholder="Email"
							class="form-control m-0 block w-full rounded-md border border-solid border-brown-300 bg-white 
							bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 placeholder-gray-500 transition 
							ease-in-out focus:border-brown-100 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring focus:ring-brown-800 focus:ring-opacity-40"
						/>
						{#if emailErr}
							<div class="w-full pt-1 text-center capitalize">
								<span class="text-center text-xs font-semibold uppercase text-red-600">
									{emailErr}
								</span>
							</div>
						{/if}
					{/if}
				</div>

				{#if formErr}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-red-600">
							{formErr}
						</span>
					</div>
				{/if}

				{#if formMsg}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-green-600">
							{formMsg}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid disabled={!!emailErr} onClick={handleForgotPassword} {isLoading}>
						Submit
					</ButtonSolid>
					<ButtonOutlined onClick={toggleSignInForm}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}
		<div class="mt-4 flex w-full items-center justify-center gap-4">
			<span
				on:click={toggleSignUpForm}
				on:keypress={toggleSignUpForm}
				class="m-0 cursor-pointer border-none text-sm font-semibold uppercase 
				text-slate-700 no-underline antialiased hover:underline half:text-sm laptop:text-sm desktop:text-xs"
			>
				sign up
			</span>
			<span class="">|</span>
			<span
				on:click={() => (showForgotPasswordForm = true)}
				on:keypress={() => (showForgotPasswordForm = true)}
				class="m-0 cursor-pointer border-none text-sm font-semibold 
				uppercase text-slate-700 no-underline antialiased hover:underline half:text-xs laptop:text-xs desktop:text-xs"
			>
				Forgot password?
			</span>
		</div>
	</div>
</div>
