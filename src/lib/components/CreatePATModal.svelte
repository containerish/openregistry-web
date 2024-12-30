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

	const handleCloseEvent = () => {
		token = '';
	};
</script>

<ButtonSolid class="m-0 flex w-full max-w-[200px] items-center justify-center p-0">
	<button class="flex h-full w-full items-center justify-center gap-3" use:melt={$trigger}>
		Generate New Token
	</button>
</ButtonSolid>

<div use:melt={$portalled} class="h-full w-full">
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />

		<div
			class="fixed left-[50%] top-[50%] z-50 flex w-[50vw] max-w-[630px] translate-x-[-50%] translate-y-[-50%]
    items-center justify-start rounded bg-white shadow-3xl shadow-primary-800/40 md:flex-row"
			use:melt={$content}
		>
			<div class="relative flex w-full flex-col items-start gap-3 p-9">
				<button use:melt={$close} on:m-click={handleCloseEvent}>
					<PlainCross class="absolute right-0 top-0 m-2 h-6 w-6 text-slate-500" />
				</button>

				<div class="w-full">
					<span class="text-2xl font-semibold text-primary-500" use:melt={$title}>
						Generate a new token
					</span>
					<p class="max-w-lg text-sm text-slate-500 antialiased">
						Generate an authentication token for your OpenRegistry account. You can use this token to push
						and pull container images
					</p>
				</div>
				{#if token}
					<span class="text-sm font-semibold italic text-slate-600">
						<b>Note: </b>
						Please make sure to copy this access token and store is securely. You will not be able to see this
						token again.
					</span>
					<div class="flex w-full items-center gap-2 rounded px-2 py-2">
						<div
							class="flex items-center gap-2 rounded border-[1px] border-primary-500/50 bg-primary-50 py-0 pl-2"
						>
							<span class="flex gap-2 text-base font-semibold text-primary-600">
								{token}
							</span>
							<IconButton on:click={copyTokenToClipboard} class="m-0 h-full w-full bg-primary-100 py-0">
								{#if isCopyingText}
									<span class="flex gap-2 text-base font-semibold text-primary-600">
										<CheckIcon class="h-6 w-6 text-primary-600" />
										Copied
									</span>
								{:else}
									<CopyIcon class="h-6 w-6 text-primary-600" />
								{/if}
							</IconButton>
						</div>
					</div>
				{:else}
					<Textfield on:input={readTokenName} placeholder="Token name" label="Name" name="name" />

					<div class="-mb-3 flex w-full items-center justify-center gap-6 pt-6">
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
