<script lang="ts">
	import { goto } from '$app/navigation';
	import { ghStore } from '$lib/stores';
	import type { StreamLogsRequestSchema } from '$lib/schemas/logs-api';
	import {
		SpinnerCircle,
		DownloadIcon,
		CopyIcon,
		GitBranchIcon,
		ArrowRightIcon,
		ArrowLeftIcon
	} from '$lib/icons/';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import Dialog from '$lib/dialog.svelte';
	import { onMount } from 'svelte';
	import IconButton from '$lib/icon-button.svelte';

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
		const body = {
			repoName: 'Adv360-Pro-ZMK',
			repoOwner: 'jay-dee7',
			runId: 4521071102
		};
		const response = await fetch('/apis/services/github/actions/logs', {
			method: 'POST',
			body: JSON.stringify(body)
		});
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
	};
</script>

<div class="flex flex-col gap-6">
	<div class="justify-center flex items-center">
		<span class="text-2xl font-bold text-primary-600"> Building your project</span>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex">
			<SpinnerCircle class="invisible" />
			<span class="text-slate-600 text-base font-semibold ml-6">
				Initializing build environment
			</span>
		</div>

		<hr />

		<div class="flex">
			<SpinnerCircle class="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Cloning git repository</i>
			</span>
		</div>

		<hr />

		<div class="flex">
			<SpinnerCircle class="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Building application</i>
			</span>
		</div>

		<hr />

		<!-- <div class="flex">
			<SpinnerCircle class="invisible" />
			<span class="text-slate-600 text-base font-normal ml-6 text-gray-600">
				<i>Deploying to Akash network</i>
			</span>
		</div> -->
	</div>
	<div class="border-primary-100 border bg-slate-100 rounded">
		<div class="flex gap-6 justify-end items-end bg-primary-100/70 py-2 px-5">
			<IconButton class="w-1 p-0 m-0">
				<DownloadIcon class="h-6 w-6 text-slate-600" />
				<span class="text-base text-slate-600"> Download log </span>
			</IconButton>
			<IconButton class="w-1 p-0 m-0">
				<CopyIcon class="text-slate-600" />
				<span class="text-base text-slate-600"> Copy log </span>
			</IconButton>
		</div>

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
		<Dialog class="shadow-2xl shadow-slate-500">
			<div class="min-h-max flex flex-col justify-center items-center gap-9 p-6 max-w-[450px]">
				<span class="lg:text-2xl text-lg font-semibold text-rose-700 break-words"
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
				<div class="flex justify-center items-center gap-6 w-full">
					<ButtonOutlined class="w-full text-rose-700 border-rose-700/70" on:click={handleShowModal}
						>Continue</ButtonOutlined
					>
					<ButtonOutlined class="w-full" on:click={handleShowModal}>Cancel</ButtonOutlined>
				</div>
			</div>
		</Dialog>
	{/if}
	<div class="flex justify-end items-end">
		<ButtonOutlined class="border-rose-300 text-rose-400" on:click={handleShowModal}
			>Cancel deployment</ButtonOutlined
		>
	</div>
	<span class="text-lg font-semibold text-primary-500 ml-2"> Build Settings</span>
	<div
		class="rounded-sm border shadow-inner bg-slate-50 px-5 py-6
	flex flex-col gap-3"
	>
		<div class="flex gap-6">
			<span class="text-base font-semibold text-slate-700">Repository: </span>
			<div class="flex items-center gap-2">
				<img src="/github.svg" alt="github-logo" width="24" />
				<span class="text-slate-700 text-base"
					>{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}</span
				>
			</div>
		</div>
		<div class="flex gap-5">
			<span class="text-base text-slate-700 font-semibold">Branch: </span>
			<div class="flex gap-1">
				<GitBranchIcon class="h-6 w-6" />
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

		<div class="flex">
			<ArrowRightIcon class="text-slate-700" />
			<span class="text-base antialiased"> Build Settings</span>
		</div>
	</div>

	<div class="flex flex-col md:flex-row justify-between items-center lg:px-9">
		<button
			aria-label="tab button"
			on:click={() => handleNext(1)}
			class="flex border-none bg-transparent lg:gap-2 text-primary-800 mt-3"
		>
			<ArrowLeftIcon />
			<span class="text-base text-slate-700">Change settings</span>
		</button>

		<ButtonSolid on:click={() => goto('/apps/github/connect/all-deployments')}>
			Continue to project
		</ButtonSolid>
	</div>
</div>
