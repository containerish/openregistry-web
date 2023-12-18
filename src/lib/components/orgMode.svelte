<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Info from '$lib/icons/info.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { CheckIcon, PencilIcon, PlainCrossIcon, SearchIcon } from '$lib/icons';
	import type { OpenRegistryOrgMember, OpenRegistryUserType } from '$lib/types/user';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import { onMount } from 'svelte';
	import Checkbox from '$lib/checkbox.svelte';
	import Chip from './Chip.svelte';
	import AddUsersToOrgModal from './addUsersToOrgModal.svelte';
	import type { UpdateUserPermissionsRequest } from '$lib/types/permissions';
	import Switch from './switch.svelte';

	export let user: OpenRegistryUserType;
	const openRegistryClient = new OpenRegistryClient(fetch);

	let isConvertOrgLoading = false;
	const convertUserToOrg = async () => {
		isConvertOrgLoading = true;
		const response = await openRegistryClient.convertAccountToOrg(user.id);
		isConvertOrgLoading = false;
	};

	$: orgUsers = [] as OpenRegistryOrgMember[];

	onMount(async () => {
		await listOrgUsers();
	});

	const listOrgUsers = async () => {
		const response = await openRegistryClient.listOrgUsers(user.id);
		if (response.success) {
			orgUsers = response.data;
			return;
		}

		console.log('list user error:', response);
	};

	let permsEdit = false;
	const togglePermsEdit = (userId: string, idx: number) => {
		updateUserPermissionsRequest.user_id = userId;
		permsEdit = !permsEdit;
		activeEditIndex = idx;
	};

	$: activeEditIndex = 0;

	$: updateUserPermissionsRequest = {
		pull: orgUsers.length > 0 ? orgUsers[activeEditIndex].pull : false,
		push: orgUsers.length > 0 ? orgUsers[activeEditIndex].push : false,
		is_admin: false,
		organization_id: user.id,
		user_id: '',
	} as UpdateUserPermissionsRequest;

	let isUpdatePermsLoading = false;
	const updateUserPermissions = async (userId: string, index: number) => {
		isUpdatePermsLoading = true;
		updateUserPermissionsRequest.user_id = userId;
		updateUserPermissionsRequest.is_admin = updateUserPermissionsRequest.pull && updateUserPermissionsRequest.push;

		const response = await openRegistryClient.updateUserPermissions(updateUserPermissionsRequest);
		if (response.success) {
			const orgUserIndex = orgUsers.findIndex((u) => u.user_id === userId);
			orgUsers[orgUserIndex] = {
				...orgUsers[orgUserIndex],
				pull: updateUserPermissionsRequest.pull,
				push: updateUserPermissionsRequest.push,
				is_admin: updateUserPermissionsRequest.is_admin,
			};
			isUpdatePermsLoading = false;
			togglePermsEdit(userId, index);
			return;
		}
		isUpdatePermsLoading = false;

		console.log('error updating user permissions:', response);
	};

	const updateUserPermState = (e: CustomEvent<boolean>, perm: 'push' | 'pull') => {
		if (perm === 'pull') {
			updateUserPermissionsRequest.pull = e.detail;
		} else if (perm === 'push') {
			updateUserPermissionsRequest.push = e.detail;
		}

		if (!e.detail) {
			updateUserPermissionsRequest.is_admin = e.detail;
		}
	};
</script>

