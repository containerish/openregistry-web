<script lang="ts">
  type ListItem = {
    name: string;
    id: number;
    disabled: boolean;
    handler?: (val: unknown) => void;
  };

  export let items: ListItem[];

  $: items_render = new Map(Object.entries(items));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let selectedItem: ListItem = items[0];
  function setSelectItem(e: CustomEvent<string>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectedItem = items_render.get(e.detail)!;
    if (selectedItem?.handler) {
      selectedItem.handler(selectedItem.name);
    }
  }
  import { createCombobox, melt } from "@melt-ui/svelte";
  import { Check, ArrowDownIcon, ChevronIcon } from "$lib/icons";
  import { fly } from "svelte/transition";

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput },
    helpers: { isSelected },
  } = createCombobox({
    forceVisible: true,
  });
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label use:melt={$label}>
    <span class="text-sm font-medium text-primary-900">*****</span>
  </label>

  <div class="relative">
    <input
      use:melt={$input}
      class="flex h-10 items-center justify-between rounded-lg bg-white
			px-3 pr-12 text-black"
      placeholder="Best book ever"
    />
    <div
      class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-primary-900"
    >
      {#if $open}
        <ChevronIcon class="square-4" />
      {:else}
        <ChevronIcon class="square-4 rotate-180" />
      {/if}
    </div>
  </div>
</div>
{#if $open}
  <ul
    class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
  >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div
      class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
      tabindex="0"
    >
      {#each items as item (item.id)}
        <li
          use:melt={$option({
            value: item,
            label: item.name,
            disabled: item.disabled,
          })}
          class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
		  data-[highlighted]:bg-primary-200 data-[highlighted]:text-primary-900
			data-[disabled]:opacity-50"
        >
          {#if $isSelected(item)}
            <div class="check absolute left-2 top-1/2 z-10 text-primary-900">
              <Check class="square-4" />
            </div>
          {/if}
          <div class="pl-4">
            <span class="font-medium">{item.name}</span>
          </div>
        </li>
      {:else}
        <li
          class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
		  data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-700"
        >
          No results found
        </li>
      {/each}
    </div>
  </ul>
{/if}

<!-- //  <div class="flex justify-center items-start flex-col">
// 	<div class="w-72">
// 		<div>
// 			<div class="relative mt-1">
// 				<Listbox value={selectedItem} on:change={setSelectItem}>
// 					<ListboxButton
// 						aria-label="list button"
// 						class="flex w-full px-4 py-3 h-10 lg:h-11 justify-between items-center border border-primary-100 rounded-md
// 						placeholder-slate-700 focus:bg-slate-50
// 						 focus:border-primary-200 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500
// 						disabled:text-slate-400"
// 					>
// 						{selectedItem.name}
// 						<ChevronIcon />
// 					</ListboxButton>
// 					<Transition
// 						enter="transition duration-100 ease-out"
// 						enterFrom="transform scale-95 opacity-0"
// 						enterTo="transform scale-100 opacity-100"
// 						leave="transition duration-75 ease-out"
// 						leaveFrom="transform scale-100 opacity-100"
// 						leaveTo="transform scale-95 opacity-0"
// 					>
// 						<ListboxOptions
// 							class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1
// 							 ring-black ring-opacity-5 focus:outline-none"
// 						>
// 							{#each items as item (item.id)}
// 								<ListboxOption
// 									class="hover:bg-primary-50 cursor-pointer flex items-center gap-2 select-none relative py-2 pr-4 text-slate-600 {selectedItem.id ===
// 									item.id
// 										? 'bg-emerald-100/40 text-slate-600 font-semibold pl-4'
// 										: 'pl-10'}"
// 									value={item.name}
// 									disabled={item.disabled}
// 								>
// 									{#if selectedItem.id === item.id}
// 										<span><Check class="h-4 w-4 text-emerald-600" /></span>
// 									{/if}
// 									<span>{item.name}</span>
// 								</ListboxOption>
// 							{/each}
// 						</ListboxOptions>
// 					</Transition>
// 				</Listbox>
// 			</div>
// 		</div>
// 	</div>
// </div> -->

<style>
  .check {
    @apply absolute left-2 top-1/2 text-primary-500;
    translate: 0 calc(-50% + 1px);
  }
</style>
