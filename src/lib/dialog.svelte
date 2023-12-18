<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import PlainCross from './icons/plain-cross.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
	});
</script>

<button
	use:melt={$trigger}
	class="px-3 transition ease-in-out duration-200 flex justify-center gap-1 items-center border-2 rounded
  font-medium text-primary-400 bg-transparent border-primary-200 tracking-wide min-w-[120px] h-10 md:h-11
   hover:shadow-primary-100 hover:shadow-3xl disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-500
    disabled:border-slate-300 text-sm lg:text-base antialiased"
>
	<!-- button text -->
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
             shadow-lg"
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
				<!-- title goes here -->
			</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				<!-- description -->
			</p>

			<div class="w-full">
				<slot />
			</div>

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600"
				>
					<!-- button nuetral -->
				</button>
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-magnum-100 px-4 font-medium leading-none text-magnum-900"
				>
					<!-- button positive -->
				</button>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                items-center justify-center rounded-full p-1 text-magnum-800
                hover:bg-magnum-100 focus:shadow-magnum-400"
			>
				<PlainCross />
			</button>
		</div>
	{/if}
</div>
