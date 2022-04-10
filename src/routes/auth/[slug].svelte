<script lang="ts" context="module">
	export async function load({ params, url }) {
		const slug = params.slug;
		const u = new URLSearchParams(url.search);

		return {
			props: {
				slug: slug,
				token: u.get('token'),
				unhandledErr: u.get('error')
			}
		};
	}
</script>

<script lang="ts">
	import { Auth } from '../../apis/auth';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/modal.svelte';
	import Button from '$lib/button.svelte';
	import Pulse from '../../components/pulse.svelte';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import ErrorModal from '$lib/errorModal.svelte';
	import ButtonWithConfetti from '$lib/buttonWithConfetti.svelte';
	export let unhandledErr: string;
	let showModal = false;
	let password = '';
	let confirmPassword = '';
	let passwordErr = '';
	let confirmPasswordErr = '';
	let formErr: string;
	let formMsg: string;

	export let slug = '';
	export let token = '';

	const auth = new Auth();

	const toggleModal = async () => {
		showModal = !showModal;
		await goto('/');
	};

	let timer: any;
	const setNewPassword = async () => {
		if (!password || !confirmPassword) {
			formErr = 'password and confirm passsword are required fields';
			return;
		}

		const { error, data, status } = await auth.ForgotPasswordCallback(password, token);
		if (error) {
			if (status === 401) {
				formErr = 'your link has expired, please try again';
				return;
			}
			formErr = error.message;
			return;
		}

		formMsg = data.message;
		password = '';
		confirmPassword = '';

		timer = setTimeout(() => {
			goto('/?signin=true');
		}, 3000);
	};

	const verifyEmail = 'verify';
	const forgotPassword = 'forgot-password';
	const unhandled = 'unhandled';

	let showErrorModal = false;
	const handleCallback = async () => {
		switch (slug) {
			case verifyEmail:
				const { error } = await auth.VerifyEmail(token);
				if (error) {
					console.error('error in verifyEmail: ', error);
					showErrorModal = true;
					formErr = error.message;
					return;
				}

				goto('/repositories');
				break;
			case forgotPassword:
				showModal = true;
				break;
			case unhandled:
				showErrorModal = true;
				formErr = unhandledErr;
		}
	};

	onMount(async () => {
		await handleCallback();
	});

	onDestroy(() => clearTimeout(timer));
	const validatePassword = (e: any) => {
		formErr = '';
		const pwd: string = e.target.value;

		const regexp = new RegExp(/^[ A-Za-z0-9]*$/);
		if (!pwd || pwd.length < 8 || regexp.test(pwd)) {
			passwordErr = 'password must be alphanumeric and atleast 8 characters long';
			return;
		}

		passwordErr = '';
	};

	const validateConfirmPassword = (e: any) => {
		formErr = '';
		const confirmPwd = e.target.value;
		if (password !== confirmPwd) {
			confirmPasswordErr = 'password do not match';
			return;
		}

		confirmPasswordErr = '';
	};

	const handleErrorModal = async () => {
		showErrorModal = false;
		await goto('/');
	};
</script>

<Pulse>
	<div>
		{#if showModal}
			<Modal>
				<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg lg:max-w-4xl">
					<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
						<div class="flex justify-center py4 mb-8">
							<picture>
								<img class="" src="/logo-dark.svg" alt="openregistry-logo.svg" />
							</picture>
						</div>

						<div class="flex items-center justify-between mt-4">
							<span class="w-1/5 border-b lg:w-1/4" />

							<span class="w-1/5 border-b lg:w-1/4" />
						</div>
						<form on:submit|preventDefault={setNewPassword}>
							<div class="mt-4">
								<div class="flex items-center px-2">
									<label for="password" class="block font-semibold text-sm text-gray-800">
										Password
									</label>
									<span class="px-2 text-xs text-brown-800">
										(min. 8 alphanumeric special characters)
									</span>
								</div>
								<input
									on:input={(e) => validatePassword(e)}
									name="password"
									bind:value={password}
									type="password"
									class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
								/>
								{#if passwordErr}
									<div class="w-full pt-1 capitalize text-center">
										<span class="text-xs font-semibold text-center text-red-600 uppercase">
											{passwordErr}
										</span>
									</div>
								{/if}
							</div>
							<div class="mt-4">
								<div class="flex items-center px-2">
									<label for="password" class="block font-semibold text-sm text-gray-800">
										Confirm Password
									</label>
								</div>
								<input
									on:input={(e) => validateConfirmPassword(e)}
									bind:value={confirmPassword}
									name="confirm_password"
									type="password"
									class="placeholder-gray-500 form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
								/>
								{#if confirmPasswordErr}
									<div class="w-full pt-1 capitalize text-center">
										<span class="text-xs font-semibold text-center text-red-600 uppercase">
											{confirmPasswordErr}
										</span>
									</div>
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
								<div class="w-full pt-1 capitalize text-center">
									<span
										class="text-xs font-semibold animate-pulse text-center text-green-600 uppercase"
									>
										Redirecting you back to Sign In Page
									</span>
								</div>
							{/if}

							<div class="flex mt-8 w-full">
								<Button
									disabled={!!passwordErr || !!confirmPasswordErr}
									onClick={setNewPassword}
									styles="text-gray-50 w-full mr-2 disabled:cursor-not-allowed"
									label="Update Password"
								/>
								<Button
									onClick={toggleModal}
									styles="bg-gray-50 text-gray-800 w-2/3 ml-2"
									label="Close"
								/>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		{/if}
	</div>
</Pulse>
<ErrorModal open={showErrorModal} error={formErr} />
