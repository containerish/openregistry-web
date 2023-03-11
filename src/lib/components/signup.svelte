<script lang="ts">
	import ButtonSolid from '../button-solid.svelte';
	import ButtonOutlined from '../button-outlined.svelte';
	import Textfield from '../textfield.svelte';
	import { CheckIcon, EmailIcon, FingerprintIcon, GithubIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import confetti from 'canvas-confetti';
	var canvas = document.getElementById('confetti');
	let conf = confetti.create(canvas, { resize: true });
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Logo from './logo.svelte';
	import { WebAuthnSignUpSchema } from '$lib/formSchemas';
	import User from '$lib/icons/user.svelte';
	import { ZodError } from 'zod';
	import type { WebAuthnState } from '$lib/types/webauthn';

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

	const toggleModals = () => {
		toggleSignInForm();
		toggleSignUpForm();
	};

	let usernameErr = '';
	let emailErr = '';
	let formErr: string;
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
		formErrors: []
	};

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

<div class="mx-auto flex w-full max-w-sm overflow-hidden rounded-lg lg:max-w-4xl">
	<div class="flex w-full flex-col px-6 py-8 md:px-8 lg:w-full laptop:w-full laptop:py-4">
		<div class="mb-8 flex justify-center py-4 laptop:mb-4 laptop:py-1">
			<Logo type="dark" />
		</div>
		{#if !showSuccessMsg}
			<ButtonOutlined on:click={auth.LoginWithGithub}>
				<GithubIcon styles="text-black mr-2 h-8 w-8" />
				Sign in with Github
			</ButtonOutlined>
			<div class="mt-4" />

			{#if !isWebAuthn}
				<ButtonOutlined on:click={handleIsWebAuthn}>
					<FingerprintIcon styles="text-black mr-2" />
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
							<span class="text-center text-xs font-semibold uppercase text-red-600">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="mt-8 flex w-full justify-center space-x-8">
						<ButtonSolid type="submit" {isLoading} on:click={() => {}}>Sign Up</ButtonSolid>
						<ButtonOutlined on:click={toggleModals}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
			{#if isWebAuthn}
				<ButtonOutlined on:click={handleIsWebAuthn}>
					<EmailIcon styles="text-black mr-2" />
					Sign up with Email Password
				</ButtonOutlined>

				<div class="mt-4 flex items-center justify-between">
					<span class="w-1/5 border-b lg:w-1/4" />

					<span
						class="text-center text-xs font-semibold capitalize text-gray-600 hover:no-underline"
					>
						or sign up with email
					</span>

					<span class="w-1/5 border-b lg:w-1/4" />
				</div>

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
							<span class="text-center text-xs font-semibold uppercase text-red-600">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="mt-8 flex w-full space-x-8">
						<ButtonSolid {isLoading} on:click={() => {}}>Sign Up</ButtonSolid>

						<ButtonOutlined on:click={toggleModals}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-start gap-4">
				<div id="confetti">
					<CheckIcon styles="h-24 w-24 text-primary-500" />
				</div>
				<span class="text-lg capitalize text-primary-500">{successMessage}</span>
				<div class="flex w-full flex-row items-center justify-center gap-2 px-4 text-center">
					<ButtonSolid on:click={toggleModals}>Sign In</ButtonSolid>
					<ButtonOutlined on:click={toggleModals}>Close</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
