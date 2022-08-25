<script lang="ts">
	import ClickOutside from 'svelte-click-outside';
	import CrossIcon from './icons/crossIcon.svelte';
	import Modal from './modal.svelte';
	import ButtonOutlined from './button-outlined.svelte';

	export let error: string;
	export let open: boolean = false;
	const closeModal = () => {
		open = false;
	};
</script>

<ClickOutside on:clickoutside={closeModal}>
	{#if open}
		<Modal>
			<div class="flex w-4/5 max-w-sm mx-auto overflow-hidden rounded-lg lg:max-w-4xl">
				<div class="w-4/5 px-6 py-8 md:px-8 lg:w-full">
					<div class="flex justify-center py4 mb-8">
						<picture>
							<img class="" src="/logo.svg" alt="openregistry-logo.svg" />
						</picture>
					</div>

					<div class="flex items-center justify-between mt-4">
						<span class="w-1/5 border-b lg:w-1/4" />

						<span class="w-1/5 border-b lg:w-1/4" />
					</div>
					<div class="w-full flex justify-center gap-2 items-center flex-col text-center">
						<CrossIcon styles="h-16 w-16 text-red-600" />
						<span class="font-semibold text-red-600 capitalize tracking-wider">
							{error}
						</span>
						<span class="font-semibold text-gray-600 text-xs capitalize tracking-wider">
							If this error is persistent, please reach out to us on by creating a
							<a
								href="https://github.com/containerish/OpenRegistry/issues/new?assignees=&labels=bug&template=bug_report.md&title=OpenRegistry%20Bug"
								target="_blank"
							>
								Github Issue Here
							</a>
						</span>
					</div>

					<div class="flex mt-8 justify-center items-center w-full">
						<ButtonOutlined onClick={closeModal}>Close</ButtonOutlined>
					</div>
				</div>
			</div>
		</Modal>
	{/if}
</ClickOutside>
