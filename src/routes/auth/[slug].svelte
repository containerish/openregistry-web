<script lang="ts" context="module">
	export async function load({ params, url, stuff }) {
		const slug = params.slug;
		const u = new URLSearchParams(url.search);

		return {
			props: {
				slug: slug,
				token: u.get('token')
			}
		};
	}
</script>

<script lang="ts">
	import { Auth } from '../../apis/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/modal.svelte';
	import Textfield from '$lib/textfield.svelte';
	import Button from '$lib/button.svelte';
	let showModal = false;
	let password = '';

	const readPassword = (e: any) => {
		password = e.target.value;
	};

	export let slug = '';
	export let token = '';

	const auth = new Auth();

	const toggleModal = () => {
		showModal = !showModal;
	};

	const setNewPassword = async () => {
		const { error, data } = await auth.ForgotPasswordCallback(password, token);
		console.log('error: ', error);
		console.log('data: ', data);
	};

	const verifyEmail = 'verify';
	const forgotPassword = 'forgot-password';

	const handleCallback = async () => {
		switch (slug) {
			case verifyEmail:
				const { error, data, status } = await auth.VerifyEmail(token);
				if (error) {
					console.error('error in verifyEmail: ', error);
					return;
				}

				console.log('data in verifyEmail: ', status, data);
				await goto('/repositories');
				break;
			case forgotPassword:
				console.log('token: ', token);
				showModal = true;
				break;
		}
	};

	onMount(async () => {
		await handleCallback();
	});
</script>

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
					<form on:submit|preventDefault={(e) => setNewPassword()}>
						<div class="mt-4">
							<Textfield
								onInput={readPassword}
								name="New Password"
								label="Password"
								type="password"
							/>
						</div>

						<div class="flex mt-8 w-full">
							<Button styles="text-gray-50 w-full mr-2" label="Sign In" />
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
