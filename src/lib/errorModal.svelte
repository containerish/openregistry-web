<script lang="ts">
	import CrossIcon from './icons/crossIcon.svelte';
	import ButtonOutlined from './button-outlined.svelte';
	import { goto } from '$app/navigation';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let error: string;
	const closeModal = () => {
		goto('/', { invalidateAll: true });
	};

	const {
		elements: { trigger, overlay, content, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
	});
	$open = true;
</script>

<button use:melt={$trigger}></button>
<div use:melt={$portalled} class="w-full h-full">
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />
		<div
			class="flex flex-col items-center overflow-hidden rounded p-8 lg:max-w-4xl
      fixed left-[50%] bg-white top-[50%] z-50 w-[36vw] max-w-[200px]
     translate-x-[-50%] translate-y-[-50%] shadow-3xl shadow-primary-800/40 gap-2"
			use:melt={$content}
		>
			<!-- <Logo type="dark" /> -->
			<div class="flex w-full flex-col items-center justify-center gap-3 text-center">
				<div class="flex flex-col items-center gap-3 bg-slate-300/50 px-3 py-6 rounded">
					<CrossIcon class="h-16 w-16 text-rose-700/80" />
					<p class="font-semibold capitalize tracking-wider text-rose-700 max-w-lg">
						{error}
					</p>
				</div>

				<p class="text-xs font-semibold capitalize tracking-wider text-gray-600 max-w-sm">
					If this error is persistent, please reach out to us on by creating a
					<a
						href="https://github.com/containerish/OpenRegistry/issues/new?assignees=&labels=bug&template=bug_report.md&title=OpenRegistry%20Bug"
						target="_blank"
					>
						Github Issue Here
					</a>
				</p>
			</div>

			<div class="mt-8 flex w-full items-center justify-center">
				<ButtonOutlined on:click={() => closeModal()}>
					<button class="p-0 m-0 w-full h-full" use:melt={$close}> Close </button>
				</ButtonOutlined>
			</div>
		</div>
	{/if}
</div>
