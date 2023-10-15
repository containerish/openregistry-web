<script lang="ts">
	import Card from '$lib/card.svelte';
	import { ProfileIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import { fly } from 'svelte/transition';
	import ButtonSolid from '$lib/button-solid.svelte';
	export let data: PageData;

	import { form, field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import type { PageData, SubmitFunction } from './$types';
	import Textfield from '$lib/textfield.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';

	let currentPassword = field('current_password', '', [required(), min(8), max(48)]);
	let newPassword = field('new_password', '', [required(), min(8), max(48)]);
	let confirmPassword = field('confirm_password', '', [required(), matchField(newPassword)]);

	const passwordForm = form(currentPassword, newPassword, confirmPassword);

	let formResp = {
		message: undefined,
		type: undefined,
	};

	let isResetPasswordLoading = false;
	let resetPwdResponse = '';
	const resetPasswordSubmit: SubmitFunction = async () => {
		isResetPasswordLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					resetPwdResponse = result.data?.message;
					isResetPasswordLoading = false;
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
			isResetPasswordLoading = false;
		};
	};
</script>

<svelte:head>
	<title>User|Open Registry</title>
</svelte:head>

{#if data.user}
	<div class="w-full max-w-[2000px] flex flex-col">
		<div class="flex flex-col gap-9">
			<div
				class="flex flex-col md:flex-row py-20 px-9 lg:px-20 gap-8 bg-primary-50 shadow-2xl
				  items-center md:items-end"
			>
				<div class="flex">
					<img src="/user.png" alt="Profile" width="90px" />
				</div>
				<div class="flex flex-col items-center lg:items-start gap-3">
					<span class="text-3xl font-medium capitalize text-slate-600">
						{data.user.name ? data.user.name : data.user.username}
					</span>
					<div class="flex justify-center gap-6">
						<div class="flex items-center">
							<ProfileIcon class="h-4 w-4 text-slate-500 fill-current" />
							<span class="text-sm text-slate-500">Community User</span>
						</div>
						<span class="text-sm text-slate-600">
							Joined
							<span>
								{new Date(data.user.created_at).toDateString()}
							</span>
						</span>
					</div>
				</div>
			</div>
			<Card>
				<div
					class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-10 rounded border
					 border-primary-100/50 bg-white px-9 lg:px-16 py-6 shadow-2xl"
					in:fly={{ y: 200, duration: 300 }}
				>
					<div class="flex w-full flex-col gap-1">
						<span class="mx-1 text-lg font-medium text-slate-700">Email Address</span>
						<Textfield
							type="email"
							placeholder="email"
							class="max-w-[450px]"
							disabled
							bind:value={data.user.email}
						/>
					</div>

					<ButtonSolid class="-mt-2">Edit</ButtonSolid>
				</div>
			</Card>

			<Card>
				<form
					action="?/reset_password"
					method="POST"
					class="w-full flex justify-center"
					use:enhance={resetPasswordSubmit}
				>
					<div
						class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 rounded border
					border-primary-100/50 bg-white px-9 lg:px-20 py-6 shadow-2xl"
						in:fly={{ y: 200, duration: 300, delay: 50 }}
					>
						<h1 class="text-lg lg:text-xl font-medium text-slate-600 mb-3">Change Password</h1>
						<div class="w-full">
							<Textfield
								errors={$page.form?.errors?.currentPassword}
								name="currentPassword"
								type="password"
								class="max-w-[450px]"
								bind:value={$currentPassword.value}
								label="Current password"
							/>
						</div>

						<div class="w-full">
							<Textfield
								errors={$page.form?.errors?.newPassword}
								name="newPassword"
								type="password"
								class="max-w-[450px]"
								bind:value={$newPassword.value}
								label="New password"
							/>
						</div>
						<div class="w-full">
							<Textfield
								errors={$page.form?.errors?.confirmPassword}
								name="confirmPassword"
								type="password"
								class="max-w-[450px]"
								bind:value={$confirmPassword.value}
								label="Confirm password"
							/>
						</div>

						<div />
						{#if $page.form?.formErrors && $page.form?.formErrors.length}
							<div class="w-full">
								<span class="text-xs font-semibold capitalize text-red-600">
									{$page.form?.formErrors[0]}
								</span>
							</div>
						{/if}
						<div class="flex justify-start items-center gap-3 w-full">
							<ButtonSolid class="mt-6" isLoading={isResetPasswordLoading}>Save</ButtonSolid>
							<span class="pt-3 text-emerald-600">{resetPwdResponse}</span>
						</div>
					</div>
				</form>
			</Card>

			<Card>
				<div
					class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 rounded border
					border-primary-100/50 bg-white px-9 lg:px-16 py-6 shadow-2xl"
					in:fly={{ y: 200, duration: 300, delay: 100 }}
				>
					<div class="flex flex-col gap-1">
						<span class="text-lg font-medium text-slate-700">Account Information</span>
						<span class="text-slate-600 antialiased text-sm">
							This information is public and visible to all users of OpenRegistry
						</span>
					</div>
					<div class="flex w-full flex-col items-start justify-start gap-3">
						<Textfield
							type="text"
							disabled
							placeholder="username"
							class="max-w-[450px]"
							bind:value={data.user.username}
						/>
						<Textfield
							placeholder="Gihub handle"
							disabled
							type="text"
							class="max-w-[450px]"
							bind:value={data.user.html_url}
						/>
						<ButtonSolid class="mt-6" disabled>Save</ButtonSolid>
					</div>
				</div>
			</Card>

			<Card>
				<div
					class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 rounded border
					border-primary-100/50 bg-white px-9 lg:px-16 py-6 shadow-2xl"
					in:fly={{ y: 200, duration: 300, delay: 150 }}
				>
					<div class="flex flex-col gap-1">
						<span class="text-lg font-medium text-rose-700">Delete Account</span>
						<span class="text-slate-700 antialiased text-sm">
							Please note, if you choose to delete your account your repositories will also deleted and
							will no longer be available to you or anyone else
						</span>
					</div>
					<div class="flex w-full flex-col items-start justify-start gap-3">
						<Textfield
							type="text"
							disabled
							placeholder="username"
							class="max-w-[450px]"
							bind:value={data.user.username}
						/>
						<ButtonOutlined class="mt-6 border-rose-600 bg-transparent text-rose-700">
							Delete
						</ButtonOutlined>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
