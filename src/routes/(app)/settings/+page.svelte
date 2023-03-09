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
	<div class="min-h-[1500px] w-full half:min-h-max laptop:min-h-max  desktop:min-h-max">
		<div class="flex flex-col gap-16 pb-24 half:gap-8 laptop:gap-8 desktop:gap-8">
			<div
				class="mt-20 flex min-w-max items-center justify-start gap-5 space-x-10 border-2 border-primary-100 bg-primary-50 py-24 px-8 
				text-slate-700 half:mt-8 half:gap-2 half:py-10 laptop:mt-8 laptop:py-10 laptop:px-0 desktop:mt-12 desktop:py-16"
			>
				<div class="px-4 half:px-0 laptop:px-1" />
				<div>
					<ProfileIcon
						styles="h-24 w-24 desktop:h-12 desktop:w-12 laptop:h-12 laptop:w-12 half:w-12 half:h-12 text-primary-500"
					/>
				</div>
				<div class="flex-initial">
					<h1
						class="text-4xl font-medium capitalize half:text-2xl laptop:text-3xl desktop:text-3xl"
					>
						{data.user.name ? data.user.name : data.user.username}
					</h1>
					<div class="mt-3 flex items-center gap-1 half:mt-1 desktop:mt-2">
						<ProfileIcon
							styles="h-6 w-6 desktop:h-4 desktop:w-4 laptop:h-4 laptop:w-4 half:w-4 half:h-4"
						/>
						<span class="mr-5 text-lg half:text-sm laptop:text-sm desktop:text-base"
							>Community User</span
						>
						<span class="text-lg half:text-xs laptop:text-xs desktop:text-sm">
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
					class="flex w-4/5 max-w-[1200px] flex-col items-start justify-center gap-10 rounded-sm border border-primary-200 
					bg-white px-20 pb-8 pt-10 shadow-2xl half:w-full half:py-6 half:px-8 laptop:w-full 
					laptop:px-14 laptop:py-6 desktop:gap-6 desktop:px-14 desktop:py-6"
				>
					<div class="flex w-full flex-col gap-1">
						<span
							class="mx-1 text-2xl font-medium text-slate-700 half:text-lg laptop:text-lg desktop:text-lg"
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
				<div
					class="flex w-4/5 max-w-[1200px] flex-col items-start justify-center gap-4 rounded-sm border border-primary-200 
					bg-white px-20 pb-8 pt-10 shadow-2xl half:w-full half:gap-2 half:px-8 half:py-6 laptop:w-full 
					laptop:gap-2 laptop:px-14 laptop:py-6 desktop:gap-2 desktop:px-14 desktop:py-6"
				>
					<h1
						class="text-2xl font-medium text-slate-600 half:text-lg laptop:text-lg desktop:text-lg"
					>
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
						class="form-control m-0 block w-full max-w-[450px] rounded-md border border-solid border-primary-100 bg-white bg-clip-padding px-3
						py-3 text-base font-normal text-slate-700 placeholder-slate-500 transition ease-in-out
						focus:text-slate-700 desktop:text-sm 
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
					<ButtonSolid styles="mt-6" onClick={resetPassword}>Save</ButtonSolid>
				</div>
			</Card>

			<Card>
				<div
					class="flex w-4/5 max-w-[1200px] flex-col items-start justify-center gap-4 rounded-sm border border-primary-200 
					bg-white px-20 pb-8 pt-10 shadow-2xl half:w-full half:px-14 half:py-6 laptop:w-full 
					laptop:gap-1 laptop:px-14 laptop:py-6 desktop:gap-2 desktop:px-14 desktop:py-6"
				>
					<div class="flex flex-col gap-2 half:gap-0 laptop:gap-0 desktop:gap-1">
						<span
							class="text-2xl font-medium text-slate-700 half:text-lg laptop:text-lg desktop:text-lg"
							>Account Information</span
						>
						<span class="text-slate-600 antialiased half:text-xs laptop:text-xs desktop:text-sm">
							This information is public and visible to all users of OpenRegistry
						</span>
					</div>
					<div
						class="flex w-full flex-col items-start justify-start gap-4 half:gap-2 laptop:gap-2 desktop:gap-2"
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
						<ButtonSolid styles="mt-6">Save</ButtonSolid>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
