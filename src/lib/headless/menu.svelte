<script lang="ts">
	import SortIcon from '$lib/icons/sortIcon.svelte';
	import { Menu, MenuButton, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	export let title = '';
</script>

<Menu let:open class="relative z-10 inline-block text-left">
	<div class="max-w-2xl">
		<MenuButton
			class="px-2 transition ease-in-out duration-200
		flex justify-center space-x-2 items-center border-2 rounded font-medium text-primary-400 bg-transparent 
		border-primary-200 tracking-wide min-w-[120px] h-12 text-base hover:shadow-primary-100 
		hover:shadow-3xl"
		>
			<div class="flex font-semibold text-primary-400 gap-2">
				{title}
				<SortIcon class="h-6 w-6 text-primary-400" />
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
</Menu>
