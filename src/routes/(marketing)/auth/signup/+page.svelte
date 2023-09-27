<script lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { ArrowLeftIcon, CheckIcon, FingerprintIcon, GithubIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import {type CreateTypes, type Options, create as createConfetti} from 'canvas-confetti';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { UserEmailSchema, WebAuthnSignUpSchema } from '$lib/formSchemas';
	import { ZodError } from 'zod';
	import type { WebAuthnState } from '$lib/types/webauthn';
	import { goto } from '$app/navigation';
	import IconButton from '$lib/icon-button.svelte';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { OpenRegistryClient } from '$lib/client/openregistry';

	let canvas: HTMLCanvasElement;
	let conf: CreateTypes;
	if (browser) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		canvas = document.getElementById('confetti') as HTMLCanvasElement;
		conf = createConfetti(canvas, { resize: true });
	}
	var count = 200;
	var defaults = {
		origin: { y: 0.7 }
	};

	const fire = (particleRatio: number, opts: Options) => {
		conf(
			Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio)
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

	let isLoading = false;
	let showSuccessMsg = false;
	const auth = new Auth();
	let usernameErr = '';
	let emailErr = '';
	let successMessage = '';
	let succccessDetail = '';

	let activeForm:
		| 'signup-with-email'
		| 'signup-with-security-key'
		| 'success-email'
		| 'success-webauthn'
		| null = 'signup-with-security-key';

	const handleSignUpSubmit: SubmitFunction = ({ formElement }) => {
		isLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					// await update();
					activeForm = 'success-email';
					formElement.reset();
					await update();
					successMessage = result.data?.message;
					showSuccessMsg = true;
					succccessDetail = 'Please check you inbox and verify your email before signing in';
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
                break;
				default:
					await update();
			}
			isLoading = false;
		};
	};

	let isWebAuthn = false;
	const handleIsWebAuthn = () => {
		activeForm = 'signup-with-security-key';
		isWebAuthn = !isWebAuthn;
	};

	let isEmail = false;
	const handleIsEmail = () => {
		activeForm = 'signup-with-email';
		isEmail = !isEmail;
	};

	const handleBackToMain = () => {
		activeForm = null;
	};

	let webAuthnForm: WebAuthnState = {
		fieldErrors: {},
		formErrors: []
	};

	const webAuthNSignup = async (e: SubmitEvent) => {
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
		isLoading = true;
		try {
			const body = WebAuthnSignUpSchema.parse(formData);
			const client = new OpenRegistryClient(fetch);
			const { message, error: err } = await client.webAuthnRegister(body);
			if (err) {
                console.log('webAuthnRegister error: ', err)
				webAuthnForm.formErrors = [err.message];
				isLoading = false;
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			successMessage = message!;
		} catch (err) {
            console.log('error webauthn signup:', err)
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
        goto('/auth/signin?method=webauthn')
	};

	const validateUsername = (e: Event) => {
		const username: string = (e.target as HTMLInputElement).value;

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

	const validateEmail = (e:  Event) => {
		const email: string = (e.target as HTMLInputElement).value

        const userEmail = UserEmailSchema.safeParse(email)
        if (!userEmail.success) {
			emailErr = 'invalid email format';
            return
        }

		emailErr = '';
	};

	const afterSignup = () => {
		const method = activeForm === 'success-email' ? 'email' : 'webauthn';
		goto('/auth/signin?method=' + method);
	};
</script>

<svelte:head>
	<title>Sign up | OpenRegistry</title>
</svelte:head>

<div
	class="mx-auto p-3 md:p-6 mt-9 flex flex-col items-center tall:h-screen justify-between w-full overflow-hidden"
>
	<div
		class="flex w-full flex-col px-9 md:px-11 py-6 md:py-9 rounded-lg shadow-3xl gap-3 max-w-[500px] bg-white"
		in:fly={{ y: 200, duration: 300 }}
	>
		{#if activeForm === null}
			<div class="flex justify-start items-start gap-3 py-4">
				<div class="flex flex-col gap-3 mx-1 text-start">
					<span class=" text-3xl text-primary-500 font-semibold">Create your account</span>
					<span class="text-sm text-slate-700"
						>Become part of a Fully open source and decentralised Initiative</span
					>
				</div>
			</div>
			<ButtonOutlined on:click={auth.LoginWithGithub}>
				<GithubIcon class="text-slate-800 mr-2 h-8 w-8" />
				Sign in with Github
			</ButtonOutlined>

			<ButtonOutlined on:click={handleIsWebAuthn}>
				<FingerprintIcon class="text-slate-800 mr-2" />
				Sign Up with Security key
			</ButtonOutlined>
			<ButtonSolid on:click={handleIsEmail}>Sign Up with Email</ButtonSolid>
		{/if}
		{#if activeForm === 'signup-with-email'}
			<div class="flex justify-start items-start gap-3 py-4">
				<div class="flex flex-col gap-3 mx-1 text-start">
					<span class=" text-3xl text-primary-500 font-semibold">Create your account</span>
					<span class="text-sm text-slate-700"
						>Become part of a Fully open source and decentralised Initiative</span
					>
				</div>
			</div>
			<form id="signup" method="POST" use:enhance={handleSignUpSubmit}>
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

				<div class="mt-8 flex flex-col gap-3 w-full justify-center items-center">
					<ButtonSolid class="w-full" type="submit" {isLoading}>Sign Up</ButtonSolid>
					<IconButton on:click={handleBackToMain} class="p-0 m-0 text-primary-300 text-sm w-full">
						<ArrowLeftIcon class="h-4 w-4 text-primary-400" />
						Back to main
					</IconButton>
				</div>
			</form>
		{/if}

		{#if activeForm === 'signup-with-security-key'}
			<div class="flex justify-start items-start gap-3 py-4">
				<div class="flex flex-col gap-3 mx-1 text-start">
					<span class=" text-3xl text-primary-500 font-semibold">Register with WebAuthn</span>
					<div>
						<span class="text-sm text-slate-700">
							WebAuthn is a smart way of authentication which eliminates the need of passwords and
							allows us to integrate with strong authenticators built into the devices like Windows
							Hello or Apple's Touch ID. Read more about
						</span>
						<a href="https://webauthn.io/" class="text-primary-400 text-sm underline">WebAuthn</a>
					</div>
				</div>
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
				{#if webAuthnForm.formErrors && webAuthnForm.formErrors.length > 0}
					<div class="w-full pt-1 text-center capitalize">
						<span class="text-center text-xs font-semibold uppercase text-rose-600">
							{webAuthnForm.formErrors[0]}
						</span>
					</div>
				{/if}

				<div class="mt-8 flex w-full space-x-8">
					<ButtonSolid class="w-full" {isLoading}>Sign Up</ButtonSolid>
				</div>
			</form>
			<IconButton on:click={handleBackToMain} class="p-0 m-0 text-primary-300 text-sm w-full">
				<ArrowLeftIcon class="h-4 w-4 text-primary-400" />
				Back to main
			</IconButton>
		{/if}

		{#if showSuccessMsg && (activeForm === 'success-email' || activeForm === 'success-webauthn')}
			<div class="flex h-full w-full flex-col items-center justify-center gap-4">
				<div id="confetti">
					<CheckIcon class="h-24 w-24 text-emerald-600" />
				</div>
				<span class="text-lg capitalize text-slate-700">{successMessage}</span>
				<span class="text-sm text-slate-700 text-center antialiased">{succccessDetail}</span>
				<div class="flex w-full flex-col items-center justify-center gap-3 px-4 text-center">
					<ButtonSolid class="w-full" on:click={afterSignup}>Sign In</ButtonSolid>
					<a href="/" class="text-primary-400 underline">Home</a>
				</div>
			</div>
		{/if}
	</div>
	<img src="/plants.png" alt="plants" />
</div>
