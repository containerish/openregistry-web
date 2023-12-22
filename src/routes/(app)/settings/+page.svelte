<script lang="ts">
	import { ProfileIcon } from '$lib/icons';
	import { crossfade, fly } from 'svelte/transition';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { field } from 'svelte-forms';
	import { required, max, min, matchField } from 'svelte-forms/validators';
	import type { PageData, SubmitFunction } from './$types';
	import Textfield from '$lib/textfield.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { cubicInOut } from 'svelte/easing';
	import Settings from '../projects/[project_id]/settings.svelte';
	import OrgMode from '$lib/components/orgMode.svelte';

	export let data: PageData;

	let currentPassword = field('current_password', '', [required(), min(8), max(48)]);
	let newPassword = field('new_password', '', [required(), min(8), max(48)]);
	let confirmPassword = field('confirm_password', '', [required(), matchField(newPassword)]);

	let dynamic_features = {
		feature_delete_account: false,
	};

	if (browser) {
		posthog.onFeatureFlags(() => {
			dynamic_features.feature_delete_account = posthog.isFeatureEnabled('delete_account') ?? false;
		});
	}

	let isResetPasswordLoading = false;
	let resetPwdResponse = '';
	const resetPasswordSubmit: SubmitFunction = async () => {
		isResetPasswordLoading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					resetPwdResponse = result.data?.message ?? 'Password reset successful';
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

	const {
		elements: { root, list, content, trigger },
		states: { value },
	} = createTabs({
		defaultValue: 'tab-1',
	});

	const triggers = [
		{ id: 'tab-1', title: 'General' },
		{ id: 'tab-2', title: 'Organisation(Org Mode)' },
		// { id: 'tab-3', title: 'Automated Builds', disabled: true },
	];

	const [send, receive] = crossfade({
		duration: 450,
		easing: cubicInOut,
	});
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
						{data.user.username}
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

			<div
				use:melt={$root}
				class="flex min-h-max flex-col overflow-hidden rounded w-11/12 data-[orientation=vertical]:flex-row"
			>
				<div
					use:melt={$list}
					class="flex shrink-0 overflow-x-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
					aria-label="settings"
				>
					{#each triggers as triggerItem}
						<button
							use:melt={$trigger(triggerItem.id)}
							class="trigger cursor-pointer flex justify-center items-center relative"
						>
							{triggerItem.title}
							{#if $value === triggerItem.id}
								<div
									in:send={{ key: 'trigger' }}
									out:receive={{ key: 'trigger' }}
									class="absolute bottom-1 left-1/2 h-1 w-2/3 -translate-x-1/2 rounded-full bg-primary-300"
								/>
							{/if}
						</button>
					{/each}
				</div>
				<div use:melt={$content('tab-1')} class="grow bg-white p-5">
					<div
						class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-start gap-10 p-9"
						in:fly={{ y: 200, duration: 300 }}
					>
						<div class="flex w-full flex-col gap-1">
							<span class="mx-1 text-lg font-medium text-slate-700">Email Address</span>
							<p class=" max-w-md text-xs text-slate-500">
								This will require for you to re-verify your Email
							</p>
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

					<div class="h-px w-full bg-slate-200 rounded"></div>
					<form
						action="?/reset_password"
						method="POST"
						class="w-4/5 flex justify-center p-9"
						use:enhance={resetPasswordSubmit}
					>
						<div
							class="flex w-full flex-col items-start justify-start gap-3"
							in:fly={{ y: 200, duration: 300, delay: 50 }}
						>
							<div class="flex flex-col gap-1">
								<h1 class="text-lg font-medium text-slate-600"> Change Password </h1>
								<p class=" max-w-md text-xs text-slate-500">
									Make sure that your password is longer than 8 characters and contains uppercase,
									lowercase, numbers and special charcters
								</p>
							</div>

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
								<span class="pt-3 text-emerald-600 capitalize">{resetPwdResponse}</span>
							</div>
						</div>
					</form>
					<div class="h-px w-full bg-slate-200 rounded"></div>

					<div
						class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 p-9"
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

					{#if dynamic_features.feature_delete_account}
						<div class="h-px w-full bg-slate-200 rounded"></div>

						<div
							class="flex w-full lg:w-4/5 max-w-[1200px] flex-col items-start justify-center gap-3 p-9"
							in:fly={{ y: 200, duration: 300, delay: 150 }}
						>
							<div class="flex flex-col gap-1">
								<span class="text-lg font-medium text-rose-700/80">Delete Account</span>
								<span class="text-slate-600 antialiased text-sm max-w-md">
									Please note, if you choose to delete your account your repositories will also
									deleted and will no longer be available to you or anyone else
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
								<ButtonOutlined class="mt-6 border-rose-600/50 bg-transparent text-rose-600">
									Delete
								</ButtonOutlined>
							</div>
						</div>
					{/if}
				</div>

				<div use:melt={$content('tab-2')} class="grow bg-white p-5">
					<OrgMode user={data.user} />
				</div>
				<!-- <div use:melt={$content('tab-3')} class="grow bg-white p-5 text-slate-700"> -->
				<!-- 	<Settings /> -->
				<!-- </div> -->
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: default;
		user-select: none;

		border-radius: 5px;

		color: rgb(51 65 85);
		font-weight: 500;
		line-height: 1;

		flex: 1;
		height: theme(spacing.12);
		padding-inline: theme(spacing.2);

		&:focus {
			position: relative;
		}

		&:focus-visible {
			@apply z-10 ring-2;
		}

		&[data-state='active'] {
			@apply focus:relative;
			background-color: white;
			color: theme(colors.primary-500);
		}
	}

	&:focus {
		@apply !ring-green-600;
	}

	&[data-state='active'] {
		@apply focus:relative;
		background-color: white;
		border-radius: 5px;
		color: '#000';
	}
</style>