<div class="flex flex-col gap-3 h-full w-full">
	{#if user.user_type === 'user'}
		<div class="w-full h-full min-h-[1000px] flex justify-center items-center">
			<div
				class="flex flex-col justify-center items-center gap-3 bg-primary-100/30 p-9 rounded border border-primary-200/50"
			>
				<div class="flex gap-2 items-center mb-3">
					<span class="text-primary-500 text-2xl font-semibold">Note</span>
					<Info class="w-5 h-5 text-primary-500" />
				</div>
				<p class=" max-w-lg text-slate-700 antialiased">
					Converting your Profile to an Organisation opens up possibilities like being able to add user to
					your organisation and managing their permissions.
				</p>
				<p class=" max-w-lg text-slate-600 antialiased">
					Please note that once you have converted into an Org, you cannot revert the change to become a user
					again
				</p>
				<ButtonSolid isLoading={isConvertOrgLoading} class="mt-6" on:click={convertUserToOrg}>
					Convert into Org
				</ButtonSolid>
			</div>
		</div>
	{:else if user.user_type === 'organization'}
		<!-- lsit of users with their roles in your organisation -->
		<div class="flex w-full justify-center items-center h-full flex-col gap-2">
			{#if orgUsers.length > 0}
				<div class="flex justify-between py-2 w-11/12">
					<div class="flex items-center gap-3 w-3/5 relative">
						<Textfield class="px-9 -ml-6" />
						<ButtonOutlined>Search</ButtonOutlined>
						<SearchIcon class="square-5 text-slate-500 absolute left-4" />
					</div>
					<!-- <ButtonSolid class=""> -->
					<!-- 	Add User -->
					<!-- 	<UserPlusIcon /> -->
					<!-- </ButtonSolid> -->
					<AddUsersToOrgModal orgOwner={user} {openRegistryClient} />
				</div>
			{/if}

			{#if !orgUsers || orgUsers.length === 0}
				<div class="w-full h-full min-h-[800px] flex justify-center items-center">
					<div
						class="flex flex-col justify-center items-center gap-3 bg-primary-100/30 p-9 rounded border border-primary-200/50"
					>
						<div class="flex gap-2 items-center mb-3">
							<span class="text-primary-500 text-2xl font-semibold">
								Add users to your organization
							</span>
							<Info class="w-5 h-5 text-primary-500" />
						</div>
						<p class=" max-w-lg text-slate-700 antialiased">
							Your organization does not have any members yet. Please add some users and configure their
							permissions
						</p>
						<p class=" max-w-lg text-slate-600 antialiased">
							Please note that once you have converted into an Org, you cannot revert the change to become
							a user again
						</p>
						<AddUsersToOrgModal orgOwner={user} {openRegistryClient} />
					</div>
				</div>
			{:else}
				{#each orgUsers as u, index (index)}
					<div
						id={index.toString()}
						class="min-h-[100px] rounded border border-primary-100 w-11/12 flex flex-col justify-between py-3 px-6 gap-6"
					>
						<div class="flex flex-col gap-6 w-full">
							<div class="flex justify-between w-full items-center">
								<div class="flex flex-col w-full gap-3 justify-between">
									<div class="flex gap-2 w-full justify-between items-start">
										<div class="flex w-full gap-2 justify-start items-center">
											<Checkbox />
											<span
												class="text-2xl font-semibold text-primary-500 underline underline-offset-2"
											>
												{u.user.username}
											</span>
											<span class="text-slate-600">
												{`(${u.user.email})`}
											</span>
										</div>

										<div>
											{#if permsEdit && activeEditIndex === index}
												<div class="flex gap-2 justify-center items-center">
													<ButtonOutlined
														id={index.toString()}
														on:click={() => togglePermsEdit(u.user_id, index)}
														class="text-primary-500 rounded px-4 flex justify-center items-center gap-2"
													>
														<span class="font-light">Cancel</span>
														<PlainCrossIcon />
													</ButtonOutlined>
													<ButtonOutlined
														id={index.toString()}
														isLoading={isUpdatePermsLoading &&
															updateUserPermissionsRequest.user_id === u.user_id}
														on:click={() => updateUserPermissions(u.user_id, index)}
														class="text-primary-500 rounded px-4 flex justify-center items-center gap-2"
													>
														<span class="font-light">Save</span>
														<CheckIcon class="w-6 h-6 text-primary-300" />
													</ButtonOutlined>
												</div>
											{:else}
												<ButtonOutlined
													on:click={() => togglePermsEdit(u.user_id, index)}
													class="text-primary-500 rounded px-4 flex justify-center items-center gap-2"
												>
													<span class="font-light">Edit</span>
													<PencilIcon />
												</ButtonOutlined>
											{/if}
										</div>
									</div>

									<div class="flex flex-col justify-center items-start gap-3">
										<span class="font-semibold antialiased text-slate-600"> Permissions </span>
										<div class="flex justify-center items-center gap-2.5">
											{#if permsEdit && activeEditIndex === index}
												<div class="flex justify-center items-center">
													<Switch
														bind:checked={u.push}
														on:change={(e) => updateUserPermState(e, 'push')}
														label="Push"
													/>
												</div>
												<div class="flex justify-center items-center">
													<Switch
														bind:checked={u.pull}
														on:change={(e) => updateUserPermState(e, 'pull')}
														label="Pull"
													/>
												</div>
											{:else if u.is_admin}
												<Chip label="Admin" />
												<Chip label="Pull" />
												<Chip label="Push" />
											{:else if u.pull}
												<Chip label="Pull" />
											{:else if u.push}
												<Chip label="Push" />
											{:else}
												<Chip label="None" />
											{/if}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{:else}{/if}
</div>
