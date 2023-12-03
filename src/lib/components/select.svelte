<script lang="ts">
  import Check from "$lib/icons/check.svelte";
  import ChevronDown from "$lib/icons/chevron-down.svelte";
  import { createSelect, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";

  export let options = {};
  export let placeholder = "Show All";
  export let title = "";

  const {
    elements: { trigger, menu, option, group, groupLabel, label },
    states: { selectedLabel, open },
    helpers: { isSelected },
  } = createSelect({
    forceVisible: true,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true,
    },
  });
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label class="block text-slate-700" use:melt={$label}>{title}</label>
  <button
    class="flex h-10 min-w-[190px] items-center justify-between rounded bg-white px-3 py-2
    text-slate-700 hover:shadow transition-opacity hover:opacity-90 border border-primary-100"
    use:melt={$trigger}
    aria-label="options"
  >
    {$selectedLabel || placeholder}
    <ChevronDown class="square-5" />
  </button>
  {#if $open}
    <div
      class="z-10 flex max-h-[300px] flex-col
      overflow-y-auto rounded-lg bg-white p-1
      shadow focus:!ring-0"
      use:melt={$menu}
      transition:fade={{ duration: 150 }}
    >
      {#each Object.entries(options) as [key, arr]}
        <div use:melt={$group(key)}>
          {#each arr as item}
            <div
              class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-slate-800
                hover:bg-primary-100 focus:z-10
                focus:text-slate-700
                data-[highlighted]:bg-primary-200 data-[highlighted]:text-slate-800
                data-[disabled]:opacity-50"
              use:melt={$option({ value: item })}
            >
              <div class="check {$isSelected(item) ? 'block' : 'hidden'}">
                <Check
                  class="square-4 absolute z-20 left-2 -translate-x-1/2 ml-1 translate-y-1 text-primary-500"
                />
              </div>
              {item}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
