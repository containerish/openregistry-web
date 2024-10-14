<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import ArrowDown from './icons/arrow-down.svelte';
	import PlainCross from './icons/plain-cross.svelte';

	export let title: string;
	export let disabled = false;
	export let defaultOpen = false;

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible({
		disabled,
		defaultOpen,
	});
</script>

<div use:melt={$root} class="relative mx-auto mb-28 w-[18rem] max-w-full sm:w-[25rem]">
	<div class="flex items-center justify-between data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75">
		<span class="text-sm font-semibold {disabled ? 'text-slate-600/75' : 'text-primary-500'}">
			{title}
		</span>
		<button
			use:melt={$trigger}
			class="relative h-6 w-6 place-items-center rounded-md bg-white text-sm text-primary-800 shadow
			hover:opacity-75 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75"
			aria-label="Toggle"
		>
			<div class="abs-center">
				{#if $open}
					<PlainCross class="square-4" />
				{:else}
					<ArrowDown class="square-4" />
				{/if}
			</div>
		</button>
	</div>

	<div style:position="absolute" style:top="calc(100% + 10px)" style:right="0" style:left="0">
		{#if $open}
			<div use:melt={$content} transition:slide>
				<div class="flex flex-col justify-start items-start gap-2">
					<slot />
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.abs-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
