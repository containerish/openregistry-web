<script lang="ts">
	import type { PageData } from "./$types";
	import Pagination from "$lib/pagination.svelte";
	import Textfield from "$lib/textfield.svelte";
	import { throttle } from "throttle-debounce";
	import { setContext } from "svelte";
	import { NewRepository, Repository, Loader } from "$lib/components";
	import { navigating } from "$app/stores";
	import { pulseStore } from "$lib/components/pulse";
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import ButtonOutlined from "$lib/button-outlined.svelte";
	import Dialog from "$lib/dialog.svelte";
	import { DefaultPageSize } from "$lib/constants";
	import { OpenRegistryClient } from "$lib/client/openregistry";

	export let data: PageData;
	$: catalog = data.repositories;

	const registryClient = new OpenRegistryClient(fetch);

	const pageSize = 10;

	let showCreateRepositoryModal = false;
	const toggleModal = () => {
		showCreateRepositoryModal = !showCreateRepositoryModal;
	};

	setContext("toggleModal", toggleModal);
	const handleOnChange = async (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		autoCompleteThrottled(value);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const autoComplete = async (q: string) => {
		let query = data.user.username;
		const url = new URL(
			"/apis/registry/list/repositories",
			$page.url.origin
		);
		url.searchParams.set("query", query);

		const response = await fetch(url);
		if (response.status !== 200) {
			catalog = [];
			return;
		}

		catalog = await response.json();
	};

	const autoCompleteThrottled = throttle(1000, autoComplete);

	$: {
		pulseStore.setPulseState(!$navigating && !!catalog);
	}

	const handleCreateRepositorySuccess = async () => {
		const response = await registryClient.getUserRepositoryCatalog();
		if (!response.error) {
			catalog = response.repositories;
		}
	};
</script>

<svelte:head>
	<title>Repositories | OpenRegistry</title>
</svelte:head>

<Loader>
	<div
		class="flex justify-start items-start w-full h-full min-w-max min-h-max py-8"
	>
		<div class="w-full flex flex-col my-8 max-w-[850px] px-9 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-4 px-2 justify-between">
				<div class="w-4/5 lg:w-3/5">
					<Textfield
						on:input={handleOnChange}
						placeholder="Search Repositories"
					/>
				</div>
				<!-- {#if showTooltip}
					<div id="tooltip" class=" bg-cyan-200 rounded py-1 px-3" use:popperContent={extraOpts}>
						<span class=" text-slate-700">
							Coming soon
							<svg
								class="absolute text-cyan-200 h-5 w-5 left-0 pb-1 ml-3 top-full"
								x="0px"
								y="0px"
								viewBox="0 0 255 255"
								xml:space="preserve"
							>
								<polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
							</svg>
						</span>
						<div id="arrow" data-popper-arrow />
					</div>
				{/if} -->
				<ButtonOutlined class="max-w-[202px]" on:click={toggleModal}>
					Create Respository
				</ButtonOutlined>
			</div>
			<div in:fly={{ y: 200, duration: 300 }}>
				{#if catalog && catalog.length > 0}
					<div class="w-full">
						{#each catalog as repo}
							<Repository
								username={data.user.username}
								repository={repo}
								compact={false}
							/>
						{/each}
					</div>
					<div class="flex justify-center">
						{#if data.total > DefaultPageSize}
							<Pagination
								pages={Math.ceil(data.total / pageSize)}
							/>
						{/if}
					</div>
				{:else}
					<div class="w-full flex justify-center items-center">
						<div
							class="bg-slate-50 border border-primary-100 w-full rounded-md px-20 py-20 my-5
							flex justify-center items-center"
						>
							<span class="text-slate-500 text-2xl">
								No Repositories Yet
							</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<Dialog isOpen={showCreateRepositoryModal}>
			<NewRepository
				handleSuccess={handleCreateRepositorySuccess}
				handleClose={() => (showCreateRepositoryModal = false)}
			/>
		</Dialog>
	</div>
</Loader>
