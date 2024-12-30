<script lang="ts">
	import PlainCross from '$lib/icons/plain-cross.svelte';
	import SortIcon from '$lib/icons/sortIcon.svelte';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({
		forceVisible: true,
	});
</script>

<button type="button" class="trigger" use:melt={$trigger} aria-label="Update dimensions">
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
