<script lang="ts">
	import { Menu, MenuButton, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { twMerge } from 'tailwind-merge';
	import { MenuIcon } from './icons';
</script>

<Menu let:open class={twMerge('relative z-10 inline-block text-left', $$props.class)}>
	<div class="max-w-sm">
		<MenuButton
			aria-label="menu button"
			class="px-2 transition ease-in-out duration-200 flex justify-center items-center border-0 
			aspect-square hover:bg-primary-100"
		>
			<MenuIcon class="h-6 w-6 text-primary-400" />
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
					class="absolute right-0 origin-top-right bg-slate-50 rounded-sm shadow-2xl shadow-primary-100
					 "
				>
					<slot />
				</MenuItems>
			</div>
		</Transition>
	{/if}
</Menu>
