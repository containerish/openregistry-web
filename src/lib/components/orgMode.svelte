<script lang="ts">
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Info from '$lib/icons/info.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { CheckIcon, PencilIcon, SearchIcon } from '$lib/icons';
	import type { OpenRegistryOrgMember, OpenRegistryUserType } from '$lib/types/user';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import { onMount } from 'svelte';
	import Chip from './Chip.svelte';
	import AddUsersToOrgModal from './addUsersToOrgModal.svelte';
	import Switch from './switch.svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import SpinnerCircle from '$lib/icons/spinner-circle.svelte';

	export let user: OpenRegistryUserType;
	const openRegistryClient = new OpenRegistryClient(fetch, $page.url.origin);

	let isConvertOrgLoading = false;
	const convertUserToOrg = async () => {
		isConvertOrgLoading = true;
		const response = await openRegistryClient.convertAccountToOrg(user.id);
		if (response.success) {
			user.is_org_owner = true;
			user.user_type = 'organization';
		}

		isConvertOrgLoading = false;
	};

	const orgUsersStore = writable({
		users: [] as OpenRegistryOrgMember[],
		filteredUsers: [] as OpenRegistryOrgMember[],
		activeUser: null as OpenRegistryOrgMember | null,
	});

	onMount(async () => {
		await listOrgUsers();
	});

	let isOrgListLoading = false;
	const listOrgUsers = async () => {
		isOrgListLoading = true;
		const response = await openRegistryClient.listOrgUsers(user.id);
		if (response.success) {
			$orgUsersStore.users = response.data;
			$orgUsersStore.filteredUsers = response.data;
		}
		isOrgListLoading = false;
	};

	let permsEdit = false;
	const togglePermsEdit = () => {
		permsEdit = !permsEdit;
	};

	// $: updateUserPermissionsRequest = {
	// 	pull: $orgUsersStore.activeUser ? $orgUsersStore.activeUser.pull : false,
	// 	push: $orgUsersStore.activeUser ? $orgUsersStore.activeUser.push : false,
	// 	user_id: $orgUsersStore.activeUser ? $orgUsersStore.activeUser.user_id : '',
	// 	is_admin: false,
	// 	organization_id: user.id,
	// } as UpdateUserPermissionsRequest;

	let selectedMembers = new Map<string, OpenRegistryOrgMember>();

	let isUpdatePermsLoading = false;
	const updateUserPermissions = async () => {
		isUpdatePermsLoading = true;

		const response = await Promise.allSettled(
			Array.from(selectedMembers.values()).map((u) => {
				return openRegistryClient.updateUserPermissions(u);
			})
		);

		let foundErr = '';

		response.forEach((r) => {
			switch (r.status) {
				case 'fulfilled':
					if (!r.value.success) {
						foundErr = r.value.error;
					}
					break;
				case 'rejected':
					foundErr = r.reason;
			}
		});

		if (!foundErr) {
			togglePermsEdit();
			await listOrgUsers();
			isUpdatePermsLoading = false;
			return;
		}

		isUpdatePermsLoading = false;
	};

	const updateUserPermState = (e: CustomEvent<boolean>, u: OpenRegistryOrgMember, perm: 'push' | 'pull') => {
		if (perm === 'pull') {
			u.pull = e.detail;
		} else if (perm === 'push') {
			u.push = e.detail;
		}

		if (!e.detail) {
			u.is_admin = e.detail;
		}

		if (selectedMembers.has(u.user_id)) {
			const ok = compareUserPerms(u, selectedMembers.get(u.user_id)!);
			if (ok) {
				selectedMembers.delete(u.user_id);
				selectedMembers = new Map(selectedMembers);
				return;
			}
		}
		selectedMembers.set(u.user_id, u);
		selectedMembers = new Map(selectedMembers);
	};

	function compareUserPerms(first: OpenRegistryOrgMember, second: OpenRegistryOrgMember) {
		return first.pull === second.pull && first.push === second.push && first.is_admin === second.is_admin;
	}

	const refershOrgList = async () => {
		await listOrgUsers();
	};

	let isFiltered = false;
	const filterOrgMembers = async (e: Event) => {
		isFiltered = true;
		const target = e.target as HTMLInputElement;

		if (!target.value) {
			isFiltered = false;
			await listOrgUsers();
			return;
		}

		$orgUsersStore.filteredUsers = $orgUsersStore.users.filter((o) => {
			return o.user.username.includes(target.value);
		});
	};
