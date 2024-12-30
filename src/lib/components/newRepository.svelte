<script lang="ts">
	import Textfield from '$lib/textfield.svelte';
	import RadioButton from '$lib/radioButton.svelte';
	import { GlobeIcon, LockClosedIcon } from '$lib/icons';
	import { getContext } from 'svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Textarea from '$lib/textarea.svelte';
	import { OpenRegistryClient } from '$lib/client/openregistry';
	import { CreateReposioryRequest, RepositoryVisibility } from '$lib/types/registry';
	import type { DialogCloser, DialogSuccessHandler } from '$lib/types/components';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import PlainCross from '$lib/icons/plain-cross.svelte';
	import { page } from '$app/stores';

	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
	});

	const toggleModal: () => void = getContext('toggleModal');

	let createRepositoryInput: CreateReposioryRequest = {
		description: '',
		name: '',
		visibility: 'Private',
	};

	const client = new OpenRegistryClient(fetch, $page.url.origin);
	let isCreateRepositoryLoading = false;
	let createRepositoryError = '';
	const createRepository = async () => {
		if (disableCreateButton) {
			createRepositoryError = 'Please fill in all the required fields';
			return;
		}
		isCreateRepositoryLoading = true;
		const response = await client.createRepository(createRepositoryInput);
		if (response.success) {
			isCreateRepositoryLoading = false;
			await handleSuccess();
			handleClose();
			$open = false;
			return;
		}

		console.error('error creating new repository: ', response);
		createRepositoryError = response.message ?? response.error;
		isCreateRepositoryLoading = false;
	};

	const readInputValue = (e: Event, key: keyof CreateReposioryRequest) => {
		createRepositoryError = '';
		const value = (e.target as HTMLInputElement).value;
		if (key === 'visibility') {
			if (value === RepositoryVisibility.enum.Private) {
				createRepositoryInput.visibility = RepositoryVisibility.enum.Private;
			} else if (value === RepositoryVisibility.enum.Public) {
				createRepositoryInput.visibility = RepositoryVisibility.enum.Public;
			}

			return;
		}

		createRepositoryInput[key] = value;
	};

	export let handleClose: DialogCloser;
	export let handleSuccess: DialogSuccessHandler;

	$: disableCreateButton =
		isCreateRepositoryLoading ||
		!createRepositoryInput.name ||
		!createRepositoryInput.description ||
		!createRepositoryInput.visibility;
</script>

<ButtonOutlined class="w-full p-0 m-0">
	<button class="h-full w-full" use:melt={$trigger}> Create Respository </button>
</ButtonOutlined>
<div use:melt={$portalled} class="w-full h-full">
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-primary-800/50" transition:fade={{ duration: 150 }} />
		<div
			class="flex flex-col fixed left-[50%] bg-white top-[50%] z-50 w-[50vw]
    max-w-[630px] translate-x-[-50%] translate-y-[-50%] md:flex-row shadow-3xl shadow-primary-800/40 rounded"
			use:melt={$content}
		>
			<div class="bg-primary-100/50 flex flex-col items-center justify-center text-center gap-9 w-1/3 px-6">
				<span class="text-2xl font-semibold text-primary-500" use:melt={$title}> Create A New Repository </span>
				<img src="/cube-dark.png" alt="cube" width="120px" class="md:py-4" />
			</div>
			<form
				on:submit|preventDefault={createRepository}
				class="flex justify-around items-center gap-6 flex-col h-full w-2/3 px-9 py-6 relative"
			>
				<button use:melt={$close}>
					<PlainCross class="absolute top-0 right-0 m-3 w-5 h-5 text-slate-500" />
				</button>

				<div class="flex flex-col gap-3 w-full">
					<div class="flex gap-4 text-slate-600 pb-2">
						<RadioButton
							on:input={(e) => readInputValue(e, 'visibility')}
							value="Public"
							label="Public"
							name="visibility"
						>
							<GlobeIcon class="h-6 w-6" />
						</RadioButton>
						<RadioButton
							name="visibility"
							on:input={(e) => readInputValue(e, 'visibility')}
							value="Private"
							label="Private"
						>
							<LockClosedIcon class="h-6 w-6" />
						</RadioButton>
					</div>
					<div class="w-full">
						<Textfield on:input={(e) => readInputValue(e, 'name')} label="Repository Name" name="name" />
					</div>
					<div class="w-full">
						<label
							for="textarea"
							class="block text-sm lg:text-base text-start font-semibold text-slate-500 ml-1"
						>
							Description
						</label>
						<Textarea
							name="description"
							on:input={(e) => readInputValue(e, 'description')}
							class="p-0 m-0"
							placeholder="Eg: Awesome new container image"
						/>
					</div>
				</div>
				{#if createRepositoryError}
					<div class="max-w-xs bg-rose-100 rounded px-4 py-2">
						<span class="max-w-xs text-rose-600">
							<b>Error:</b>
							{createRepositoryError}
						</span>
					</div>
				{/if}
				<div class="flex pt-2 w-full justify-center items-center gap-6">
					<ButtonOutlined type="button" class="w-full p-0 m-0" on:click={toggleModal}>
						<button class="w-full h-full" use:melt={$close}> Close</button>
					</ButtonOutlined>
					<ButtonSolid
						isLoading={isCreateRepositoryLoading}
						disabled={disableCreateButton}
						type="submit"
						class="w-full">Create</ButtonSolid
					>
				</div>
			</form>
		</div>
	{/if}
</div>
