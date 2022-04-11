<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/card.svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import { Auth, type User } from '../../apis/auth';
	import { userStore as session } from '$lib/userStore';
	export let u: User;

	let nameOrUsername: string;
	const auth = new Auth();
	onMount(async () => {
		// @ts-ignore
		if (!$session.authenticated) {
			await goto('/auth/unauthorized');
		}

		// @ts-ignore
		u = $session.user;
		nameOrUsername = u.name ? u.name : u.username;
	});

	import { form, field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import { onMount } from 'svelte';

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

{#if u}
	<div class="min-h-[93vh] bg-cream-50">
		<div
			class="flex gap-5 space-x-10 min-w-full justify-start items-center py-28 my-20 px-20 bg-brown-500"
		>
			<div class="px-4" />
			<div>
				<UserIcon styles="h-24 w-24" />
			</div>
			<div class="flex-initial">
				<h1 class="text-4xl font-medium capitalize">{nameOrUsername}</h1>
				<div class="flex mt-3">
					<UserIcon styles="h-6 w-6" />
					<span class="text-lg mr-5">Community User</span>
					<span class="text-lg"> Joined 
						<span class="font-semibold">
						{new Date(u.created_at).toDateString()}
					</span>
					</span>
				</div>
			</div>
		</div>
		<Card>
			<div class="rounded-xl flex-col w-3/4 flex bg-brown-400 px-20 py-8">
				<h1 class="text-2xl font-medium">Email Address</h1>
				<div>
					<input
						id="email"
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md disabled:text-gray-400
                    text-gray-700 bg-white border rounded-md sm:mr-5 focus:border-brown-800
                    focus:outline-none focus:ring focus:ring-brown-700 focus:ring-opacity-40"
						disabled
						bind:value={u.email}
						placeholder="email"
					/>

					<button
						class="px-6 py-2 text-lg font-medium tracking-wide text-gray-200 capitalize transition-colors
                     duration-200 transform bg-brown-800 rounded-md sm:mx-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
					>
						Edit
					</button>
				</div>
			</div>
		</Card>

		<Card>
			<div class="rounded-xl flex-col w-3/4 flex bg-brown-400 px-20 py-8 mt-5">
				<h1 class="text-2xl font-medium">Change Password</h1>
				<input
					type="password"
					bind:value={$currentPassword.value}
					class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                     sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                     focus:ring-opacity-40"
					placeholder="current password"
				/>

				<input
					type="password"
					bind:value={$newPassword.value}
					class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                     sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700 focus:ring-opacity-40"
					placeholder="new password"
				/>

				<input
					type="password"
					bind:value={$confirmPassword.value}
					class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md sm:mr-5
focus:outline-none focus:ring focus:ring-opacity-40
          {!$passwordForm.hasError('confirm_password.match_field')
						? 'focus:border-brown-800 focus:ring-brown-700 '
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
				<button
					on:click={resetPassword}
					class="w-32 px-6 py-2 mt-5 -ml-1.5 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
				>
					Save
				</button>
			</div>
		</Card>

		<Card>
			<div class="rounded-xl flex-col w-3/4 flex bg-brown-400 px-20 py-8 mt-5 mb-20">
				<h1 class="text-2xl font-medium">Account Information</h1>
				<div class="flex flex-col">
					<span class="mt-2 text-brown-800 text-md">
						This information will be public and visible to all us of OpenRegistry
					</span>
					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md sm:mr-5 disabled:text-gray-400
              focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700 focus:ring-opacity-40"
						bind:value={u.username}
						disabled
						placeholder="Username"
					/>

					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md disabled:text-gray-400
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						disabled
						bind:value={u.html_url}
						placeholder="Github"
					/>

					<button
						class="w-32 px-6 py-2 mt-5 -ml-1.5 text-lg font-medium tracking-wide text-white capitalize
                    transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
					>
						Save
					</button>
				</div>
			</div>
		</Card>
	</div>
{/if}
