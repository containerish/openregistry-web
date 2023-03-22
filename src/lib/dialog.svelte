<script>
	import { Dialog, DialogOverlay, Transition, TransitionChild } from '@rgossiaux/svelte-headlessui';
	export let isOpen = true;
	export let styles = '';
</script>

<Transition show={isOpen}>
	<Dialog
		as="div"
		class="relative z-50"
		on:close={() => {
			isOpen = false;
		}}
	>
		<TransitionChild
			enter="ease-out duration-50"
			enterFrom="opacity-0"
			enterTo="opacity-80"
			leave="ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div class="fixed inset-0 bg-gray-900 bg-opacity-60" />
			<DialogOverlay />
		</TransitionChild>

		<div class="fixed inset-0 overflow-y-auto ">
			<div class="flex min-h-full items-center justify-center text-center">
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div
						class="{styles} flex min-h-max w-full transform lg:min-w-[480px] px-6 lg:py-4 z-50 rounded
						bg-white transition-all inset-0 border-2 border-primary-500"
					>
						<slot />
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
