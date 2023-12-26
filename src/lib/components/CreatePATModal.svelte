<script lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import PlainCross from '$lib/icons/plain-cross.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import type { OpenRegistryClient } from '$lib/client/openregistry';
	import { writable } from 'svelte/store';
	import Textfield from '$lib/textfield.svelte';
	import { CheckIcon, CopyIcon } from '$lib/icons';
	import IconButton from '$lib/icon-button.svelte';
	import { copyToClipboard } from '$lib/client';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let openRegistryClient: OpenRegistryClient;

	let isTokenGenerating = false;
	const tokenInputStore = writable<{
		name: string;
		expires_at?: Date;
	}>({
		name: '',
	});

	const dispatch = createEventDispatcher();

	let token = '';
	const wrapTokenGenerator = async () => {
		isTokenGenerating = true;
		const response = await openRegistryClient.generateAuthToken($tokenInputStore.name, $tokenInputStore.expires_at);
		console.log('generateAuthToken response: ', response);
		if (response.success) {
			dispatch('generate', { token });
			token = response.data.token;
		}
		isTokenGenerating = false;
	};

	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
		defaultOpen: false,
	});

	const readTokenName = (e: Event) => {
		$tokenInputStore.name = (e.target as HTMLInputElement).value;
	};

	let timer: ReturnType<typeof setTimeout>;
	let isCopyingText = false;
	function copyTokenToClipboard() {
		isCopyingText = true;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			copyToClipboard(token);
			isCopyingText = false;
		}, 2000);
	}

	onDestroy(() => {
		clearTimeout(timer);
		token = '';
	});
</script>

<ButtonSolid class="max-w-[200px] p-0 m-0 w-full flex justify-center items-center">
	<button class="flex gap-3 h-full w-full justify-center items-center" use:melt={$trigger}>
		Generate New Token
	</button>
</ButtonSolid>

<div use:melt={$portalled} class="w-full h-full">
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />

		<div
			class="flex justify-start items-center fixed left-[50%] bg-white top-[50%] z-50 w-[50vw]
    max-w-[630px] translate-x-[-50%] translate-y-[-50%] md:flex-row shadow-3xl shadow-primary-800/40 rounded"
			use:melt={$content}
		>
			<div class="flex flex-col gap-3 p-9 relative w-full items-start">
				<button use:melt={$close}>
					<PlainCross class="absolute w-6 h-6 text-slate-500 top-0 right-0 m-2" />
				</button>

				<div class="w-full">
					<span class="text-2xl font-semibold text-primary-500" use:melt={$title}>
						Generate a new token
					</span>
					<p class="text-sm text-slate-500 max-w-lg antialiased">
						Generate an authentication token for your OpenRegistry account. You can use this token to push
						and pull container images
					</p>
				</div>
				{#if token}
					<span class="italic font-semibold text-sm text-slate-600">
						<b>Note: </b>
						Please make sure to copy this access token and store is securely. You will not be able to see this
						token again.
					</span>
					<div class="w-full rounded gap-2 flex items-center py-2 px-2">
						<div
							class="flex items-center py-0 gap-2 bg-primary-50 border-primary-500/50 border-[1px] pl-2 rounded"
						>
							<span class="text-primary-600 text-base flex gap-2 font-semibold">
								{token}
							</span>
							<IconButton on:click={copyTokenToClipboard} class="bg-primary-100 h-full w-full py-0 m-0">
								{#if isCopyingText}
									<span class="text-primary-600 text-base flex gap-2 font-semibold">
										<CheckIcon class="text-primary-600 h-6 w-6" />
										Copied
									</span>
								{:else}
									<CopyIcon class="text-primary-600 h-6 w-6" />
								{/if}
							</IconButton>
						</div>
					</div>
				{:else}
					<Textfield on:input={readTokenName} placeholder="Token name" label="Name" name="name" />

					<div class="flex justify-center gap-6 items-center w-full pt-6 -mb-3">
						<ButtonOutlined class="m-0 p-0">
							<button use:melt={$close}> Cancel </button></ButtonOutlined
						>
						<ButtonSolid
							disabled={isTokenGenerating || !$tokenInputStore.name}
							isLoading={isTokenGenerating}
							on:click={wrapTokenGenerator}>Generate</ButtonSolid
						>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
