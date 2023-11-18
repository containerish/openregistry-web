<script lang="ts">
  import Pagination from "$lib/pagination.svelte";
  import { onMount, setContext } from "svelte";
  import { fly, slide } from "svelte/transition";
  import Checkbox from "$lib/checkbox.svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { navigating, page } from "$app/stores";
  import Menu from "$lib/headless/menu.svelte";
  import { MenuItem } from "@rgossiaux/svelte-headlessui";
  import { ClockIcon, ArrowRIcon, FilterIcon, PencilIcon } from "$lib/icons";
  import { pulseStore } from "$lib/components/pulse";
  import { Repository, Loader } from "$lib/components";
  import ButtonSolid from "$lib/button-solid.svelte";
  import ButtonOutlined from "$lib/button-outlined.svelte";
  import Dialog from "$lib/dialog.svelte";
  import type { PageData } from "./$types";
  import { DefaultPageSize } from "$lib/constants";
  import { RepositoryCatalog } from "$lib/types/registry";
  import AdvanceFilters from "$lib/components/advanceFilters.svelte";
  import AddAccount from "$lib/icons/add-account.svelte";

  export let data: PageData;

  let sortBy = "namespace";
  let openErrorModal = false;

  const [popperRef, popperContent] = createPopperActions({
    placement: "top-start",
    strategy: "fixed",
  });

  const extraOpts = {
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  };

  const fetchPageData = async (offset: number) => {
    const url = new URL("/apis/registry/list/catalog", $page.url.origin);
    url.searchParams.set("page_size", DefaultPageSize.toString());
    url.searchParams.set("offset", (DefaultPageSize * offset).toString());
    url.searchParams.set("sort_by", sortBy);
    const response = await fetch(url);

    if (response.status !== 200) {
      return;
    }

    const repoCatalog = await response.json();
    const parsed = RepositoryCatalog.safeParse(repoCatalog);
    if (parsed.success) {
      catalog = parsed.data;
    }
    return offset;
  };

  setContext("fetchPageData", fetchPageData);
  let catalog: RepositoryCatalog;

  onMount(async () => {
    const query = $page.url.searchParams.get("q");
    if (query) {
      const url = new URL("/apis/registry/list/repositories", $page.url.origin);
      url.searchParams.set("query", query);
      const response = await fetch(url);
      if (response.status !== 200) {
        openErrorModal = true;
        catalog.repositories = [];
        return;
      }
      catalog = await response.json();
      return;
    }

    const url = new URL("/apis/registry/list/catalog", $page.url.origin);
    url.searchParams.set("page_size", DefaultPageSize.toString());

    const response = await fetch(url);

    if (response.status !== 200) {
      openErrorModal = true;
      return;
    }

    catalog = await response.json();
  });

  let showFilter = false;
  const toggleFilter = () => {
    showFilter = !showFilter;
  };

  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };

  let showTooltip = false;

  setContext("toggleModal", toggleModal);
  $: {
    pulseStore.setPulseState(!$navigating && !!catalog);
  }
</script>

<svelte:head>
  <title>Explore | OpenRegistry</title>
</svelte:head>

<!-- transition:fly={{ y: 200, duration: 2000 }} -->
<Loader>
  <div class="flex justify-center items-start w-full h-full min-w-max">
    <div
      class="{data.authenticated
        ? 'justify-start'
        : 'justify-center'} flex items-start w-full h-full max-w-[3000px] my-8"
    >
      <div
        class="flex flex-col w-full my-8 items-start max-w-[850px] px-9 lg:px-16"
      >
        <div
          class="flex flex-row gap-10 justify-between items-center w-full pb-2 m-2"
        >
          <Menu title="Sort">
            <MenuItem>
              <button
                aria-label="sort by last updated"
                on:click={() => {
                  sortBy = "last_updated";
                  fetchPageData(0);
                }}
                class="{sortBy === 'last_updated'
                  ? 'font-normal bg-white'
                  : ''} 
                				w-full py-3 border-none inline-flex items-center bg-white justify-center rounded-b-none
								rounded gap-2 m-0 hover:bg-primary-100 text-sm"
              >
                <ClockIcon class="h-5 w-5" />
                Last Updated
              </button>
            </MenuItem>
            <MenuItem class="bg-gray-100">
              <button
                aria-label="sort by image name"
                on:click={() => {
                  sortBy = "namespace";
                  fetchPageData(0);
                }}
                class="{sortBy === 'namespace' ? 'font-normal bg-white' : ''} 
         						inline-flex py-3 justify-center gap-2 items-center w-full m-0 border-none rounded-t-none
								rounded-md hover:bg-primary-100 text-sm"
              >
                <PencilIcon class="h-5 w-5" />
                <!-- <div -->
                <!-- 	class="rounded-full border-2 border-slate-600 text-slate-600 text-sm h-4 -->
                <!-- 	inline-flex justify-center items-center w-4" -->
                <!-- > -->
                <!-- 	A -->
                <!-- </div> -->
                Image Name
              </button>
            </MenuItem>
          </Menu>

          <!-- advance filters -->
          <ButtonOutlined class="gap-2" on:click={toggleFilter}>
            Advance Filter
            <FilterIcon />
          </ButtonOutlined>
        </div>
        <div
          class="w-full flex flex-col justify-center items-center"
          in:fly={{ y: 200, duration: 300 }}
        >
          {#if catalog && catalog.repositories && catalog.repositories.length > 0}
            <div class="w-full">
              {#each catalog.repositories as repo}
                <Repository
                  username={data.user.username}
                  repository={repo}
                  compact={false}
                />
              {/each}
            </div>

            {#if catalog.repositories.length > DefaultPageSize}
              <div class="flex py-4">
                <Pagination
                  pages={Math.ceil(catalog.total / DefaultPageSize)}
                />
              </div>
            {/if}
          {:else}
            <div class="flex w-full justify-center items-center">
              <div
                class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
					flex justify-center items-center"
              >
                <span class="text-slate-500 text-2xl">No Repositories</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
    {#if showFilter}
      <div
        class="w-1/3 h-full bg-primary-100/20 border-2 border-primary-100/50 py-9 shadow-inner"
        in:fly={{ duration: 300, x: -20 }}
        out:fly={{ duration: 300, x: 20 }}
      >
        <AdvanceFilters />
      </div>
    {/if}
  </div>
</Loader>
