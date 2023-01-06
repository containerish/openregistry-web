<script>
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	let isOpen = true;
	export let styles = '';
	// export let caption = '';
	// export let text = '';
	// export let buttonText = '';
</script>

<Dialog
	class="relative w-full h-full"
	open={isOpen}
	on:close={() => (isOpen = false)}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<DialogOverlay class="bg-primary-800 bg-opacity-40 top-0 left-0 fixed w-screen h-screen" />
	<DialogTitle class="text-2xl font-semibold capitalize" />
	<DialogDescription />
	<div
		class="{styles} min-w-max max-w-lg min-h-max bg-white shadow-lg py-4 z-50 rounded
	inset-0 border-2 border-primary-400 fixed top-[30vh] left-[35vw] laptop:left-[40vw] uw:left-[45vw]"
	>
		<slot />
	</div>
	<!-- <p>
		{text}
	</p>

	<button
		on:click={() => (isOpen = false)}
		class="bg-brown-700 rounded-md text-white font-semibold capitalize px-4 py-2"
		>{buttonText}</button
	> -->
</Dialog>