</script>

<div class="flex flex-col gap-3 h-full w-full">
	{#if user.user_type === 'user'}
		<div class="w-full h-full min-h-[850px] flex justify-center items-center">
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
			<div class="flex justify-between py-2 w-11/12">
				<div class="flex items-center gap-3 w-2/5 lg:w-3/5 relative">
					<Textfield placeholder="Search org members" on:input={filterOrgMembers} class="px-9 -ml-6" />
					<SearchIcon class="square-5 text-slate-500 absolute left-4" />
				</div>
				<div class="flex justify-center items-center gap-3">
					<ButtonOutlined
						on:click={togglePermsEdit}
						class="text-primary-500 rounded px-4 flex justify-center items-center gap-2"
					>
						<span class="font-light">{!permsEdit ? 'Edit' : 'Cancel'}</span>
						<PencilIcon />
					</ButtonOutlined>
					{#if permsEdit}
						<ButtonSolid
							on:click={updateUserPermissions}
							isLoading={isUpdatePermsLoading}
							class="max-w-[150px] p-0 m-0 w-full flex justify-center items-center"
						>
							Save
							<CheckIcon class="h-6 w-6" />
						</ButtonSolid>
					{:else}
						<AddUsersToOrgModal on:user_add={refershOrgList} orgOwner={user} {openRegistryClient} />
					{/if}
				</div>
			</div>

			{#if (!$orgUsersStore.filteredUsers || $orgUsersStore.filteredUsers.length === 0) && !isFiltered}
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
						<AddUsersToOrgModal on:user_add={refershOrgList} orgOwner={user} {openRegistryClient} />
					</div>
				</div>
			{:else if isFiltered && $orgUsersStore.filteredUsers.length === 0}
				<div class="flex justify-center w-11/12 items-center">
					<div
						class="bg-primary-50/50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
							flex justify-center items-center"
					>
						<span class="text-slate-500 text-2xl"> No users found </span>
					</div>
				</div>
			{:else if isOrgListLoading}
				<div
					class="min-h-[100px] rounded border border-primary-100 w-11/12 flex justify-center items-center py-3 px-6 gap-6"
				>
					<span class="text-primary-400 font-semibold"> Loading... </span>
					<SpinnerCircle class="text-primary-400" />
				</div>
			{:else}
				{#each $orgUsersStore.filteredUsers as u, index (index)}
					<div
						id={index.toString()}
						class="min-h-[100px] rounded border border-primary-100 w-11/12 flex flex-col justify-between py-3 px-6 gap-6"
					>
						<div class="flex flex-col gap-6 w-full">
							<div class="flex justify-between w-full items-center">
								<div class="flex flex-col w-full gap-3 justify-between">
									<div class="flex gap-2 w-full justify-between items-start">
										<div class="flex w-full gap-2 justify-start items-center">
											<span
												class="text-2xl font-semibold text-primary-500 underline underline-offset-2"
											>
												{u.user.username}
											</span>
											<span class="text-slate-600">
												{`(${u.user.email})`}
											</span>
										</div>
									</div>

									<div class="flex flex-col justify-center items-start gap-3">
										<span class="font-semibold antialiased text-slate-600"> Permissions </span>
										<div class="flex justify-center items-center gap-2.5">
											{#if permsEdit}
												<div class="flex justify-center items-center">
													<Switch
														bind:checked={u.push}
														on:change={(e) => updateUserPermState(e, u, 'push')}
														label="Push"
													/>
												</div>
												<div class="flex justify-center items-center">
													<Switch
														bind:checked={u.pull}
														on:change={(e) => updateUserPermState(e, u, 'pull')}
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
	{/if}
</div>
