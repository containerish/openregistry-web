<script lang="ts">
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import IconButton from "./icon-button.svelte";
  import { MenuIcon } from "./icons";
  import { fly } from "svelte/transition";
  const {
    elements: { menu, item, trigger, arrow },
  } = createDropdownMenu();
</script>

<button use:melt={$trigger}>
  <MenuIcon class="w-6 h-6 text-primary-500" />
</button>
<div
  use:melt={$menu}
  class="bg-white rounded shadow-2xl z-50
shadow-primary-800/30 pt-2"
>
  <div use:melt={$item}>
    <IconButton
      class="pr-16 pl-6 py-2 m-0 text-sm"
      on:click={() => {
        window.open("https://blog.openregistry.dev", "_blank");
      }}
    >
      Blog
    </IconButton>
  </div>
  <div use:melt={$item}>
    <IconButton
      class="pr-16 pl-6 py-2 m-0 text-sm"
      on:click={() => {
        window.open("/about", "_self");
      }}
    >
      About
    </IconButton>
  </div>
  <div use:melt={$item}>
    <IconButton
      class="pr-16 pl-6 py-2 m-0 text-sm"
      on:click={() => {
        window.open(
          "https://github.com/containerish/OpenRegistry.git",
          "_blank"
        );
      }}
    >
      Github
    </IconButton>
  </div>
  <div use:melt={$item}>
    <IconButton
      class="pr-16 pl-6 py-2 m-0 text-sm"
      on:click={() => {
        window.open("/faq", "self");
      }}
    >
      FAQ
    </IconButton>
  </div>

  <div use:melt={$arrow} />
</div>
