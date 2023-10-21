<script lang="ts">
	import Textfield from "$lib/textfield.svelte";
	import RadioButton from "$lib/radioButton.svelte";
	import { GlobeIcon, LockClosedIcon } from "$lib/icons";
	import { getContext } from "svelte";
	import ButtonSolid from "$lib/button-solid.svelte";
	import ButtonOutlined from "$lib/button-outlined.svelte";
	import Textarea from "$lib/textarea.svelte";
	import { OpenRegistryClient } from "$lib/client/openregistry";
	import {
		CreateReposioryRequest,
		RepositoryVisibility,
	} from "$lib/types/registry";
	import type {
		DialogCloser,
		DialogSuccessHandler,
	} from "$lib/types/components";

	const toggleModal: () => void = getContext("toggleModal");

	let createRepositoryInput: CreateReposioryRequest = {
		description: "",
		name: "",
		visibility: "Private",
	};

	const client = new OpenRegistryClient(fetch);
	let isCreateRepositoryLoading = false;
	let createRepositoryError = "";
	const createRepository = async () => {
		isCreateRepositoryLoading = true;
		const response = await client.createRepository(createRepositoryInput);
		if (response.success) {
			console.log("new repository created: ", response.data);
			isCreateRepositoryLoading = false;
			await handleSuccess();
			handleClose();
			return;
		}
		console.error("error creating new repository: ", response);
		createRepositoryError = response.message ?? response.error;
		isCreateRepositoryLoading = false;
		handleClose();
	};

	const readInputValue = (e: Event, key: keyof CreateReposioryRequest) => {
		createRepositoryError = "";
		const value = (e.target as HTMLInputElement).value;
		if (key === "visibility") {
			if (value === RepositoryVisibility.enum.Private) {
				createRepositoryInput.visibility =
					RepositoryVisibility.enum.Private;
			} else if (value === RepositoryVisibility.enum.Public) {
				createRepositoryInput.visibility =
					RepositoryVisibility.enum.Public;
			}

			return;
		}

		createRepositoryInput[key] = value;
	};

	export let handleClose: DialogCloser;
	export let handleSuccess: DialogSuccessHandler;
</script>

<div class="flex flex-col md:flex-row">
	<div
		class="bg-primary-100/50 flex flex-col items-center justify-start gap-9 p-6 md:p-9"
	>
		<span class="text-2xl font-semibold text-primary-500">
			Create A New Repository
		</span>
		<img src="/cube-dark.png" alt="cube" width="120px" class="md:py-4" />
	</div>
	<form
		on:submit|preventDefault={createRepository}
		class="flex justify-around items-center gap-6 flex-col h-full w-full px-9 py-6"
	>
		<div class="flex flex-col gap-3 w-full">
			<div class="flex gap-4 text-slate-600 pb-2">
				<RadioButton
					on:change={(e) => readInputValue(e, "visibility")}
					value="Public"
					label="Public"
					name="visibility"
				>
					<GlobeIcon class="h-6 w-6" />
				</RadioButton>
				<RadioButton
					name="visibility"
					on:change={(e) => readInputValue(e, "visibility")}
					value="Private"
					label="Private"
				>
					<LockClosedIcon class="h-6 w-6" />
				</RadioButton>
			</div>
			<div class="w-full">
				<Textfield
					on:change={(e) => readInputValue(e, "name")}
					label="Repository Name"
					name="name"
				/>
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
					on:change={(e) => readInputValue(e, "description")}
					class="p-0 m-0"
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
			<ButtonOutlined type="button" class="w-full" on:click={toggleModal}>
				Close
			</ButtonOutlined>
			<ButtonSolid
				isLoading={isCreateRepositoryLoading}
				type="submit"
				class="w-full"
			>
				Create
			</ButtonSolid>
		</div>
	</form>
</div>
