<script lang="ts">
  import ButtonOutlined from "$lib/button-outlined.svelte";
  import ButtonSolid from "$lib/button-solid.svelte";
  import Info from "$lib/icons/info.svelte";
  import Textfield from "$lib/textfield.svelte";
  import Select from "$lib/components/select.svelte";
  import { SearchIcon, UserPlusIcon } from "$lib/icons";
  import ExternalLink from "$lib/icons/external-link.svelte";
  import Github from "$lib/icons/github.svelte";
  import type {
    OpenRegistryOrgMember,
    OpenRegistryUserType,
  } from "$lib/types/user";
  import { OpenRegistryClient } from "$lib/client/openregistry";
  import { onMount } from "svelte";
  import Checkbox from "$lib/checkbox.svelte";
  import Chip from "./Chip.svelte";
  import AddUsersToOrgModal from "./addUsersToOrgModal.svelte";

  export let user: OpenRegistryUserType = {
    created_at: new Date(),
    email: "johndoe@dfg.com",
    username: "johndoe",
    user_type: "organization",
    is_active: true,
    identities: {},
    id: "sdlafjdjfghjaljfj123449",
    is_org_owner: true,
    favorite_repositories: [],
    github_connected: false,
    updated_at: new Date(),
    webauthn_connected: false,
  };
  const openRegistryClient = new OpenRegistryClient(fetch);
  let filterOptions = { filterBy: ["Namespace", "Username", "References"] };
  let sortOptions = { sortBy: ["Date Created", "Date Modified", "Name"] };

  let isConvertOrgLoading = false;
  const convertUserToOrg = async () => {
    isConvertOrgLoading = true;
    console.log("user: ", user);
    const response = await openRegistryClient.convertAccountToOrg(user.id);
    isConvertOrgLoading = false;
    console.log("response: ", response);
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

    console.log("list user error:", response);
  };

  $: console.log("org users: ", orgUsers);

  const handleAddOrdUsers = () => {};

</script>

<div class="flex flex-col gap-3 h-full w-full">
  {#if user.user_type === "user"}
    <div class="w-full h-full min-h-[1000px] flex justify-center items-center">
      <div
        class="flex flex-col justify-center items-center gap-3 bg-primary-100/30 p-9 rounded border border-primary-200/50"
      >
        <div class="flex gap-2 items-center mb-3">
          <span class="text-primary-500 text-2xl font-semibold">Note</span>
          <Info class="w-5 h-5 text-primary-500" />
        </div>
        <p class=" max-w-lg text-slate-700 antialiased">
          Converting your Profile to an Organisation opens up possibilities like
          being able to add user to your organisation and managing their
          permissions.
        </p>
        <p class=" max-w-lg text-slate-600 antialiased">
          Please note that once you have converted into an Org, you cannot
          revert the change to become a user again
        </p>
        <ButtonSolid
          isLoading={isConvertOrgLoading}
          class="mt-6"
          on:click={convertUserToOrg}
        >
          Convert into Org
        </ButtonSolid>
      </div>
    </div>
  {:else if user.user_type === "organization"}
    <!-- lsit of users with their roles in your organisation -->
    <div class="flex w-full justify-center items-center h-full flex-col gap-2">
      {#if orgUsers.length > 0}
        <div class="flex justify-between py-2 w-11/12">
          <div class="flex items-center gap-3 w-3/5 relative">
            <Textfield class="px-9 -ml-6" />
            <ButtonOutlined>Search</ButtonOutlined>
            <SearchIcon class="square-5 text-slate-500 absolute left-4" />
          </div>
          <ButtonSolid class="">
            Add User
            <UserPlusIcon />
          </ButtonSolid>
          <!-- <div class="flex gap-3 items-center"> -->
          <!-- 	<Select -->
          <!-- 		title="Sort by" -->
          <!-- 		options={sortOptions} -->
          <!-- 		placeholder="Last Modified" -->
          <!-- 	/> -->
          <!-- </div> -->
        </div>
      {/if}

      {#if !orgUsers || orgUsers.length === 0}
        <div
          class="w-full h-full min-h-[800px] flex justify-center items-center"
        >
          <div
            class="flex flex-col justify-center items-center gap-3 bg-primary-100/30 p-9 rounded border border-primary-200/50"
          >
            <div class="flex gap-2 items-center mb-3">
              <span class="text-primary-500 text-2xl font-semibold"
                >Add Users to your organization</span
              >
              <Info class="w-5 h-5 text-primary-500" />
            </div>
            <p class=" max-w-lg text-slate-700 antialiased">
              Your organization does not have any members yet. Please add some
              users and configure their permissions
            </p>
            <p class=" max-w-lg text-slate-600 antialiased">
              Please note that once you have converted into an Org, you cannot
              revert the change to become a user again
            </p>
            <!-- <ButtonSolid
              isLoading={isConvertOrgLoading}
              class="mt-6"
              on:click={handleAddOrdUsers}
            >
              Add Users
              <UserPlusIcon />
            </ButtonSolid> -->
            <AddUsersToOrgModal/>
          </div>
        </div>
      {:else}
        {#each orgUsers as u}
          <div
            class="min-h-[100px] rounded border border-primary-100 w-11/12 flex flex-col justify-between py-3 px-6 gap-6"
          >
            <div class="flex flex-col gap-6">
              <div class="flex justify-between items-center">
                <div class="flex flex-col gap-3 justify-between">
                  <div class="flex gap-2 justify-start items-center">
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

                  <div class="flex flex-col justify-center items-start gap-3">
                    <span class="font-semibold antialiased text-slate-600">
                      Permissions
                    </span>
                    <div class="flex justify-center items-center gap-2.5">
                      {#if u.is_admin}
                        <Chip label="Admin" />
                        {#if u.pull}
                          <Chip label="Pull" />
                        {/if}
                        {#if u.push}
                          <Chip label="Push" />
                        {/if}
                      {:else}
                        {#if u.pull}
                          <Chip label="Pull" />
                        {/if}
                        {#if u.push}
                          <Chip label="Push" />
                        {/if}
                      {/if}
                    </div>
                  </div>
                </div>
                <a
                  href="/"
                  class="text-primary-500 underline underline-offset-2 flex items-center gap-1"
                >
                  View details
                  <ExternalLink />
                </a>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {:else}{/if}
</div>
