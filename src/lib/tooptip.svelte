<script>
	import { createPopperActions } from 'svelte-popperjs';
	const [popperRef, popperContent] = createPopperActions();
	const popperOptions = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
		placement: 'bottom'
	};

	export let showTooltip = false;
	export let content = 'tooltip';
</script>

{#if showTooltip}
	<div id="tooltip" use:popperContent={popperOptions}>
		{content}
		<div id="arrow" data-popper-arrow />
	</div>
{/if}

