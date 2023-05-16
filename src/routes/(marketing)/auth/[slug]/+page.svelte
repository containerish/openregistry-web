<script lang="ts">
	import { Auth } from '$apis/auth';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/modal.svelte';
	import Button from '$lib/button-solid.svelte';
	import { Pulse } from '$lib/components';
	import ErrorModal from '$lib/errorModal.svelte';
	import type { PageData } from './$types';
	import Logo from '$lib/components/logo.svelte';
	export let unhandledErr: string;
	let showModal = false;
	let password = '';
	let confirmPassword = '';
	let passwordErr = '';
	let confirmPasswordErr = '';
	let formErr: string;
	let formMsg: string;

	export let data: PageData;
	export let token = '';

	const auth = new Auth();

	const toggleModal = async () => {
		showModal = !showModal;
		goto('/', { invalidateAll: true });
	};

	let timer: any;
	const setNewPassword = async () => {
		if (!password || !confirmPassword) {
			formErr = 'password and confirm passsword are required fields';
			return;
		}

		const { error, data: response, status } = await auth.ForgotPasswordCallback(password, token);
		if (error) {
			if (status === 401) {
				formErr = 'your link has expired, please try again';
				return;
			}
			formErr = error.message;
			return;
		}
		formMsg = response.message;
		password = '';
		confirmPassword = '';

		timer = setTimeout(() => {
			goto('/?signin=true');
		}, 3000);
	};

	const forgotPassword = 'forgot-password';
	const unhandled = 'unhandled';
	const githubCallback = 'github-login-callback';

	let showErrorModal = false;
	const handleCallback = async () => {
		switch (data.slug) {
			case forgotPassword:
				showModal = true;
				break;
			case githubCallback:
				if (data.error) {
					formErr = data.error?.message;
					showErrorModal = true;
					return;
				}

				goto('/repositories');
				break;
			case unhandled:
				showErrorModal = true;
				formErr = data?.error?.message ?? unhandledErr;
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
				<div class="mx-auto flex w-4/5 max-w-sm overflow-hidden rounded-lg lg:max-w-4xl">
					<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
						<div class="py4 mb-8 flex justify-center">
							<Logo />
						</div>

						<div class="mt-4 flex items-center justify-between">
							<span class="w-1/5 border-b lg:w-1/4" />

							<span class="w-1/5 border-b lg:w-1/4" />
						</div>
						<form on:submit|preventDefault={setNewPassword}>
							<div class="mt-4">
								<div class="flex items-center px-2">
									<label for="password" class="block text-sm font-semibold text-gray-800">
										Password
									</label>
									<span class="px-2 text-xs text-slate-800">
										(min. 8 alphanumeric special characters)
									</span>
								</div>
								<input
									on:input={(e) => validatePassword(e)}
									name="password"
									bind:value={password}
									type="password"
									class="form-control m-0 block w-full rounded-md border border-solid border-brown-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 placeholder-gray-500 transition ease-in-out focus:border-brown-100 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring focus:ring-brown-800 focus:ring-opacity-40"
								/>
								{#if passwordErr}
									<div class="w-full pt-1 text-center capitalize">
										<span class="text-center text-xs font-semibold uppercase text-red-600">
											{passwordErr}
										</span>
									</div>
								{/if}
							</div>
							<div class="mt-4">
								<div class="flex items-center px-2">
									<label for="password" class="block text-sm font-semibold text-gray-800">
										Confirm Password
									</label>
								</div>
								<input
									on:input={(e) => validateConfirmPassword(e)}
									bind:value={confirmPassword}
									name="confirm_password"
									type="password"
									class="form-control m-0 block w-full rounded-md border border-solid border-brown-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 placeholder-gray-500 transition ease-in-out focus:border-brown-100 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring focus:ring-brown-800 focus:ring-opacity-40"
								/>
								{#if confirmPasswordErr}
									<div class="w-full pt-1 text-center capitalize">
										<span class="text-center text-xs font-semibold uppercase text-red-600">
											{confirmPasswordErr}
										</span>
									</div>
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
								<div class="w-full pt-1 text-center capitalize">
									<span
										class="animate-pulse text-center text-xs font-semibold uppercase text-green-600"
									>
										Redirecting you back to Sign In Page
									</span>
								</div>
							{/if}

							<div class="mt-8 flex w-full">
								<Button
									disabled={!!passwordErr || !!confirmPasswordErr}
									on:click={setNewPassword}
									class="text-gray-50 w-full mr-2 disabled:cursor-not-allowed"
								>
									Update Password
								</Button>
								<Button on:click={toggleModal} class="bg-gray-50 text-gray-800 w-2/3 ml-2">
									Close
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		{/if}
	</div>
</Pulse>
<ErrorModal open={showErrorModal} error={formErr} />
