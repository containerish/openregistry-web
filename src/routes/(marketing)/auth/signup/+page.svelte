<script lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { CheckIcon, EmailIcon, FingerprintIcon, GithubIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import confetti from 'canvas-confetti';
	var canvas = document.getElementById('confetti');
	let conf = confetti.create(canvas, { resize: true });
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { WebAuthnSignUpSchema } from '$lib/formSchemas';
	import { ZodError } from 'zod';
	import type { WebAuthnState } from '$lib/types/webauthn';
	import IconButton from '$lib/icon-button.svelte';
	import PlainCross from '$lib/icons/plain-cross.svelte';

	var count = 200;
	var defaults = {
		origin: { y: 0.7 }
	};

	const fire = (particleRatio: number, opts: Object) => {
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
		activeForm = 'signup-with-security-key';
		isWebAuthn = !isWebAuthn;
	};

	let isEmail: boolean = false;
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

	let activeForm: 'signup-with-email' | 'signup-with-security-key' | null = null;

	const webAuthNSignup = async (e: SubmitEvent) => {
		const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

		isLoading = true;
		try {
			const body = WebAuthnSignUpSchema.parse(formData);
			const username = body.username;
			const email = body.email;

			setTimeout(async () => {
				const { error, status, data } = await auth.WebAuthNBeginRegister(username, email);
				if (error || status !== 200) {
					console.error('error signup: ', status, error);
					webAuthnForm.formErrors = [error.message];
					isLoading = false;
					return;
				}

				isLoading = false;
				showSuccessMsg = true;
				successMessage = data.message;
				throwSomeConfetti();
				throwSomeConfetti();
			}, 1000);
		} catch (err) {
			if (err instanceof ZodError) {
				isLoading = false;
				const zError = err.flatten();
				webAuthnForm.fieldErrors = zError.fieldErrors;
				webAuthnForm.formErrors = [...zError.formErrors];
			}
		}
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

<div class="mx-auto p-3 md:p-6 mt-9 flex flex-col items-center tall:h-screen justify-between w-full overflow-hidden">
	<div class="flex w-full flex-col px-9 md:px-11 py-6 md:py-9 rounded-lg shadow-3xl gap-3 max-w-[500px] bg-white">
		<div class="flex justify-start items-start gap-3 py-4">
			<div class="flex flex-col gap-3 mx-1 text-start">
				<span class=" text-3xl text-primary-500 font-semibold">Create your account</span>
				<span class="text-sm text-slate-700"
					>Become part of a Fully open source and decentralised Initiative</span
				>

				<IconButton class="m-0 p-0" on:click={toggleSignUpForm}>
					<PlainCross class="w-6 h-6 absolute top-0 right-0 m-2 text-primary-400" />
				</IconButton>
			</div>
		</div>

		{#if activeForm === null}
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
			<form id="signup" method="POST" action="?/signup" use:enhance={handleSignUpSubmit}>
				<div class="mt-4">
					<Textfield
						onInput={validateUsername}
						errors={$page.form?.fieldErrors?.username}
						label="Username"
						type="text"
						name="username"
						value={$page.form?.data?.username ?? ''}
					/>
				</div>

				<div class="mt-4">
					<Textfield
						onInput={validateEmail}
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
					<ButtonSolid class="w-full" type="submit" {isLoading} on:click={() => {}}
						>Sign Up</ButtonSolid
					>
					<!-- <ButtonOutlined on:click={toggleSignUpForm}>Close</ButtonOutlined> -->
				</div>
			</form>
		{/if}

		{#if activeForm === 'signup-with-security-key'}
			<form id="webauthn" on:submit|preventDefault={(e) => webAuthNSignup(e)}>
				<div class="mt-4">
					<Textfield
						onInput={validateUsername}
						errors={webAuthnForm?.fieldErrors?.username}
						label="Username"
						type="text"
						name="username"
					/>
				</div>

				<div class="mt-4">
					<Textfield
						onInput={validateEmail}
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
					<ButtonSolid class="w-full" {isLoading} on:click={() => {}}>Sign Up</ButtonSolid>
					<!-- <ButtonOutlined on:click={toggleSignUpForm}>Close</ButtonOutlined> -->
				</div>
			</form>
			<ButtonOutlined on:click={handleBackToMain}>
				<EmailIcon class="text-slate-800 mr-2" />
				back to Sign up with Email
			</ButtonOutlined>
		{/if}

		{#if showSuccessMsg && activeForm === null}
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
    <img src="/plants.png" alt="plants">
</div>
