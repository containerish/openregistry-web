<script lang="ts">
	import { goto } from '$app/navigation';
	import { ghStore } from '$lib/stores';
	import {
		SpinnerCircle,
		DownloadIcon,
		CopyIcon,
		GitBranchIcon,
		ArrowRightIcon,
		ArrowLeftIcon,
		CrossIcon
	} from '$lib/icons/';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Dialog from '$lib/dialog.svelte';
	import { onMount } from 'svelte';

	export let handleNext;

	let showModal = false;
	const handleShowModal = () => {
		showModal = !showModal;
	};

	onMount(async () => {
		await streamBuildLogs();
	});

	let logs: string[] = [];
	const streamBuildLogs = async () => {
		const response = await fetch('/apis/services/github/actions/logs');
		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		if (reader) {
			while (true) {
				const { value, done } = await reader.read();
				if (done) {
					break;
				}
				logs = [...logs, ...value.split(/\r?\n/)];
			}
		}
		console.log('logs:', logs);
	};
</script>

<div class="">
	<div class="justify-center flex items-center">
		<span class="text-2xl font-bold text-primary-600"> Building and deploying</span>
	</div>
	<div class="flex flex-col gap-3 mt-9">
		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-slate-600 text-base font-semibold ml-6">
				Initializing build environment
			</span>
		</div>

		<hr class="border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Cloning git repository</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Building application</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Deploying to Akash network</i>
			</span>
		</div>
	</div>
	<div class="border-primary-100 border mt-10 py-4 px-5 shadow-2xl">
		<div class="flex gap-6 justify-end items-end">
			<div class="flex gap-2">
				<DownloadIcon styles="h-6 w-6 text-slate-600" />
				<span class="text-base text-slate-600"> Download log </span>
			</div>
			<div class="flex gap-2">
				<CopyIcon styles="text-slate-600" />
				<span class="text-base text-slate-600"> Copy log </span>
			</div>
		</div>
		<hr class="border-t-2 border-primary-50 -mx-5 mt-4" />
		<table class="table-auto min-h-[500px]">
			<tbody>
				<div class="max-h-[500px] overflow-x-auto">
					{#each logs as log, i}
						<tr class="break-all whitespace-pre-line">
							<td class="text-base whitespace-pre-line font-jetbrains-mono text-slate-600">{log}</td
							>
						</tr>
					{/each}
				</div>
			</tbody>
		</table>
	</div>

	{#if showModal}
		<Dialog styles="shadow-2xl shadow-primary-600">
			<div class="min-h-max px-3 flex flex-col justify-center items-center gap-9 py-6 mx-4">
				<span class="lg:text-2xl text-lg font-semibold text-primary-500 break-words"
					>Continue without a sucessful deployment ?</span
				>
				<div class="flex flex-col text-slate-700 items-center">
					<span class="text-base">Your deployment will continue but if it fails, </span>
					<span class="text-base">your site will not be available for visitors.</span>
					<span class="text-base">
						To initiate another deployment, <b class="text-primary-500">Retry deployment</b>
					</span>
					<span class="text-base">
						or push a commit to your Production branch
						<b class="text-primary-500">main.</b>
					</span>
				</div>
				<div class="flex justify-center items-center gap-6 px-8 min-h-max">
					<ButtonSolid on:click={handleShowModal}>continue</ButtonSolid>
					<ButtonOutlined on:click={handleShowModal}>Cancel</ButtonOutlined>
				</div>
			</div>
		</Dialog>
	{/if}
	<div class="flex justify-end items-end my-10">
		<ButtonOutlined on:click={handleShowModal}>Cancel deployment</ButtonOutlined>
	</div>
	<span class="text-lg font-semibold text-primary-600 ml-2"> Building and deployment settings</span>
	<div
		class="rounded-sm border shadow-inner bg-slate-50 mt-9 px-5 py-9 
	flex flex-col gap-3"
	>
		<div class="flex gap-6">
			<span class="text-base font-semibold text-slate-700">Repository: </span>
			<div class="flex items-center gap-2">
				<img src="/github.svg" alt="github-logo" width="24" />
				<span class="text-slate-700 capitalize text-base"
					>{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}</span
				>
			</div>
		</div>
		<div class="flex gap-6">
			<span class="text-base text-slate-700 font-semibold">Branch: </span>
			<div class="flex gap-1">
				<GitBranchIcon styles="h-6 w-6" />
				<span class="text-base">
					{$ghStore.activeBranch}
				</span>
			</div>
		</div>
		<div class="flex gap-6">
			<span class="text-base text-slate-700 font-semibold">Status: </span>
		</div>
		<div class="flex gap-6">
			<span class="text-base font-semibold text-brown-900">Duration: </span>
		</div>

		<div class=" flex pt-9">
			<ArrowRightIcon styles="text-slate-700" />
			<span class="text-base antialiased"> Build Settings</span>
		</div>
	</div>

	<hr class=" border-t-gray-400 my-9" />
	<div class="flex justify-between items-center lg:px-9">
		<button
			on:click={() => handleNext(1)}
			class="flex border-none bg-transparent text-lg lg:gap-2  text-primary-800 mt-3"
		>
			<ArrowLeftIcon />
			<span class="text-base lg:text-lg text-slate-700">Change settings</span>
		</button>

		<ButtonSolid on:click={() => goto('/apps/github/connect/all-deployments')}>
			Continue to project
		</ButtonSolid>
	</div>
</div>
