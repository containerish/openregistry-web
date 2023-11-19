<script lang="ts">
  import { ChevronIcon } from "$lib/icons";
  import PlainCross from "$lib/icons/plain-cross.svelte";
  import SortIcon from "$lib/icons/sortIcon.svelte";
  import { createPopover, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";

  const {
    elements: { trigger, content, arrow, close },
    states: { open },
  } = createPopover({
    forceVisible: true,
  });
  
</script>

<button
  type="button"
  class="trigger"
  use:melt={$trigger}
  aria-label="Update dimensions"
>
  <SortIcon class="square-4" />
  <span class="sr-only">Sort By</span>
</button>

{#if $open}
  <div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
    <div use:melt={$arrow} />
    <div class="flex flex-col gap-2.5">
      <fieldset>
        <label for="width">Name</label>
      </fieldset>
      <fieldset>
        <label for="height">Date</label>
      </fieldset>
    </div>
    <button class="close" use:melt={$close}>
      <PlainCross class="square-4" />
    </button>
  </div>
{/if}

<!-- <Menu let:open class="relative z-10 inline-block text-left">
	<div class="max-w-2xl">
		<MenuButton
			aria-label="menu button"
			class="px-2 transition ease-in-out duration-200
		flex justify-center space-x-2 items-center border-2 rounded font-medium text-primary-400 bg-slate-50 
		border-primary-200 tracking-wide min-w-[120px] h-11 text-base hover:shadow-primary-100 
		hover:shadow-3xl"
		>
			<div class="flex font-semibold text-primary-400 gap-2 items-center">
				{title}
				<SortIcon class="h-5 w-5 text-primary-400" />
			</div>
		</MenuButton>
	</div>
	{#if open}
		<Transition
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<div>
				<MenuItems
					static
					class="absolute right-0 w-36 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-200 rounded-md 
					shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="rounded-md">
						<slot />
					</div>
				</MenuItems>
			</div>
		</Transition>
	{/if}
</Menu> -->

<!-- <style>
  fieldset {
    @apply flex items-center gap-5;
  }

  label {
    @apply w-[75px] text-sm text-neutral-700;
  }

  p {
    @apply mb-2 font-medium text-neutral-900;
  }

  .input {
    @apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
    @apply ring-offset-magnum-300 focus-visible:ring;
    @apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
    @apply flex-1 items-center justify-center;
    @apply px-2.5 text-sm leading-none text-magnum-700;
  }

  .trigger {
    @apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
    @apply text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90;
    @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
  }

  .close {
    @apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
    @apply text-magnum-900 transition-colors hover:bg-magnum-500/10;
    @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
    @apply bg-white p-0 text-sm font-medium;
  }

  .content {
    @apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
  }
</style> -->
