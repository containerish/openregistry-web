<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { ghStore } from "$lib/stores";
  import { CheckIcon, GithubIcon } from "$lib/icons";
  import type { AuthorisedRepository } from "../../../../../(marketing)/+layout.server";
  import Dialog from "$lib/dialog.svelte";
  import ButtonSolid from "$lib/button-solid.svelte";
  import type { PageData } from "./$types";
  import Textfield from "$lib/textfield.svelte";
  import type { CreateProjectState } from "$lib/types/index";
  import { Timestamp } from "@bufbuild/protobuf";
  import { createEventDispatcher } from "svelte";
  import { v4 as UuidV4 } from "@lukeed/uuid";

  let openDialog = false;

  export let data: PageData;
  const installationId = $page.url.searchParams.get("installation_id");

  let selectedRepo: string;
  export let handleNext: (index: number) => void;

  /*
	export let updateBuildProject: (
		opts: Partial<CreateProjectState>,
		prop: 'buildSettings' | 'environmentVariables' | 'all'
	) => void;
    */

  async function handleRepoSelect(repo: AuthorisedRepository) {
    selectedRepo = repo.repository.name as string;
    ghStore.setSelectedRepository(repo);
    ghStore.setAllAuthorisedRepositories(data.repoList);
    ghStore.setGithubUsername(repo.repository?.owner?.login ?? "");
    updateBuildProject(repo.repository.owner?.login ?? "");
  }

  const dispatch = createEventDispatcher();

  const updateBuildProject = (username: string) => {
    const project = {
      createdAt: Timestamp.fromDate(new Date()),
      id: UuidV4(),
      owner: username,
    } as CreateProjectState;

    dispatch("select_repo", project);
  };
</script>

<div class="w-full flex flex-col gap-6">
  <div class="flex flex-col justify-center items-center gap-2">
    <span class="text-2xl text-center font-bold text-primary-600"
      >Build your application with Github Actions</span
    >
    <div class="flex flex-col text-center text-xl text-slate-600">
      <span class="text-center text-sm lg:text-base">
        Select a repository to connect as your project’s source code. New
        commits will trigger OpenRegistry to automatically build and deploy your
        changes.
      </span>
    </div>
  </div>
  <hr class="border-1 border-gray-300" />
  <div>
    <div class="flex gap-2 items-center mt-6 text-primary-600">
      <GithubIcon class="h-6 w-6" />
      <span class="text-base lg:text-xl font-semibold">Github | </span>
      <span class="font-light text-sm">more coming soon</span>
    </div>
    <div class="flex flex-col relative">
      <div class="w-24 bg-primary-200 h-1 rounded-md" />
      <div class="bg-gray-300 h-[1px] mt-0.5 ml-24" />
    </div>
  </div>

  <div class="flex flex-col gap-2 justify-center items-start">
    <div class="flex items-center ml-2 text-slate-600">
      <span class="text-base lg:text-lg font-semibold text-slate-600">
        Github account</span
      >
    </div>
    <div class="flex relative w-2/5">
      <div class="w-full">
        <div class="flex items-center px-2" />
        <Textfield
          name="github account"
          type="search"
          disabled
          placeholder="github username"
          bind:value={data.githubUsername}
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <span class="ml-2 text-base lg:text-lg font-semibold text-slate-600"
      >Select a repository</span
    >
    {#if installationId && !data.repoList}
      <div class="flex justify-center items-center py-4 w-full">
        <svg
          class="animate-spin -ml-1 mr-3 h-8 w-8 text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
						5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span class="font-semibold text-slate-600">Loading...</span>``
      </div>
    {:else}
      <div class="grid-flow-row grid md:grid-cols-2 gap-3 text-lg">
        {#each data.repoList as repo (repo.repository.name)}
          <button
            aria-label="repository"
            on:click={() => handleRepoSelect(repo)}
            class="text-slate-700 text-sm xl:text-base rounded border-2 border-primary-100 w-full
						flex justify-center max-w-[330px] lg:max-w-full items-center py-2.5 lg:py-3 px-5 hover:shadow-2xl relative {repo
              .repository.name === selectedRepo
              ? 'shadow-2xl shadow-slate-200 bg-emerald-100/60'
              : 'bg-white'}"
          >
            {repo.repository.name}
            {#if repo.repository.name === selectedRepo}
              <CheckIcon
                class="w-5 h-5 text-emerald-500 absolute top-0 right-0 m-2"
              />
            {/if}
          </button>
        {/each}
      </div>
    {/if}
    <span class="text-slate-700 text-sm lg:text-base my-3">
      If your repository is not shown, it could be due to one of the following
      reasons:
    </span>
    <ol class="list-decimal text-slate-600 text-xs xl:text-sm ml-4 antialiased">
      <li>
        OpenRegistry does not have access to the repository. Please configure
        repository access for OpenRegistry app on Github.
      </li>
      <li>
        There are no branches in the repo. Please add a branch to the
        respository or choose a different repo for build project
      </li>
    </ol>
  </div>
  <hr class=" border-1 border-gray-300" />
  <div class="flex justify-between items-baseline">
    <span
      role="button"
      tabindex={1}
      on:click={() => goto("/apps/github/connect")}
      on:keypress={() => goto("/apps/github/connect")}
      class="text-slate-600 underline underline-offset-4 text-base cursor-pointer antialiased"
    >
      Cancel
    </span>
    <ButtonSolid
      disabled={!selectedRepo || data.repoList.length === 0}
      on:click={() => handleNext(1)}>Begin setup</ButtonSolid
    >
  </div>

  {#if openDialog}
    <Dialog class="shadow-3xl shadow-primary-600">
      <div class="px-5 py-10 flex flex-col justify-center items-center gap-6">
        <span class="text-slate-700 text-2xl font-bold antialiased">
          please select a repository!!
        </span>
        <span class="text-lg text-slate-700">
          in order to build the project, you must select a repository
        </span>
        <ButtonSolid type="submit" on:click={() => (openDialog = false)}
          >Got it!</ButtonSolid
        >
      </div>
    </Dialog>
  {/if}
</div>
