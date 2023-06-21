<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { GithubIcon, FingerprintIcon, ArrowLeftIcon } from '$lib/icons';
	import { onMount } from 'svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Textfield from '$lib/textfield.svelte';
	import { fly } from 'svelte/transition';
	import { WebAuthnSignInSchema } from '$lib/formSchemas';
	import { ZodError } from 'zod';
	import type { WebAuthnState } from '$lib/types/webauthn';
	import { env } from '$env/dynamic/public';
	import IconButton from '$lib/icon-button.svelte';
	import { OpenRegistryClient } from '$lib/client/openregistry';

	let isLoading = false;
	let emailErr: string;
	let email = $page.form?.data?.email as string;
	let password = $page.form?.data?.password as string;
	let showForgotPasswordForm = false;
	let formMsg: string;
	let forgotPwdMessage = '';

	const handleForgotPassword: SubmitFunction = () => {
		isLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					forgotPwdMessage = result.data?.message ?? 'Please check your inbox';
					isLoading = false;
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
					break;
				default:
					await update();
			}
			isLoading = false;
		};
	};

	let isSigninDisabled = false;
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
					isSigninDisabled = true;
					break;
				case 'error':
					// handle server side error here
					await update();
					await applyAction(result);
					isSigninDisabled = true;
					break;
				default:
					await update();
			}
			isLoading = false;
		};
	};
	let isWebAuthN = false;
	const handleIsWebAuthn = () => {
		isWebAuthN = !isWebAuthN;
	};

	let webAuthnForm: WebAuthnState = {
		fieldErrors: {},
		formErrors: []
	};

	const webAuthnSignIn = async (e: SubmitEvent) => {
		isLoading = true;
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

		try {
			const body = WebAuthnSignInSchema.parse(formData);
			const username = body.username;
			const openRegistry = new OpenRegistryClient(fetch);
			const resp = await openRegistry.webAuthnLogin(username);
			if (resp.error) {
				webAuthnForm.formErrors = [resp.error.message];
				isLoading = false;
				return;
			}
			isLoading = false;
			goto('/repositories', { invalidateAll: true });
			return;
		} catch (err) {
			console.log('error in webauthn login: ', err);
			if (err instanceof ZodError) {
				isLoading = false;
				const zError = err.flatten();
				webAuthnForm.fieldErrors = zError.fieldErrors;
				webAuthnForm.formErrors = [...zError.formErrors];
				return;
			}
            webAuthnForm.formErrors = [(err as Error).message]
			isLoading = false;
		}
	};

	const handleBackToMain = () => {
		showForgotPasswordForm = false;
		isWebAuthN = false;
	};
	onMount(() => {
		isWebAuthN = $page.url.searchParams.get('method') === 'webauthn';
	});
</script>

<svelte:head>
	<title>Sign in | OpenRegistry</title>
</svelte:head>

