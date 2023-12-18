<script lang="ts">
	import ButtonSolid from '../button-solid.svelte';
	import ButtonOutlined from '../button-outlined.svelte';
	import Textfield from '../textfield.svelte';
	import { CheckIcon, EmailIcon, FingerprintIcon, GithubIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import confetti from 'canvas-confetti';
	var canvas = document.getElementById('confetti');
	let conf = confetti.create(canvas, { resize: true });
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Logo from './logo.svelte';
	import { WebAuthnSignUpSchema } from '$lib/formSchemas';
	import { ZodError } from 'zod';
	import type { WebAuthnState } from '$lib/types/webauthn';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import { env } from '$env/dynamic/public';
	import type { SubmitFunction } from '../../routes/(marketing)/auth/signup/$types';

	var count = 200;
	var defaults = {
		origin: { y: 0.7 },
	};

	const fire = (particleRatio: number, opts: Object) => {
		conf(
			Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio),
			})
		);
	};

	const throwSomeConfetti = () => {
		fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
		fire(0.45, { spread: 100, decay: 0.91, scalar: 0.8 });
		fire(0.25, { spread: 26, startVelocity: 55 });
		fire(0.35, { spread: 36, startVelocity: 40 });
		fire(0.2, { spread: 60 });
		fire(0.4, { spread: 40 });
		fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
		fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
		fire(0.2, { spread: 60 });
		fire(0.1, { spread: 120, startVelocity: 45 });
	};

	export let toggleSignUpForm: () => void;
	export let toggleSignInForm: () => void;
	let isLoading = false;
	let showSuccessMsg = false;
	const auth = new Auth();
	let usernameErr = '';
	let emailErr = '';
	let successMessage = '';

	const handleSignUpSubmit: SubmitFunction = ({ form }) => {
		isLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					// await update();
					form.reset();
					await update();
					successMessage = result.data?.message;
					showSuccessMsg = true;
					throwSomeConfetti();
					throwSomeConfetti();
					throwSomeConfetti();
					throwSomeConfetti();
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

	let isWebAuthn: boolean = false;
	const handleIsWebAuthn = () => {
		isWebAuthn = !isWebAuthn;
	};

	let webAuthnForm: WebAuthnState = {
		fieldErrors: {},
		formErrors: [],
	};

	const webAuthNSignup = async (e: SubmitEvent) => {
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
		isLoading = true;
		try {
			const body = WebAuthnSignUpSchema.parse(formData);
			const client = new OpenRegistryClient(fetch);
			const { message, error } = await client.webAuthnRegister(body);
			if (error) {
				webAuthnForm.formErrors = [error.message];
				isLoading = false;
				return;
			}
			successMessage = message!;
		} catch (err) {
			if (err instanceof ZodError) {
				isLoading = false;
				const zError = err.flatten();
				webAuthnForm.fieldErrors = zError.fieldErrors;
				webAuthnForm.formErrors = [...zError.formErrors];
				return;
			}
		}
		isLoading = false;
		showSuccessMsg = true;
		throwSomeConfetti();
		throwSomeConfetti();
	};

	const validateUsername = (e: any) => {
		const username: string = e.target.value;

		if (!username) {
			usernameErr = 'username is invalid';
			return;
		}

		if (username.length < 3) {
			usernameErr = 'username must be atleast 3 characters';
			return;
		}

		usernameErr = '';
	};

	const validateEmail = (e: any) => {
		const email: string = e.target.value;
		const regexp = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		const regexFailed = regexp.test(email);
		// minimum length for email is 3 chars
		if (!email || email.length < 3 || !regexFailed) {
			emailErr = 'email is invalid';
			return;
		}

		emailErr = '';
	};
</script>

<svelte:head>
	<title>Sign up | OpenRegistry</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-sm overflow-hidden">
	<div class="flex w-full flex-col px-3 py-3">
		<div class="pb-8 pt-4 flex justify-center">
			<Logo type="dark" />
		</div>
		{#if !showSuccessMsg}
			<ButtonOutlined on:click={auth.LoginWithGithub}>
				<GithubIcon class="text-black mr-2 h-8 w-8" />
				Sign in with Github
			</ButtonOutlined>
			<div class="mt-4" />

			{#if !isWebAuthn}
				<ButtonOutlined on:click={handleIsWebAuthn}>
					<FingerprintIcon class="text-black mr-2" />
					Sign up with Security key
				</ButtonOutlined>

				<div class="mt-4 flex items-center justify-between">
					<span class="w-1/5 border-b lg:w-1/4" />

					<span
						href="#"
						class="text-center text-xs font-semibold capitalize text-gray-600 hover:no-underline"
					>
						or sign up with email
					</span>

					<span class="w-1/5 border-b lg:w-1/4" />
				</div>

				<form id="signup" method="POST" action="?/signup" use:enhance={handleSignUpSubmit}>
					<div class="mt-4">
						<Textfield
							on:input={validateUsername}
							errors={$page.form?.fieldErrors?.username}
							label="Username"
							type="text"
							name="username"
							value={$page.form?.data?.username ?? ''}
						/>
					</div>

					<div class="mt-4">
						<Textfield
							on:input={validateEmail}
							errors={$page.form?.fieldErrors?.email}
							label="Email Address"
							type="email"
							name="email"
							value={$page.form?.data?.email}
						/>
					</div>

					<div class="mt-4">
						<Textfield
							errors={$page.form?.fieldErrors?.password}
							subHeading="alphanumeric and min 8 chars"
							label="Password"
							type="password"
							name="password"
							value={$page.form?.data?.password}
						/>
					</div>

					<div class="mt-4">
						<Textfield
							errors={$page.form?.fieldErrors?.confirmPassword}
							label="Confirm Password"
							type="password"
							name="confirmPassword"
							value={$page.form?.data?.confirmPassword}
						/>
					</div>

					{#if $page.form?.formErrors && $page.form?.formErrors.length}
						<div class="w-full pt-1 text-center capitalize">
							<span class="text-center text-xs font-semibold uppercase text-rose-600">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="mt-8 flex w-full justify-center space-x-8">
						<ButtonSolid type="submit" {isLoading} on:click={() => {}}>Sign Up</ButtonSolid>
						<ButtonOutlined on:click={toggleSignUpForm}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
			{#if isWebAuthn}
				<ButtonOutlined on:click={handleIsWebAuthn}>
					<EmailIcon class="text-black mr-2" />
					Sign up with Email Password
				</ButtonOutlined>

				<div class="mt-4 flex items-center justify-between">
					<span class="w-1/5 border-b lg:w-1/4" />

					<span class="text-center text-xs font-semibold capitalize text-gray-600 hover:no-underline">
						or sign up with email
					</span>

					<span class="w-1/5 border-b lg:w-1/4" />
				</div>

				<form id="webauthn" on:submit|preventDefault={(e) => webAuthNSignup(e)}>
					<div class="mt-4">
						<Textfield
							on:input={validateUsername}
							errors={webAuthnForm?.fieldErrors?.username}
							label="Username"
							type="text"
							name="username"
						/>
					</div>

					<div class="mt-4">
						<Textfield
							on:input={validateEmail}
							errors={webAuthnForm?.fieldErrors?.email}
							label="Email Address"
							type="email"
							name="email"
						/>
					</div>
					{#if $page.form?.formErrors && $page.form?.formErrors.length}
						<div class="w-full pt-1 text-center capitalize">
							<span class="text-center text-xs font-semibold uppercase text-rose-600">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="mt-8 flex w-full space-x-8">
						<ButtonSolid {isLoading} on:click={() => {}}>Sign Up</ButtonSolid>
						<ButtonOutlined on:click={toggleSignUpForm}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-start gap-4">
				<div id="confetti">
					<CheckIcon class="h-24 w-24 text-emerald-600" />
				</div>
				<span class="text-lg capitalize text-slate-700">{successMessage}</span>
				<span class="text-sm text-slate-700 antialiased"
					>Please check you inbox and verify your email before signing in</span
				>
				<div class="flex w-full flex-row items-center justify-center gap-3 px-4 text-center">
					<ButtonSolid on:click={toggleSignInForm}>Sign In</ButtonSolid>
					<ButtonOutlined on:click={toggleSignUpForm}>Close</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
