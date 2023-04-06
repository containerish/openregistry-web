<script lang="ts">
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import ChevronRight from './icons/chevron-right.svelte';

	export let title: string;
</script>

<Disclosure let:open class="w-full">
	<DisclosureButton
		class="bg-white flex justify-start pl-4 items-center gap-2 w-full py-2 font-medium text-left text-primary-500
		 border-none rounded focus:outline-none"
	>
		<ChevronRight class="{open ? 'rotate-90' : ''}  h-4 w-4 text-slate-700" />
		{title}
	</DisclosureButton>
	<Transition
		enter="transition duration-100 ease-out"
		enterFrom="transform scale-95 opacity-0"
		enterTo="transform scale-100 opacity-100"
		leave="transition duration-75 ease-out"
		leaveFrom="transform scale-100 opacity-100"
		leaveTo="transform scale-95 opacity-0"
	>
		<DisclosurePanel>
			<slot />
		</DisclosurePanel>
	</Transition>
</Disclosure>
