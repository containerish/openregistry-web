<script lang="ts">
  import { createSwitch, melt } from "@melt-ui/svelte";
  export let label = " ";
  const {
    elements: { root, input },
  } = createSwitch();
</script>

<form>
  <div class="flex items-center">
    <label
      class="pr-4 leading-none text-primary-500"
      for="airplane-mode"
      id="airplane-mode-label"
    >
      {label}
    </label>
    <button
      use:melt={$root}
      class="relative h-5 cursor-default rounded-full border border-primary-100 transition-colors data-[state=checked]:bg-emerald-100"
      id="airplane-mode"
      aria-labelledby="airplane-mode-label"
    >
      <span class="thumb block rounded-full bg-primary-200 transition" />
    </button>
    <input use:melt={$input} />
  </div>
</form>

<style>
  button {
    --w: 2.5rem;
    --padding: 0.125rem;
    width: var(--w);
  }

  .thumb {
    --size: 1rem;
    width: var(--size);
    height: var(--size);
    transform: translateX(var(--padding));
  }

  :global([data-state="checked"]) .thumb {
    transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
  }
</style>
