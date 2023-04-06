<script lang="ts">
	import CrossIcon from './icons/crossIcon.svelte';
	import Modal from './modal.svelte';
	import ButtonOutlined from './button-outlined.svelte';
	import Logo from './components/logo.svelte';
	import { goto } from '$app/navigation';
	import Dialog from './dialog.svelte';

	export let error: string;
	export let open: boolean = false;
	const closeModal = () => {
		open = false;
		goto('/', { invalidateAll: true });
	};
</script>

<Dialog isOpen={open}>
	<div
		class="mx-auto flex w-4/5 max-w-sm flex-col items-center overflow-hidden rounded p-8 lg:max-w-4xl"
	>
		<Logo type="dark" />
		<div class="mt-4 flex items-center justify-between">
			<span class="w-1/5 border-b lg:w-1/4" />

			<span class="w-1/5 border-b lg:w-1/4" />
		</div>
		<div class="flex w-full flex-col items-center justify-center gap-2 text-center">
			<CrossIcon class="h-16 w-16 text-red-600" />
			<span class="font-semibold capitalize tracking-wider text-red-600">
				{error}
			</span>
			<span class="text-xs font-semibold capitalize tracking-wider text-gray-600">
				If this error is persistent, please reach out to us on by creating a
				<a
					href="https://github.com/containerish/OpenRegistry/issues/new?assignees=&labels=bug&template=bug_report.md&title=OpenRegistry%20Bug"
					target="_blank"
				>
					Github Issue Here
				</a>
			</span>
		</div>

		<div class="mt-8 flex w-full items-center justify-center">
			<ButtonOutlined on:click={closeModal}>Close</ButtonOutlined>
		</div>
	</div>
</Dialog>
