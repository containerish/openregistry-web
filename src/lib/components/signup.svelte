<script lang="ts">
	import ButtonSolid from '../button-solid.svelte';
	import ButtonOutlined from '../button-outlined.svelte';
	import Textfield from '../textfield.svelte';
	import { getContext } from 'svelte';
	import { CheckIcon, EmailIcon, FingerprintIcon, GithubIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import confetti from 'canvas-confetti';
	var canvas = document.getElementById('confetti');
	let conf = confetti.create(canvas, { resize: true });
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Logo from './logo.svelte';

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

	export let toggleSignUpForm: () => void
	export let toggleSignInForm: () => void
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

	const webAuthNSignup = async (e: any) => {
		isLoading = true;
		setTimeout(async () => {
			const { error, status, data } = await auth.WebAuthNBeginRegister(
				e.target.username.value,
				e.target.email.value
			);
			if (error || status !== 200) {
				console.error('error signup: ', status, error);
				formErr = error.message;
				isLoading = false;
				return;
			}

			isLoading = false;
			showSuccessMsg = true;
			successMessage = data.message;
			throwSomeConfetti();
			throwSomeConfetti();
		}, 1000);
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

<div class="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg lg:max-w-4xl">
	<div class="flex flex-col w-full px-6 py-8 md:px-8 lg:w-full laptop:w-full laptop:py-4">
		<div class="flex justify-center py-4 mb-8 laptop:mb-4 laptop:py-1">
			<Logo type="dark" />
		</div>
		{#if !showSuccessMsg}
			<ButtonOutlined onClick={auth.LoginWithGithub}>
				<GithubIcon styles="text-black mr-2" />
				Sign in with Github
			</ButtonOutlined>
			<div class="mt-4" />

			{#if !isWebAuthn}
				<ButtonOutlined onClick={handleIsWebAuthn}>
					<FingerprintIcon styles="text-black mr-2" />
					Sign up with Security key
				</ButtonOutlined>

				<div class="flex items-center justify-between mt-4">
					<span class="w-1/5 border-b lg:w-1/4" />

					<span
						href="#"
						class="text-xs font-semibold text-center text-gray-600 capitalize hover:no-underline"
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
						<div class="w-full pt-1 capitalize text-center">
							<span class="text-xs font-semibold text-center text-red-600 uppercase">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="flex mt-8 w-full space-x-8 justify-center">
						<ButtonSolid type="submit" {isLoading} onClick={() => {}}>Sign Up</ButtonSolid>
						<ButtonOutlined onClick={toggleModals}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
			{#if isWebAuthn}
				<ButtonOutlined onClick={handleIsWebAuthn}>
					<EmailIcon styles="text-black mr-2" />
					Sign up with Email Password
				</ButtonOutlined>

				<div class="flex items-center justify-between mt-4">
					<span class="w-1/5 border-b lg:w-1/4" />

					<span
						href="#"
						class="text-xs font-semibold text-center text-gray-600 capitalize hover:no-underline"
					>
						or sign up with email
					</span>

					<span class="w-1/5 border-b lg:w-1/4" />
				</div>

				<form id="webauthn" on:submit|preventDefault={(e) => webAuthNSignup(e)}>
					<div class="mt-4">
						<Textfield
							onInput={validateUsername}
							errors={[usernameErr]}
							label="Username"
							type="text"
							name="username"
						/>
					</div>

					<div class="mt-4">
						<Textfield
							onInput={validateEmail}
							errors={[emailErr]}
							label="Email Address"
							type="email"
							name="email"
						/>
					</div>
					{#if $page.form?.formErrors && $page.form?.formErrors.length}
						<div class="w-full pt-1 capitalize text-center">
							<span class="text-xs font-semibold text-center text-red-600 uppercase">
								{$page.form?.formErrors[0]}
							</span>
						</div>
					{/if}

					<div class="flex mt-8 w-full space-x-8">
						<ButtonSolid {isLoading} onClick={() => {}}>Sign Up</ButtonSolid>

						<ButtonOutlined onClick={toggleModals}>Close</ButtonOutlined>
					</div>
				</form>
			{/if}
		{:else}
			<div class="flex flex-col items-center gap-4 justify-start h-full w-full">
				<div id="confetti">
					<CheckIcon styles="h-24 w-24 text-primary-500" />
				</div>
				<span class="text-lg capitalize text-primary-500">{successMessage}</span>
				<div class="w-full text-center flex flex-row justify-center gap-2 px-4 items-center">
					<ButtonSolid onClick={toggleModals}>Sign In</ButtonSolid>
					<ButtonOutlined onClick={toggleModals}>Close</ButtonOutlined>
				</div>
			</div>
		{/if}
	</div>
</div>
