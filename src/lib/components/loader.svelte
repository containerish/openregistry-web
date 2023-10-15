<script lang="ts">
    import Card from "$lib/card.svelte";
    import { SpinnerCircle } from "$lib/icons";
    import { pulseStore } from "./pulse";
</script>

{#if $pulseStore.status === "LOADING"}
    <Card class="w-full py-8">
        <div class="flex w-[700px] h-full min-w-max min-h-max py-20">
            <SpinnerCircle class="text-primary-100 h-20 w-20" />
        </div>
    </Card>
{:else}
    <slot />
{/if}
