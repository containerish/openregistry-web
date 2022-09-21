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

	export let handleNext;

	let showModal = false;
	const handleShowModal = () => {
		showModal = !showModal;
	};
</script>

<div>
	<div class="justify-center flex items-center">
		<span class="text-2xl font-bold text-brown-800"> Building and deploying</span>
	</div>
	<div class="min-w-[70vw] desktop:min-w-[62vw] uw:min-w-[40vw]" />
	<div class="flex flex-col space-y-5 mt-24">
		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg font-semibold ml-6">
				Initializing build environment
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-base desktop:text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Cloning git repository</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-base desktop:text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Building application</i>
			</span>
		</div>

		<hr class=" border-t-gray-400" />

		<div class="flex">
			<SpinnerCircle styles="invisible" />
			<span
				class="text-base desktop:text-base apple:text-lg uw:text-lg font-normal ml-6 text-gray-600"
			>
				<i>Deploying to Akash network</i>
			</span>
		</div>
	</div>
	<div class=" min-h-[30%] bg-cream-50 border-brown-400 border-t-2 border-b-2 mt-10 py-4 px-5">
		<div class="flex space-x-4 justify-end items-end">
			<div class="flex space-x-2">
				<DownloadIcon styles="h-6 w-6" />
				<span class="text-base desktop:text-base apple:text-lg uw:text-lg text-brown-900">
					Download log
				</span>
			</div>
			<div class="flex space-x-2">
				<CopyIcon />
				<span class="text-base desktop:text-base apple:text-lg uw:text-lg text-brown-900">
					Copy log
				</span>
			</div>
		</div>
		<hr class="border-t-2 border-brown-400 -mx-5 mt-4" />
		<table class="table-auto">
			<tbody>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">...</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">hello world!</td>
				</tr>
				<tr>
					<td class="text-lg font-jetbrains-mono text-gray-700">.... 123</td>
				</tr>
			</tbody>
		</table>
	</div>

	{#if showModal}
		<ModalNew>
			<div class="min-h-max px-5 flex flex-col space-y-5 py-8 mx-4">
				<div class="flex">
					<span class="text-3xl text-brown-800">Continue without a sucessful deployment ?</span>
					<button on:click={handleShowModal} class="bg-transparent border-none text-sm inline-flex">
						<CrossIcon styles="w-8 h-8 text-brown-800" />
					</button>
				</div>
				<span class="text-lg"
					>Your deployment will continue but if it fails, your site will not be available for
					visitors.</span
				>
				<span class="text-lg">
					To initiate another deployment, <b>Retry deployment</b> or push a commit to your
					Production branch
					<b>main.</b>
				</span>
			</div>
			<div class="flex justify-end items-center space-x-5 px-8 min-h-max py-6 bg-brown-500">
				<button
					on:click={handleShowModal}
					class="text-lg font-semibold text-brown-900 tracking-wide bg-transparent border-none px-2 py-1"
				>
					Cancel
				</button>
				<button
					on:click={handleShowModal}
					class="rounded-md bg-brown-700 text-white text-lg py-2 px-5 tracking-wide border-none"
				>
					Continue
				</button>
			</div>
		</ModalNew>
	{/if}
	<div class="flex justify-end items-end my-10">
		<ButtonOutlined on:click={handleShowModal}>Cancel deployment</ButtonOutlined>
	</div>
	<span class="text-lg font-bold text-brown-900 ml-2"> Building and deployment settings</span>
	<div class="rounded-md border-2 border-gray-500 mt-10 px-5 py-10 border-opacity-40 space-y-5">
		<div class="flex space-x-4">
			<span class="text-md font-semibold text-brown-900">Repository: </span>
			<img src="/github.svg" alt="github-logo" width="24" />
			<span class=" capitalize text-md tracking-wide"
				>{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}</span
			>
		</div>
		<div class="flex space-x-4">
			<span class="text-md font-semibold text-brown-900">Branch: </span>
			<GitBranchIcon styles="h-6 w-6" />
			<span>
				{$ghStore.activeBranch}
			</span>
		</div>
		<div class="flex space-x-4">
			<span class="text-md font-semibold text-brown-900">Status: </span>
		</div>
		<div class="flex space-x-4">
			<span class="text-md font-semibold text-brown-900">Duration: </span>
		</div>

		<div class=" flex pt-10">
			<ArrowRightIcon styles="text-brown-900" />
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg font-light">
				Build Settings</span
			>
		</div>
	</div>

	<hr class=" border-t-gray-400 mt-20" />
	<div class="flex justify-between items-center px-10 pt-5">
		<button
			on:click={() => handleNext(1)}
			class="flex border-none bg-transparent text-lg space-x-2 tracking-wide text-brown-900 mt-3"
		>
			<ArrowLeftIcon />
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg text-brown-800"
				>Change settings</span
			>
		</button>

		<ButtonSolid onClick={() => goto('/apps/github/connect/all-deployments')}>
			Continue to project
		</ButtonSolid>
	</div>
</div>
