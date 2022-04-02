<script>
	import SortIcon from '$lib/icons/sortIcon.svelte';
	import { Menu, MenuButton, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	export let title = '';
</script>

<Menu let:open class="relative z-10 inline-block text-left">
	<div class="max-w-2xl">
		<MenuButton
			class="px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 bg-cream-50 rounded-md sm:inline flex hover:bg-brown-50 hover:text-gray-700"
		>
			<div class="flex font-semibold text-brown-800 gap-2">
				{title}
				<SortIcon styles="h-6 w-6 text-brown-800" />
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
					class="absolute right-0 w-36 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="rounded-md">
						<slot />
					</div>
				</MenuItems>
			</div>
		</Transition>
	{/if}
</Menu>
