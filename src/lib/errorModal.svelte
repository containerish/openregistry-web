<script lang="ts">
	import ClickOutside from 'svelte-click-outside';
	import CrossIcon from './icons/crossIcon.svelte';
	import Modal from './modal.svelte';
	import ButtonOutlined from './button-outlined.svelte';
	import Logo from './icons/logo.svelte';

	export let error: string;
	export let open: boolean = false;
	const closeModal = () => {
		open = false;
	};
</script>

<ClickOutside on:clickoutside={closeModal}>
	{#if open}
		<Modal>
			<div class="mx-auto flex w-4/5 max-w-sm overflow-hidden rounded-lg lg:max-w-4xl">
				<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
					<div class="py4 mb-8 flex justify-center">
						<Logo />
					</div>

					<div class="mt-4 flex items-center justify-between">
						<span class="w-1/5 border-b lg:w-1/4" />

						<span class="w-1/5 border-b lg:w-1/4" />
					</div>
					<div class="flex w-full flex-col items-center justify-center gap-2 text-center">
						<CrossIcon styles="h-16 w-16 text-red-600" />
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
						<ButtonOutlined onClick={closeModal}>Close</ButtonOutlined>
					</div>
				</div>
			</div>
		</Modal>
	{/if}
</ClickOutside>
