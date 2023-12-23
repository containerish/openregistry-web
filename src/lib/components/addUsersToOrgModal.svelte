<script lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import PlainCross from '$lib/icons/plain-cross.svelte';
	import UserPlus from '$lib/icons/user-plus.svelte';
	import ListBox from '$lib/listBox.svelte';
	import { createDialog, melt, type ComboboxOption } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import Switch from './switch.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import type { OpenRegistryClient } from '$lib/client/openregistry';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import type { ListItem } from '$lib/types/components';
	import type { AddUserToOrgRequest, OpenRegistryUserType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let openRegistryClient: OpenRegistryClient;
	export let orgOwner: OpenRegistryUserType;
	export let onSelectedChange: ChangeFn<ComboboxOption<ListItem<OpenRegistryUserType>>[] | undefined> = function (
		opt
	) {
		if (opt.next) {
			selectedUsers = opt.next.map((o) => o.value.item);
		}

		return opt.next;
	};

	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
		defaultOpen: false,
	});

	let listBoxItems: ListItem<OpenRegistryUserType>[] = [];

	const searchUser = async (query: string, selected: ComboboxOption<ListItem>[]) => {
		// clear selections
		if (selectedUsers.length === 0) {
			selected = [];
		}
		const response = await openRegistryClient.searchUsers(query);
		if (response.success) {
			listBoxItems = response.data.map((u, i) => {
				return {
					item: u,
					label: u.username,
					id: i + 1,
					disabled: false,
				} satisfies ListItem<OpenRegistryUserType>;
			});
			return;
		}

		console.log('search user error: ', response);
	};

	let selectedUsers: OpenRegistryUserType[] = [];

	const removeUserFromList = (username: string) => {
		const userIndex = selectedUsers.findIndex((u) => u.username === username);
		selectedUsers.splice(userIndex, 1);
		selectedUsers = [...selectedUsers];

		onSelectedChange({
			curr: undefined,
			next: selectedUsers.map((u, i) => {
				return {
					label: u.username,
					value: {
						label: u.username,
						item: u,
						id: i,
						disabled: false,
					},
				};
			}),
		});
	};

	$: addUsersToOrgRequest = {
		organization_id: orgOwner.id,
		users: selectedUsers.map((u) => {
			return {
				id: u.id,
				pull: false,
				push: false,
				is_admin: false,
			};
		}),
	} as AddUserToOrgRequest;

	const updateUserPerms = (userId: string, perm: 'Push' | 'Pull') => {
		const userIndex = addUsersToOrgRequest.users.findIndex((u) => u.id === userId);
		const userPerm = addUsersToOrgRequest.users[userIndex];
		if (perm === 'Pull') {
			userPerm.pull = true;
		}

		if (perm === 'Push') {
			userPerm.push = true;
		}

		if (userPerm.pull && userPerm.push) {
			userPerm.is_admin = true;
		}

		addUsersToOrgRequest.users[userIndex] = userPerm;
	};

	const dispatch = createEventDispatcher();

	let isAddUsersLoading = false;
	const confirmAddUsersToOrg = async () => {
		isAddUsersLoading = true;
		const response = await openRegistryClient.addUsersToOrg(addUsersToOrgRequest);
		console.log('response:', response);
		isAddUsersLoading = false;
		dispatch('user_add', true);
		$open = false;
	};
</script>

<ButtonSolid class="max-w-[150px] p-0 m-0 w-full flex justify-center items-center">
	<button class="flex gap-3 h-full w-full justify-center items-center" use:melt={$trigger}>
		Add Users
		<UserPlus />
	</button>
</ButtonSolid>

<div use:melt={$portalled} class="w-full h-full">
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />

		<div
			class="flex justify-start items-center fixed left-[50%] bg-white top-[50%] z-50 w-[50vw]
    max-w-[630px] translate-x-[-50%] translate-y-[-50%] md:flex-row shadow-3xl shadow-primary-800/40 rounded"
			use:melt={$content}
		>
			<div class="flex flex-col gap-3 p-9 relative w-full items-start">
				<button use:melt={$close}>
					<PlainCross class="absolute w-6 h-6 text-slate-500 top-0 right-0 m-2" />
				</button>

				<div class="w-full">
					<span class="text-2xl font-semibold text-primary-500" use:melt={$title}> Add users </span>
					<p class="text-sm text-slate-500 max-w-md antialiased">
						Add one or more users to your organisation and set permissions for each of them with simple
						toggles
					</p>
				</div>
				<ListBox
					{onSelectedChange}
					onChangeHandler={searchUser}
					placeholder="Search users - eg: Johndoe"
					items={listBoxItems}
				/>

				<!-- {#each users as user} -->
				<div class="flex justify-between flex-col gap-3 w-full items-center">
					{#if selectedUsers.length > 0}
						{#each selectedUsers as u}
							<div class="flex justify-between w-full border border-primary-100 rounded p-3">
								<span class=" text-lg font-medium text-primary-400">{u.username}</span>
								<div class="flex gap-6">
									<div class="flex justify-center items-center">
										<Switch on:change={() => updateUserPerms(u.id, 'Pull')} label="Pull" />
									</div>
									<div class="flex justify-center items-center">
										<Switch on:change={() => updateUserPerms(u.id, 'Push')} label="Push" />
									</div>
									<button on:click={() => removeUserFromList(u.username)}>
										<PlainCross class="w-4 h-4 text-slate-500" />
									</button>
								</div>
							</div>
						{/each}
					{:else}
						<div
							class="flex flex-col gap-3 justify-center items-center h-full w-full bg-primary-100/50 py-3"
						>
							<span class="text-lg font-semibold">No users selected</span>
							<span>Please search for users using the search box above</span>
						</div>
					{/if}
				</div>
				<!-- {/each} -->
				<div class="flex justify-center gap-6 items-center w-full pt-6 -mb-3">
					<ButtonOutlined class="m-0 p-0">
						<button use:melt={$close}> Cancel </button></ButtonOutlined
					>
					<ButtonSolid isLoading={isAddUsersLoading} on:click={confirmAddUsersToOrg}>Confirm</ButtonSolid>
				</div>
			</div>
		</div>
	{/if}
</div>
