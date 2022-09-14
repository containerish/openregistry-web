<script>
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	let isOpen = true;

	export let caption = '';
	export let text = '';
	export let buttonText = '';
</script>

<Dialog
	open={isOpen}
	on:close={() => (isOpen = false)}
	class="rounded-md w-80 min-h-max left-[50%] top-[50%] bg-brown-50 bg-opacity-70 shadow-lg px-8 py-4 z-50 
	fixed duration-500 inset-0 overflow-y-auto flex flex-col justify-center items-center space-y-3"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<DialogOverlay />

	<DialogTitle class="text-2xl font-semibold capitalize">{caption}</DialogTitle>
	<DialogDescription />

	<p>
		{text}
	</p>

	<button
		on:click={() => (isOpen = false)}
		class="bg-brown-700 rounded-md text-white font-semibold capitalize px-4 py-2"
		>{buttonText}</button
	>
</Dialog>
