<script lang="ts">
  import ButtonOutlined from "$lib/button-outlined.svelte";
  import ButtonSolid from "$lib/button-solid.svelte";
  import Info from "$lib/icons/info.svelte";
  import Textfield from "$lib/textfield.svelte";
  import Select from "$lib/components/select.svelte";
  import { SearchIcon } from "$lib/icons";
  import ExternalLink from "$lib/icons/external-link.svelte";
  import Github from "$lib/icons/github.svelte";

  let isOrg = false;
  let isUser = false;
  let getStarted = true;

  let filterOptions = { filterBy: ["Namespace", "Username", "References"] };
  let sortOptions = { sortBy: ["Date Created", "Date Modified", "Name"] };
</script>

<div class="flex flex-col gap-3 h-full w-full">
  {#if getStarted}
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
        <ButtonSolid class="mt-6">Convert into Org</ButtonSolid>
      </div>
    </div>
  {:else if isOrg}
    <!-- lsit of users with their roles in your organisation -->
    <div
      class="flex w-full justify-center items-center h-full flex-col gap-6 py-9"
    >
      <div class="flex justify-between w-11/12">
        <div class="flex items-center gap-3 w-2/5 relative">
          <Textfield class="px-9 -ml-6" />
          <ButtonOutlined>Search</ButtonOutlined>
          <SearchIcon class="square-5 text-slate-500 absolute left-4" />
        </div>
        <div class="flex gap-3 items-center">
          <Select title="Filter by" options={filterOptions} />
          <Select
            title="Sort by"
            options={sortOptions}
            placeholder="Last Modified"
          />
        </div>
      </div>
      <div
        class=" min-h-[200px] rounded border border-primary-100 w-11/12 flex flex-col justify-between py-3 px-6 gap-6"
      >
        <div class="flex flex-col gap-6">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <span class=" text-3xl text-primary-500 font-body">#</span>
              <span
                class=" text-2xl font-semibold text-primary-500 underline underline-offset-2"
                >OpenRegistry</span
              >
            </div>
            <a
              href="/"
              class="text-primary-500 underline underline-offset-2 flex items-center gap-1"
            >
              veiw details
              <ExternalLink />
            </a>
          </div>
          <div class="flex gap-2 items-center">
            <Github class=" square-5" />
            <span class=" font-semibold text-slate-600"
              >containerish/something</span
            >
          </div>
        </div>
        <div
          class=" flex justify-between items-center border border-primary-100/50 border-l-4 border-t
          border-t-primary-100 border-l-emerald-500/60 h-11 -mx-6 -my-3"
        ></div>
      </div>
    </div>
  {:else}{/if}
</div>