<div class="flex flex-col md:flex-row w-full tall:my-20 my-6 md:my-0">
	<div class="hidden md:flex justify-center items-center md:w-1/2">
		<img src="/signin.png" alt="signInImage" class="py-20 px-9" />
	</div>
	<div
		class="md:w-1/2 flex items-center justify-center p-3 md:p-6"
		in:fly={{ y: 200, duration: 300 }}
	>
		<div
			class="flex w-full flex-col rounded-lg bg-white shadow-3xl px-9 md:px-11 py-6 max-w-[500px]"
		>
			{#if !showForgotPasswordForm && !isWebAuthN}
				<span class="text-start text-primary-500 text-3xl font-semibold">
					Log in to your account</span
				>
				<form
					class="mt-2 flex flex-col gap-4"
					method="POST"
					action="/auth/signin?/signin"
					use:enhance={handleSignInSubmit}
				>
					<div class="">
						<Textfield
							errors={$page.form?.errors?.email}
							name="email"
							label="Email"
							type="text"
							on:input={() => {
								isSigninDisabled = false;
							}}
							value={$page.form?.data?.email || ''}
						/>
					</div>
					<div class="">
						<Textfield
							errors={$page.form?.errors?.password}
							name="password"
							label="Password"
							type="password"
							on:input={() => {
								isSigninDisabled = false;
							}}
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
						<ButtonSolid disabled={isSigninDisabled} class="w-full" {isLoading}>
							Sign In
						</ButtonSolid>
					</div>

					<ButtonOutlined on:click={handleIsWebAuthn} class="gap-0">
						<FingerprintIcon class="text-slate-800 mr-2" />
						Sign in using Security key
					</ButtonOutlined>
					<ButtonOutlined
						class="gap-0"
						on:click={() =>
							window.open(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL + '/auth/github/login', '_self')}
					>
						<GithubIcon class="text-slate-800 mr-2 h-7 w-7" />
						Sign in with Github
					</ButtonOutlined>

					<div class="flex justify-start items-center gap-1">
						<span class="text-xs text-gray-500">Don't have an account?</span>
						<IconButton
							class="m-0 p-0 w-5 text-sm text-primary-500 underline"
							on:click={() => goto('/auth/signup')}
							on:keypress={() => goto('/auth/signup')}>Sign Up</IconButton
						>
					</div>
					<IconButton
						on:click={() => (showForgotPasswordForm = true)}
						on:keypress={() => (showForgotPasswordForm = true)}
						class="text-sm w-1 flex p-0 m-0 text-primary-500 underline self-start"
						>Forgot Password?</IconButton
					>
				</form>
			{/if}

			{#if isWebAuthN}
				<div class="flex flex-col justify-start items-start text-start mt-2">
					<span class="text-3xl text-primary-500 font-semibold">Login with WebAuthn</span>
				</div>
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

					<div class="mt-4 flex flex-col w-full items-center justify-center gap-3">
						<ButtonSolid class="w-full" {isLoading}>Sign In</ButtonSolid>
						<IconButton
							on:click={handleBackToMain}
							class="text-primary-400 text-sm w-full p-0 flex justify-center"
						>
							<ArrowLeftIcon class="h-4 w-4 text-primary-400" />
							Back to main
						</IconButton>
					</div>
				</form>
			{/if}

			{#if showForgotPasswordForm}
				<form
					method="POST"
					action="/auth/signin?/forgotPassword"
					id="reset_password"
					use:enhance={handleForgotPassword}
				>
					<div class="">
						{#if !formMsg}
							<div class="flex flex-col items-start gap-6 px-1">
								<div class="flex flex-col items-start gap-3">
									<span class="text-3xl text-primary-500 font-semibold">Forgot Password?</span>
									<span class="text-sm text-slate-600 text-start">
										Enter the email address associated with your account and we will send you a link
										to reset your password.
									</span>
								</div>

								<label for="reset_password" class="block text-sm font-semibold text-slate-600">
									Email*
								</label>
							</div>

							<Textfield errors={$page.form?.errors?.email} name="email" bind:value={email} />
						{/if}
					</div>

					{#if $page.form?.formErrors && $page.form?.formErrors.length}
						<div class="w-full pt-1 text-center">
							<span class="text-center text-xs font-semibold capitalize text-red-600">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}
					<div class="mt-9 flex w-full justify-center flex-col gap-3">
						{#if forgotPwdMessage}
							<span class=" text-emerald-700"
								>{forgotPwdMessage.charAt(0).toUpperCase() + forgotPwdMessage.slice(1)}</span
							>
						{/if}
						<ButtonSolid disabled={!!emailErr} {isLoading}>Submit</ButtonSolid>
						<IconButton
							on:click={handleBackToMain}
							class="text-primary-400 text-sm w-full p-0 flex justify-center"
						>
							<ArrowLeftIcon class="h-4 w-4 text-primary-400" />
							Back to main
						</IconButton>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
