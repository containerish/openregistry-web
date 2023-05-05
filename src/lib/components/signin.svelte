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

	import type { WebAuthnState } from '$lib/types/webauthn';
	import { env } from '$env/dynamic/public';

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

	let webAuthnForm: WebAuthnState = {
		fieldErrors: {},
		formErrors: []
	};

	const webAuthnSignIn = async (e: SubmitEvent) => {
		const formdata = Object.fromEntries(new FormData(e.target as HTMLFormElement));

		isLoading = true;

		try {
			const body = WebAuthnSignInSchema.parse(formdata);
			const username = body.username;
			const { error, data, status, headers } = await auth.WebAuthNBeginLogin(username);
			if (error) {
				isLoading = false;
				webAuthnForm.formErrors = [error.message];
				return;
			}

			isLoading = false;

			if (status === 200) {
				goto('/repositories', { invalidateAll: true });
				return;
			}
		} catch (err) {
			if (err instanceof ZodError) {
				isLoading = false;
				const zError = err.flatten();
				webAuthnForm.fieldErrors = zError.fieldErrors;
				webAuthnForm.formErrors = [...zError.formErrors];
			}
		}
	};
</script>

<svelte:head>
	<title>Sign in | OpenRegistry</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-sm overflow-hidden">
	<div class="flex w-full flex-col px-3 py-3">
		<div class="pb-8 pt-4 flex justify-center">
			<Logo type="dark" />
		</div>

		<ButtonOutlined
			on:click={() =>
				window.open(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth/github/login', '_self')}
		>
			<GithubIcon class="text-black mr-2 h-8 w-8" />
			Sign in with Github
		</ButtonOutlined>
		<div class="mt-4" />

		{#if !showForgotPasswordForm && !isWebAuthN}
			<ButtonOutlined on:click={handleIsWebAuthn}>
				<FingerprintIcon class="text-black mr-2" />
				Sign in using Security key
			</ButtonOutlined>

			<div class="mt-4 flex items-center justify-between">
				<span class="w-1/5 border-b lg:w-1/4" />

				<span class="text-center text-xs lg:text-sm capitalize text-slate-600">
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
					<div class="w-full pt-1 text-center">
						<span class="text-center text-xs font-semibold capitalize text-rose-600">
							{$page.form?.formErrors[0]}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>
					<ButtonOutlined on:click={toggleSignInForm}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}

		{#if isWebAuthN}
			<ButtonOutlined on:click={handleIsWebAuthn}>
				<EmailIcon class="text-black mr-2" />
				Sign in using Email Password
			</ButtonOutlined>

			<form on:submit|preventDefault={webAuthnSignIn}>
				<div class="mt-4">
					<Textfield
						errors={webAuthnForm?.fieldErrors?.username}
						name="username"
						label="Username"
						type="text"
						value={$page.form?.data?.username || ''}
					/>
				</div>

				{#if webAuthnForm?.formErrors && webAuthnForm?.formErrors.length > 0}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-rose-600">
							{webAuthnForm.formErrors[0]}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid {isLoading}>Sign In</ButtonSolid>

					<ButtonOutlined on:click={toggleSignInForm}>Close</ButtonOutlined>
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

						<Textfield
							onInput={(e) => validateEmail(e)}
							name="reset_password"
							bind:value={email}
							placeholder="Email"
						/>
						{#if emailErr}
							<div class="w-full pt-1 text-center capitalize">
								<span class="text-center text-xs font-semibold uppercase text-rose-600">
									{emailErr}
								</span>
							</div>
						{/if}
					{/if}
				</div>

				{#if formErr}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-rose-600">
							{formErr}
						</span>
					</div>
				{/if}

				{#if formMsg}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-emerald-600">
							{formMsg}
						</span>
					</div>
				{/if}

				<div class="mt-4 flex w-full justify-center space-x-5">
					<ButtonSolid disabled={!!emailErr} on:click={handleForgotPassword} {isLoading}>
						Submit
					</ButtonSolid>
					<ButtonOutlined on:click={toggleSignInForm}>Close</ButtonOutlined>
				</div>
			</form>
		{/if}
		<div class="mt-4 flex w-full items-center justify-center gap-4">
			<span
				on:click={toggleSignUpForm}
				on:keypress={toggleSignUpForm}
				class="m-0 cursor-pointer border-none text-xs lg:text-sm font-semibold uppercase 
				text-slate-700 no-underline antialiased hover:underline"
			>
				sign up
			</span>
			<span class="">|</span>
			<span
				on:click={() => (showForgotPasswordForm = true)}
				on:keypress={() => (showForgotPasswordForm = true)}
				class="m-0 cursor-pointer border-none text-xs lg:text-sm font-semibold uppercase text-slate-700 
				antialiased hover:underline"
			>
				Forgot password?
			</span>
		</div>
	</div>
</div>
