<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/card.svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import { ProfileIcon } from '$lib/icons';
	import { Auth } from '$apis/auth';
	import ButtonSolid from '$lib/button-solid.svelte';
	export let data: PageData;
	const auth = new Auth();

	import { form, field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import type { PageData } from './$types';
	import Textfield from '$lib/textfield.svelte';

	let currentPassword = field('current_password', '', [required(), min(8), max(48)]);
	let newPassword = field('new_password', '', [required(), min(8), max(48)]);
	let confirmPassword = field('confirm_password', '', [required(), matchField(newPassword)]);

	const passwordForm = form(currentPassword, newPassword, confirmPassword);

	let formResp = {
		message: undefined,
		type: undefined
	};

	const resetPassword = async () => {
		const { error, data } = await auth.ResetPassword($currentPassword.value, $newPassword.value);
		if (error) {
			formResp.message = error.message;
			formResp.type = 'error';
			return;
		}

		formResp.type = undefined;
		formResp.message = data.message;
		passwordForm.reset();
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
					<ProfileIcon styles="h-11 w-11 lg:h-16 lg:w-16 text-slate-600" />
				</div>
				<div class="flex flex-col justify-center">
					<span class="text-2xl lg:text-4xl font-medium capitalize text-slate-700">
						{data.user.name ? data.user.name : data.user.username}
					</span>
					<div class="flex mt-2 items-center gap-1">
						<ProfileIcon styles="h-5 w-5 text-slate-600" />
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
						<span
							class="mx-1 text-lg lg:text-xl font-medium text-slate-700"
							>Email Address</span
						>
						<Textfield
							type="email"
							placeholder="email"
							styles="max-w-[450px]"
							disabled
							bind:value={data.user.email}
						/>
					</div>

					<ButtonSolid styles="-mt-2">Edit</ButtonSolid>
				</div>
			</Card>

			<Card>
				<div class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 rounded border
					border-primary-200 bg-white px-9 lg:px-20 py-6 shadow-2xl">
					<h1 class="text-lg lg:text-xl font-medium text-slate-600">
						Change Password
					</h1>
					<Textfield
						placeholder="current password"
						type="password"
						styles="max-w-[450px]"
						bind:value={$currentPassword.value}
					/>
					<Textfield
						placeholder="new password"
						type="password"
						styles="max-w-[450px]"
						bind:value={$newPassword.value}
					/>
					<div />
					<input
						type="password"
						bind:value={$confirmPassword.value}
						class="form-control m-0 block w-full max-w-[450px] rounded-md border border-solid border-primary-100
						bg-white bg-clip-padding px-3 py-2 lg:py-3.5 text-sm lg:text-base font-normal text-slate-700 placeholder-slate-500 
						transition ease-in-out focus:text-slate-700
          				{!$passwordForm.hasError('confirm_password.match_field')
							? 'focus:border-priamry-200 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-40'
							: 'border-red-800 outline-none ring ring-red-700 ring-opacity-40'} "
						placeholder="confirm password"
					/>
					{#if $passwordForm.hasError('current_password.required')}
						<span class="text-red-700">Error - Current Password is a required field</span>
					{/if}
					{#if $passwordForm.hasError('new_password.required')}
						<span class="text-red-700">Error - New Password is a required field</span>
					{/if}
					{#if $passwordForm.hasError('new_password.min')}
						<span class="text-red-700">Error - New Password can not be shorter than 8 chars</span>
					{/if}
					{#if $passwordForm.hasError('confirm_password.match_field')}
						<span class="text-red-700">Error - passwords don't match</span>
					{/if}
					{#if formResp.message}
						<span class={!formResp.type ? 'text-green-600' : 'text-red-600'}>
							{formResp.message}
						</span>
					{/if}
					<ButtonSolid styles="mt-6" on:click={resetPassword}>Save</ButtonSolid>
				</div>
			</Card>

			<Card>
				<div
					class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 rounded border
					border-primary-200 bg-white px-9 lg:px-20 py-6 shadow-2xl"
				>
					<div class="flex flex-col gap-1">
						<span
							class="text-lg lg:text-xl font-medium text-slate-700"
							>Account Information</span
						>
						<span class="text-slate-600 antialiased text-sm">
							This information is public and visible to all users of OpenRegistry
						</span>
					</div>
					<div
						class="flex w-full flex-col items-start justify-start gap-3"
					>
						<Textfield
							type="text"
							disabled
							placeholder="username"
							styles="max-w-[450px]"
							bind:value={data.user.username}
						/>
						<Textfield
							placeholder="Gihub handle"
							disabled
							type="text"
							styles="max-w-[450px]"
							bind:value={data.user.html_url}
						/>
						<ButtonSolid styles="mt-6" disabled>Save</ButtonSolid>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
