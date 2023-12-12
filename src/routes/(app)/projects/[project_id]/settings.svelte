<script lang="ts">
  import ButtonOutlined from "$lib/button-outlined.svelte";
  import { createTabs, melt } from "@melt-ui/svelte";
  import { cubicInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { twMerge } from "tailwind-merge";
  const handleSettingsTab = (opts: any) => {
    return opts.selected
      ? `font-semibold border-0 border-l-2 bg-slate-200 border-primary-400 text-start text-slate-700 text-sm md:text-base`
      : `border-none text-start text-slate-700 text-sm md:text-base`;
  };

  const {
    elements: { root, list, content, trigger },
    states: { value },
  } = createTabs({
    defaultValue: "tab-1",
  });

  let className = "";
  export { className as class };

  const triggers = [
    { id: "tab-1", title: "General" },
    { id: "tab-2", title: "Builds and Deployments" },
    { id: "tab-3", title: "Environment Variables" },
  ];

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });
</script>

<div
  use:melt={$root}
  class={twMerge(
    "flex flex-col overflow-hidden rounded-xl shadow-lg  data-[orientation=horizontal]:flex-row",
    className
  )}
>
  <div
    use:melt={$list}
    class="flex shrink-0 overflow-x-auto bg-primary-100
    data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-r min-h-max"
    aria-label="Manage your builds"
  >
    {#each triggers as triggerItem}
      <button use:melt={$trigger(triggerItem.id)} class="trigger h-2">
        {triggerItem.title}
        <!-- {#if $value === triggerItem.id}
          <div
            in:send={{ key: "trigger" }}
            out:receive={{ key: "trigger" }}
            class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary-100"
          />
        {/if} -->
      </button>
    {/each}
  </div>
  <div use:melt={$content("tab-1")} class="grow bg-white p-5">
    <div
      class="flex flex-col gap-9 text-slate-700"
      in:fly={{ y: 200, duration: 300 }}
    >
      <div class="flex flex-col gap-3">
        <div
          class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300
				rounded p-7 bg-slate-50"
        >
          <div class="flex flex-col gap-3">
            <span class="font-semibold text-primary-500 lg:text-lg"
              >Build details</span
            >
            <span class="text-sm"><b>Project name:</b> openregistry-test</span>
            <span class="text-sm"><b>Date Created:</b> Thu, March 12, 2023</span
            >
          </div>
          <ButtonOutlined class="md:w-1/3">Rename Project</ButtonOutlined>
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300 rounded p-7 bg-slate-50"
        in:fly={{ y: 200, duration: 300, delay: 50 }}
      >
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <class class="font-semibold text-primary-500 text-lg">Members</class
            >
            <class class=" text-xs">Invite members to collaborate</class>
          </div>
          <span class="text-sm"
            >invite people to share the build project and collabotare with
          </span>
        </div>
        <ButtonOutlined class="md:w-1/3">Manage Members</ButtonOutlined>
      </div>

      <div
        class="flex flex-col md:flex-row justify-between items-start gap-6 md:items-center border-2 border-slate-300
			rounded p-7 bg-slate-50"
        in:fly={{ y: 200, duration: 300, delay: 100 }}
      >
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <class class="font-semibold text-primary-500 text-lg"
              >Access Policy</class
            >
            <class class=" text-xs"
              >Control Access to your project's preview
            </class>
          </div>
          <span class="text-sm"
            >invite people to share the build project and collabotare with
          </span>
        </div>
        <ButtonOutlined class="md:w-1/3">Manage Policies</ButtonOutlined>
      </div>

      <div
        class="flex flex-col md:flex-row justify-between items-start gap-6 md:items-center border-2
			border-slate-300 rounded p-7 bg-slate-50"
        in:fly={{ y: 200, duration: 300, delay: 150 }}
      >
        <div class="flex flex-col gap-3 md:w-2/3">
          <span class="font-semibold text-lg text-rose-700">Delete Project</span
          >
          <span class="text-sm"
            >Deleting this project will permanently delete the project from
            openregistry and our databases and you will not be able to recover
            it. Along with it will go the environment variables and Access
            Policies
          </span>
        </div>
        <ButtonOutlined class="text-rose-700 border-rose-600 md:w-1/3"
          >Delete Project</ButtonOutlined
        >
      </div>
    </div>
  </div>
  <div use:melt={$content("tab-2")} class="grow bg-white p-5">
    <div class="flex flex-col gap-9">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <span class="font-semibold text-lg text-primary-500"
            >Branch Builds</span
          >
          <span class="text-sm"
            >specify the brach that triggers the build for each environment</span
          >
        </div>
        <div
          class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9
				bg-slate-50"
          in:fly={{ y: 200, duration: 300 }}
        >
          <div class="flex flex-col gap-6 items-start col-span-2 md:col-span-1">
            <div
              class="rounded-full bg-emerald-100 text-emerald-900 text-xs px-2 py-0.5"
            >
              Production
            </div>
            <span class="text-sm font-semibold">Production Branch:</span>
            <span class="text-sm font-semibold">Automatic Builds:</span>
          </div>
          <div class="grid grid-rows-3 gap-6">
            <span class=" row-start-2 text-sm">release-main</span>
            <span class="row-start-3 text-sm">Enabled</span>
          </div>
          <div
            class="col-span-4 md:col-span-3 flex w-full md:self-start md:justify-end"
          >
            <ButtonOutlined>Confirgure Production Builds</ButtonOutlined>
          </div>
        </div>

        <div
          class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9
			bg-slate-50"
          in:fly={{ y: 200, duration: 300, delay: 50 }}
        >
          <div class="flex flex-col gap-6 items-start col-span-2 md:col-span-1">
            <div
              class="rounded-full bg-slate-200 text-slate-800 text-xs px-2 py-0.5"
            >
              Preview
            </div>
            <span class="text-sm font-semibold">Branches Included:</span>
            <span class="text-sm font-semibold">Automatic Builds:</span>
          </div>
          <div class="col-span-2 grid grid-rows-3 gap-6">
            <span class=" row-start-2 text-sm">All non production branches</span
            >
            <span class="row-start-3 text-sm">Enabled</span>
          </div>
          <div
            class="col-span-4 md:col-span-2 flex w-full self-start md:justify-end"
          >
            <ButtonOutlined>Confirgure Preview Builds</ButtonOutlined>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col" in:fly={{ y: 200, duration: 300 }}>
          <span class="font-semibold text-lg text-primary-500"
            >Build Configuration</span
          >
          <span class=" text-sm"
            >specify the brach that triggers the build for each environment</span
          >
        </div>

        <div
          class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
          in:fly={{ y: 200, duration: 300, delay: 100 }}
        >
          <div class=" col-span-2 flex flex-col gap-6 items-start">
            <span class="text-sm font-semibold">Build command:</span>
            <span class="text-sm font-semibold">Build output Directory:</span>
            <span class="text-sm font-semibold">Root Directory:</span>
            <span class="text-sm font-semibold"
              >Build command on Pull request:</span
            >
          </div>
          <div class="flex flex-col gap-6 items-start">
            <span class=" row-start-2 text-sm">pnpm run build</span>
            <span class="row-start-3 text-sm">/.sveltekit/openregistry</span>
            <span class="row-start-3 text-sm">/</span>
            <span class="row-start-3 text-sm">Enabled</span>
          </div>
          <div
            class="col-span-3 md:col-span-2 flex w-full self-start md:justify-end pt-6"
          >
            <ButtonOutlined>Edit Configuration</ButtonOutlined>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div
          class="flex flex-col"
          in:fly={{ y: 200, duration: 300, delay: 100 }}
        >
          <span class="font-semibold text-lg text-primary-500">Hooks</span>
          <span class="text-sm"
            >specify the brach that triggers the build for each environment</span
          >
        </div>

        <div
          class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
          in:fly={{ y: 200, duration: 300, delay: 150 }}
        >
          <span class="text-sm"
            >Add a deploy hook by creating a name and selecting a desired branch</span
          >
          <ButtonOutlined>Add Hook</ButtonOutlined>
        </div>
      </div>
    </div>
  </div>
  <div use:melt={$content("tab-3")} class="grow bg-white p-5">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="text-primary-500 font-semibold text-lg">Production</span>
          <span class="text-sm"
            >Define variables for production environment</span
          >
        </div>
        <ButtonOutlined class="w-1/2">Edit Variables</ButtonOutlined>
      </div>

      <div
        class="border-2 border-slate-300 rounded"
        in:fly={{ y: 100, duration: 300 }}
      >
        <div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
          <span class="col-span-1 font-semibold">Variable name</span>
          <span class="col-span-2 font-semibold">Value</span>
        </div>
        <div class="bg-slate-50 min-h-[200px]" />
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div
        class="flex justify-between items-center"
        in:fly={{ y: 50, duration: 300, delay: 50 }}
      >
        <div class="flex flex-col gap-1">
          <span class="text-primary-500 font-semibold text-lg">Preview</span>
          <span class="text-sm">Define variables for treview environment</span>
        </div>
        <ButtonOutlined class="w-1/2">Edit Variables</ButtonOutlined>
      </div>

      <div
        class="border-2 border-slate-300 rounded"
        in:fly={{ y: 100, duration: 300, delay: 100 }}
      >
        <div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
          <span class="col-span-1 font-semibold">Variable name</span>
          <span class="col-span-2 font-semibold">Value</span>
        </div>
        <div class="bg-slate-50 min-h-[200px]" />
      </div>
    </div>
  </div>
</div>

<!-- <TabGroup defaultIndex={2} class="grid grid-cols-4 gap-9 px-3 py-9 min-w-[500px]">
	<TabList>
		<div class="col-span-1 flex flex-col w-full" in:fly={{ duration: 300, x: -100 }}>
			<Tab class={handleSettingsTab}>General</Tab>
			<Tab class={handleSettingsTab}>Builds and Deployments</Tab>
			<Tab let:selected class={handleSettingsTab}>Environment Variables</Tab>
		</div>
	</TabList>
	<TabPanels class="col-span-3">
		<TabPanel>
			<div class="flex flex-col gap-9 text-slate-700" in:fly={{ y: 200, duration: 300 }}>
				<div class="flex flex-col gap-3">
					<div
						class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300
						rounded p-7 bg-slate-50"
					>
						<div class="flex flex-col gap-3">
							<span class="font-semibold text-primary-500 lg:text-lg">Build details</span>
							<span class="text-sm"><b>Project name:</b> openregistry-test</span>
							<span class="text-sm"><b>Date Created:</b> Thu, March 12, 2023</span>
						</div>
						<ButtonOutlined class="md:w-1/3">Rename Project</ButtonOutlined>
					</div>
				</div>

				<div
					class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300 rounded p-7 bg-slate-50"
					in:fly={{ y: 200, duration: 300, delay: 50 }}
				>
					<div class="flex flex-col gap-3">
						<div class="flex flex-col">
							<class class="font-semibold text-primary-500 text-lg">Members</class>
							<class class=" text-xs">Invite members to collaborate</class>
						</div>
						<span class="text-sm"
							>invite people to share the build project and collabotare with
						</span>
					</div>
					<ButtonOutlined class="md:w-1/3">Manage Members</ButtonOutlined>
				</div>

				<div
					class="flex flex-col md:flex-row justify-between items-start gap-6 md:items-center border-2 border-slate-300
					rounded p-7 bg-slate-50"
					in:fly={{ y: 200, duration: 300, delay: 100 }}
				>
					<div class="flex flex-col gap-3">
						<div class="flex flex-col">
							<class class="font-semibold text-primary-500 text-lg">Access Policy</class>
							<class class=" text-xs">Control Access to your project's preview </class>
						</div>
						<span class="text-sm"
							>invite people to share the build project and collabotare with
						</span>
					</div>
					<ButtonOutlined class="md:w-1/3">Manage Policies</ButtonOutlined>
				</div>

				<div
					class="flex flex-col md:flex-row justify-between items-start gap-6 md:items-center border-2
					border-slate-300 rounded p-7 bg-slate-50"
					in:fly={{ y: 200, duration: 300, delay: 150 }}
				>
					<div class="flex flex-col gap-3 md:w-2/3">
						<span class="font-semibold text-lg text-rose-700">Delete Project</span>
						<span class="text-sm"
							>Deleting this project will permanently delete the project from openregistry and our
							databases and you will not be able to recover it. Along with it will go the
							environment variables and Access Policies
						</span>
					</div>
					<ButtonOutlined class="text-rose-700 border-rose-600 md:w-1/3"
						>Delete Project</ButtonOutlined
					>
				</div>
			</div>
		</TabPanel>
		<TabPanel class="flex flex-col text-slate-700">
			<div class="flex flex-col gap-9">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col">
						<span class="font-semibold text-lg text-primary-500">Branch Builds</span>
						<span class="text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>
					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9
						bg-slate-50"
						in:fly={{ y: 200, duration: 300 }}
					>
						<div class="flex flex-col gap-6 items-start col-span-2 md:col-span-1">
							<div class="rounded-full bg-emerald-100 text-emerald-900 text-xs px-2 py-0.5">
								Production
							</div>
							<span class="text-sm font-semibold">Production Branch:</span>
							<span class="text-sm font-semibold">Automatic Builds:</span>
						</div>
						<div class="grid grid-rows-3 gap-6">
							<span class=" row-start-2 text-sm">release-main</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-4 md:col-span-3 flex w-full md:self-start md:justify-end">
							<ButtonOutlined>Confirgure Production Builds</ButtonOutlined>
						</div>
					</div>

					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9
					bg-slate-50"
						in:fly={{ y: 200, duration: 300, delay: 50 }}
					>
						<div class="flex flex-col gap-6 items-start col-span-2 md:col-span-1">
							<div class="rounded-full bg-slate-200 text-slate-800 text-xs px-2 py-0.5">
								Preview
							</div>
							<span class="text-sm font-semibold">Branches Included:</span>
							<span class="text-sm font-semibold">Automatic Builds:</span>
						</div>
						<div class="col-span-2 grid grid-rows-3 gap-6">
							<span class=" row-start-2 text-sm">All non production branches</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-4 md:col-span-2 flex w-full self-start md:justify-end">
							<ButtonOutlined>Confirgure Preview Builds</ButtonOutlined>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col" in:fly={{ y: 200, duration: 300 }}>
						<span class="font-semibold text-lg text-primary-500">Build Configuration</span>
						<span class=" text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>

					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
						in:fly={{ y: 200, duration: 300, delay: 100 }}
					>
						<div class=" col-span-2 flex flex-col gap-6 items-start">
							<span class="text-sm font-semibold">Build command:</span>
							<span class="text-sm font-semibold">Build output Directory:</span>
							<span class="text-sm font-semibold">Root Directory:</span>
							<span class="text-sm font-semibold">Build command on Pull request:</span>
						</div>
						<div class="flex flex-col gap-6 items-start">
							<span class=" row-start-2 text-sm">pnpm run build</span>
							<span class="row-start-3 text-sm">/.sveltekit/openregistry</span>
							<span class="row-start-3 text-sm">/</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-3 md:col-span-2 flex w-full self-start md:justify-end pt-6">
							<ButtonOutlined>Edit Configuration</ButtonOutlined>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col" in:fly={{ y: 200, duration: 300, delay: 100 }}>
						<span class="font-semibold text-lg text-primary-500">Hooks</span>
						<span class="text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>

					<div
						class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
						in:fly={{ y: 200, duration: 300, delay: 150 }}
					>
						<span class="text-sm"
							>Add a deploy hook by creating a name and selecting a desired branch</span
						>
						<ButtonOutlined>Add Hook</ButtonOutlined>
					</div>
				</div>
			</div>
		</TabPanel>
		<TabPanel class="flex flex-col gap-9 text-slate-700">
			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div class="flex flex-col gap-1">
						<span class="text-primary-500 font-semibold text-lg">Production</span>
						<span class="text-sm">Define variables for production environment</span>
					</div>
					<ButtonOutlined class="w-1/2">Edit Variables</ButtonOutlined>
				</div>

				<div class="border-2 border-slate-300 rounded" in:fly={{ y: 100, duration: 300 }}>
					<div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
						<span class="col-span-1 font-semibold">Variable name</span>
						<span class="col-span-2 font-semibold">Value</span>
					</div>
					<div class="bg-slate-50 min-h-[500px]" />
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center" in:fly={{ y: 50, duration: 300, delay: 50 }}>
					<div class="flex flex-col gap-1">
						<span class="text-primary-500 font-semibold text-lg">Preview</span>
						<span class="text-sm">Define variables for treview environment</span>
					</div>
					<ButtonOutlined class="w-1/2">Edit Variables</ButtonOutlined>
				</div>

				<div
					class="border-2 border-slate-300 rounded"
					in:fly={{ y: 100, duration: 300, delay: 100 }}
				>
					<div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
						<span class="col-span-1 font-semibold">Variable name</span>
						<span class="col-span-2 font-semibold">Value</span>
					</div>
					<div class="bg-slate-50 min-h-[500px]" />
				</div>
			</div>
		</TabPanel>
	</TabPanels>
</TabGroup> -->

<style lang="postcss">
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: default;
    user-select: none;

    border-radius: 0;
    background-color: theme(colors.neutral.100);

    color: theme(colors.slate.600);
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

    &[data-state="active"] {
      @apply focus:relative;
      background-color: white;
      color: theme(colors.primary-400);
    }
  }

</style>
