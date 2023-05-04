<script lang="ts">
	import Card from '$lib/card.svelte';
	import { ProfileIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import ButtonSolid from '$lib/button-solid.svelte';
	export let data: PageData;
	const auth = new Auth();

	import { form, field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import type { PageData } from './$types';
	import Textfield from '$lib/textfield.svelte';
	import { page } from '$app/stores';
	import { applyAction, type SubmitFunction, enhance } from '$app/forms';

	let currentPassword = field('current_password', '', [required(), min(8), max(48)]);
	let newPassword = field('new_password', '', [required(), min(8), max(48)]);
	let confirmPassword = field('confirm_password', '', [required(), matchField(newPassword)]);

	const passwordForm = form(currentPassword, newPassword, confirmPassword);

	let formResp = {
		message: undefined,
		type: undefined
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
	<div class="w-full max-w-[2000px] flex flex-col mx-2 py-4">
		<div class="flex flex-col gap-9">
			<div class="flex py-10 lg:py-16 px-20 mx-3 gap-8 bg-primary-50 border-2 border-primary-100">
				<div class="flex items-center">
					<ProfileIcon class="h-11 w-11 lg:h-16 lg:w-16 text-slate-600" />
				</div>
				<div class="flex flex-col justify-center">
					<span class="text-2xl lg:text-4xl font-medium capitalize text-slate-700">
						{data.user.name ? data.user.name : data.user.username}
					</span>
					<div class="flex mt-2 items-center gap-1">
						<ProfileIcon class="h-5 w-5 text-slate-600" />
						<span class="text-sm text-slate-600">Community User</span>
					</div>
				</div>
				<span class="text-xs lg:text-base text-slate-600 self-end">
					Joined
					<span>
						{new Date(data.user.created_at).toDateString()}
					</span>
				</span>
			</div>
			<Card>
				<div
					class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-10 rounded border
					 border-primary-200 bg-white px-9 lg:px-20 py-6 shadow-2xl"
				>
					<div class="flex w-full flex-col gap-1">
						<span class="mx-1 text-lg lg:text-xl font-medium text-slate-700">Email Address</span>
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
					border-primary-200 bg-white px-9 lg:px-20 py-6 shadow-2xl"
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
					border-primary-200 bg-white px-9 lg:px-20 py-6 shadow-2xl"
				>
					<div class="flex flex-col gap-1">
						<span class="text-lg lg:text-xl font-medium text-slate-700">Account Information</span>
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
		</div>
	</div>
{/if}
