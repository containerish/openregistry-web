<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		Transition,
		TransitionChild,
	} from "@rgossiaux/svelte-headlessui";
	export let isOpen = true;
	import { twMerge } from "tailwind-merge";
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
			<DialogOverlay class="fixed inset-0 bg-slate-800/50" />
		</TransitionChild>

		<div class="fixed inset-0 overflow-y-auto">
			<div
				class="flex min-h-full items-center justify-center text-center"
			>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div
						class={twMerge(
							`flex min-h-max w-full transform justify-center items-center rounded-lg bg-slate-50 
							transition-all inset-0 border-2 border-primary-100 shadow-3xl shadow-slate-500`,
							$$props.class
						)}
					>
						<slot />
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
