<script lang="ts">
  import ButtonSolid from "$lib/button-solid.svelte";
  import PlainCross from "$lib/icons/plain-cross.svelte";
  import UserPlus from "$lib/icons/user-plus.svelte";
  import ListBox from "$lib/listBox.svelte";
  import Textfield from "$lib/textfield.svelte";
  import { createDialog, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";
  import Switch from "./switch.svelte";
  import ButtonOutlined from "$lib/button-outlined.svelte";

  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      description,
      close,
      portalled,
    },
    states: { open },
  } = createDialog({
    forceVisible: false,
  });

  type ListItem = {
    name: string;
    id: number;
    disabled: boolean;
    handler?: (val: unknown) => void;
  };

  let listBoxItems: ListItem[] = [{ name: "user1", disabled: false, id: 1 }];
</script>

<ButtonSolid class="max-w-[150px] w-full flex justify-center items-center">
  <button class="flex gap-3" use:melt={$trigger}>
    Add Users
    <UserPlus />
  </button>
</ButtonSolid>

<div use:melt={$portalled} class="w-full h-full">
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-primary-800/50"
      transition:fade={{ duration: 150 }}
    />

    <div
      class="flex justify-start items-center fixed left-[50%] bg-white top-[50%] z-50 w-[50vw]
    max-w-[630px] translate-x-[-50%] translate-y-[-50%] md:flex-row shadow-3xl shadow-primary-800/40 rounded"
      use:melt={$content}
    >
      <div class="flex flex-col gap-3 p-9 relative w-full items-start">
        <button use:melt={$close}>
          <PlainCross
            class="absolute w-6 h-6 text-slate-500 top-0 right-0 m-2"
          />
        </button>

        <div class="w-full">
          <span
            class="text-2xl font-semibold text-primary-500"
            use:melt={$title}
          >
            Add users
          </span>
          <p class="text-sm text-slate-500 max-w-md antialiased">
            Add one or more users to your organisation and set permissions for
            each of them with simple toggles
          </p>
        </div>
        <ListBox items={listBoxItems} />

        <!-- {#each users as user} -->
        <div class="flex justify-between w-full items-center pr-3">
          <div
            class="flex justify-between w-11/12 border border-primary-100 rounded p-3"
          >
            <span class=" text-lg font-medium text-primary-400"
              >{"<Username>"}</span
            >
            <div class="flex gap-6">
              <div class="flex justify-center items-center">
                <span class=" text-slate-700">Pull</span>
                <Switch />
              </div>
              <div class="flex justify-center items-center">
                <span class=" text-slate-700">Push</span>
                <Switch />
              </div>
            </div>
          </div>
          <button>
            <PlainCross class="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <!-- {/each} -->
        <div class="flex justify-center gap-6 items-center w-full pt-6 -mb-3">
          <ButtonOutlined class="m-0 p-0">
            <button use:melt={$close}> Cancel </button></ButtonOutlined
          >
          <ButtonSolid>Confirm</ButtonSolid>
        </div>
      </div>
    </div>
  {/if}
</div>
