<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/card.svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import { Auth } from '$apis/auth';
	import ButtonSolid from '$lib/button-solid.svelte';
	export let data: PageData;
	const auth = new Auth();

	import { form, field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
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
	<div class="min-h-[1500px] bg-white">
		<div class="flex flex-col gap-16 pb-28">
			<div
				class="flex gap-5 space-x-10 min-w-max max-w-[] justify-start items-center py-24 mt-20 px-20 
		bg-primary-50 text-slate-700 mx-5 border-2 border-primary-200"
			>
				<div class="px-4" />
				<div>
					<UserIcon styles="h-24 w-24" />
				</div>
				<div class="flex-initial">
					<h1 class="text-4xl font-medium capitalize">
						{data.user.name ? data.user.name : data.user.username}
					</h1>
					<div class="flex mt-3">
						<UserIcon styles="h-6 w-6" />
						<span class="text-lg mr-5">Community User</span>
						<span class="text-lg">
							Joined
							<span class="font-semibold">
								{new Date(data.user.created_at).toDateString()}
							</span>
						</span>
					</div>
				</div>
			</div>
			<Card>
				<div
					class="rounded-sm flex flex-col w-4/5 max-w-[1200px] justify-center items-start
					gap-10 bg-slate-50 border border-primary-50 shadow-inner px-20 pb-8 pt-10"
				>
					<div class="w-full flex flex-col gap-1">
						<span class="text-2xl mx-1 font-medium text-slate-500">Email Address</span>
						<Textfield
							type="email"
							placeholder="email"
							styles="w-1/2"
							disabled
							bind:value={data.user.email}
						/>
					</div>

					<ButtonSolid>Edit</ButtonSolid>
				</div>
			</Card>

			<Card>
				<div
					class="rounded-sm flex flex-col w-4/5 max-w-[1200px] justify-center items-start
					gap-4 bg-slate-50 border border-primary-50 shadow-inner px-20 pb-8 pt-10"
				>
					<h1 class="text-2xl text-slate-500 font-medium">Change Password</h1>
					<Textfield
						placeholder="current password"
						type="password"
						styles="w-1/2"
						bind:value={$currentPassword.value}
					/>
					<Textfield
						placeholder="new password"
						type="password"
						styles="w-1/2"
						bind:value={$newPassword.value}
					/>
					<div />
					<input
						type="password"
						bind:value={$confirmPassword.value}
						class="w-1/2 placeholder-gray-500 form-control block px-3 py-3 text-base font-normal text-gray-700 bg-white
						bg-clip-padding border-solid border-primary-100 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
						border rounded-md 
          				{!$passwordForm.hasError('confirm_password.match_field')
							? 'focus:border-priamry-200 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500'
							: 'border-red-800 outline-none ring ring-opacity-40 ring-red-700'} "
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
					<ButtonSolid styles="mt-6" onClick={resetPassword}>Save</ButtonSolid>
				</div>
			</Card>

			<Card>
				<div
					class="rounded-sm flex flex-col w-4/5 max-w-[1200px] justify-center items-start
				gap-4 bg-slate-50 border border-primary-50 shadow-inner px-20 pb-8 pt-10"
				>
					<div class="flex flex-col gap-2">
						<span class="text-2xl text-slate-500 font-medium">Account Information</span>
						<span class="text-slate-600">
							This information is public and visible to all users of OpenRegistry
						</span>
					</div>
					<div class="w-full flex flex-col gap-4 justify-start items-start">
						<Textfield
							type="text"
							disabled
							placeholder="username"
							styles="w-1/2"
							bind:value={data.user.username}
						/>
						<Textfield
							placeholder="Gihub handle"
							disabled
							type="text"
							styles="w-1/2"
							bind:value={data.user.html_url}
						/>
						<ButtonSolid styles="mt-6">Save</ButtonSolid>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
