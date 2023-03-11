<script>
	import { goto } from '$app/navigation';
	import ModalNew from '$lib/modal-new.svelte';
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

	export let handleNext;

	let showModal = false;
	const handleShowModal = () => {
		showModal = !showModal;
	};
</script>

<div class="desktop:w-[800px] laptop:w-[420px] half:w-[300px]">
	<div class="justify-center flex items-center">
		<span class="text-2xl font-bold text-primary-600"> Building and deploying</span>
	</div>
	<div
		class="flex flex-col space-y-5 desktop:space-y-3 laptop:space-y-2 half:space-y-2 mt-24 
	desktop:mt-16 laptop:mt-10 half:mt-8"
	>
		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-slate-600 text-base apple:text-lg uw:text-lg font-semibold ml-6">
				Initializing build environment
			</span>
		</div>

		<hr class="border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-slate-600 text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Cloning git repository</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-slate-600 text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Building application</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-slate-600 text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Deploying to Akash network</i>
			</span>
		</div>
	</div>
	<div class=" min-h-[30%] border-primary-100 border mt-10 py-4 px-5 shadow-2xl">
		<div class="flex space-x-4 justify-end items-end">
			<div class="flex space-x-2">
				<DownloadIcon styles="h-6 w-6 text-slate-600" />
				<span class="text-base apple:text-lg uw:text-lg text-slate-600"> Download log </span>
			</div>
			<div class="flex space-x-2">
				<CopyIcon styles="text-slate-600" />
				<span class="text-base apple:text-lg uw:text-lg text-slate-600"> Copy log </span>
			</div>
		</div>
		<hr class="border-t-2 border-primary-50 -mx-5 mt-4" />
		<table class="table-auto">
			<tbody>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>...</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>hello world!</td
					>
				</tr>
				<tr>
					<td
						class="text-lg desktop:text-base laptop:text-base half:text-sm font-jetbrains-mono text-slate-600"
						>.... 123</td
					>
				</tr>
			</tbody>
		</table>
	</div>

	{#if showModal}
		<Dialog styles="shadow-2xl shadow-primary-600">
			<div
				class="min-h-max px-5 half:px-1 flex flex-col justify-center items-center gap-8 desktop:gap-6 laptop:gap-4 half:gap-4 py-8 mx-4"
			>
				<div class="flex">
					<span class="text-2xl half:text-lg font-semibold text-primary-500 break-words"
						>Continue without a sucessful deployment ?</span
					>
				</div>
				<div class="flex flex-col text-slate-700 items-center">
					<span class="text-lg desktop:text-base laptop:text-base half:text-base"
						>Your deployment will continue but if it fails,
					</span>
					<span class="text-lg desktop:text-base laptop:text-base half:text-base"
						>your site will not be available for visitors.</span
					>
					<span class="text-lg desktop:text-base laptop:text-base half:text-base">
						To initiate another deployment, <b class="text-primary-500">Retry deployment</b>
					</span>
					<span class="text-lg desktop:text-base laptop:text-base half:text-base">
						or push a commit to your Production branch
						<b class="text-primary-500">main.</b>
					</span>
				</div>
			</div>
			<div class="flex justify-center items-center space-x-5 py-4 px-8 min-h-max">
				<ButtonSolid on:click={handleShowModal}>continue</ButtonSolid>
				<ButtonOutlined on:click={handleShowModal}>Cancel</ButtonOutlined>
			</div>
		</Dialog>
	{/if}
	<div class="flex justify-end items-end my-10">
		<ButtonOutlined on:click={handleShowModal}>Cancel deployment</ButtonOutlined>
	</div>
	<span class="text-xl font-bold text-primary-600 ml-2 desktop:text-lg laptop:text-lg">
		Building and deployment settings</span
	>
	<div
		class="rounded-sm border shadow-inner bg-slate-50 mt-10 desktop:mt-6 laptop:mt-4 px-5 py-10 desktop:py-5 space-y-5"
	>
		<div class="flex space-x-5">
			<span
				class="text-lg desktop:font-medium laptop:text-base half:text-base font-semibold text-slate-700"
				>Repository:
			</span>
			<div class="flex items-center gap-2">
				<img src="/github.svg" alt="github-logo" width="24" />
				<span
					class="text-slate-700 capitalize desktop:text-base laptop:text-sm half:text-sm tracking-wide"
					>{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}</span
				>
			</div>
		</div>
		<div class="flex space-x-4">
			<span
				class="text-lg laptop:text-base half:text-base text-slate-700 font-semibold desktop:font-medium"
				>Branch:
			</span>
			<div class="flex gap-1">
				<GitBranchIcon styles="h-6 w-6" />
				<span class="laptop:text-sm half:text-sm">
					{$ghStore.activeBranch}
				</span>
			</div>
		</div>
		<div class="flex space-x-4">
			<span
				class="text-lg laptop:text-base half:text-base text-slate-700 font-semibold desktop:font-medium"
				>Status:
			</span>
		</div>
		<div class="flex space-x-4">
			<span
				class="text-md laptop:text-base half:text-base font-semibold text-brown-900 desktop:font-medium"
				>Duration:
			</span>
		</div>

		<div class=" flex pt-10 desktop:pt-5 laptop:pt-4 half:pt-4">
			<ArrowRightIcon styles="text-slate-700" />
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg font-light">
				Build Settings</span
			>
		</div>
	</div>

	<hr class=" border-t-gray-400 my-20 desktop:my-12 laptop:my-8" />
	<div class="flex justify-between items-center px-10 laptop:px-2 half:px-2">
		<button
			on:click={() => handleNext(1)}
			class="flex border-none bg-transparent text-lg space-x-2 tracking-wide text-brown-900 mt-3"
		>
			<ArrowLeftIcon />
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg text-slate-700"
				>Change settings</span
			>
		</button>

		<ButtonSolid on:click={() => goto('/apps/github/connect/all-deployments')}>
			Continue to project
		</ButtonSolid>
	</div>
</div>
