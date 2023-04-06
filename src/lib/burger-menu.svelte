<script lang="ts">
	import { Menu, MenuButton, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { twMerge } from 'tailwind-merge';
	import { MenuIcon } from './icons';
</script>

<Menu let:open class= { twMerge('relative z-10 inline-block text-left', $$props.class)}>
	<div class="max-w-2xl">
		<MenuButton
			class="px-2 transition ease-in-out duration-200 flex justify-center space-x-2 items-center border-0 
			aspect-square bg-transparent h-12 hover:bg-primary-100"
		>
			<MenuIcon class="h-8 w-8 text-primary-400" />
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
					class="absolute right-0 origin-top-right bg-white rounded-sm shadow-3xl shadow-primary-200
					 border border-primary-100 hover:no-underline"
				>
					<slot />
				</MenuItems>
			</div>
		</Transition>
	{/if}
</Menu>
