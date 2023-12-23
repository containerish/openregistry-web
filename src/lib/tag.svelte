<script lang="ts">
	import CopyIcon from './icons/copy.svelte';
	import { onDestroy } from 'svelte';
	import type { ImageManifest } from './types/registry';

	export let manifest: ImageManifest;
	export let namespace: string;

	let selected = '';
	let timeout: ReturnType<typeof setTimeout>;
	const copyCommandToClipboard = () => {
		selected = manifest.reference;
		navigator.clipboard.writeText(`docker pull openregistry.dev/${namespace}:${manifest.reference}`);
		setTimeout(() => {
			selected = '';
		}, 2000);
	};

	onDestroy(() => clearTimeout(timeout));
</script>

{#if manifest}
	<div class="flex flex-col gap-5 w-full p-4 border-b border-primary-100/40">
		<div class="flex px-6 items-center justify-start gap-9 lg:justify-between">
			<div>
				<span class="text-base lg:text-lg text-slate-600">
					Tag: <span class="font-semibold text-base lg:text-lg text-primary-300">
						{manifest.reference}
					</span>
				</span>
			</div>
			<div
				on:click={copyCommandToClipboard}
				on:keypress={copyCommandToClipboard}
				class="flex justify-center items-center text-md px-2 py-1 rounded-sm cursor-pointer"
			>
				{#if selected === manifest.reference}
					Command copied!!
				{:else}
					<CopyIcon class="w-6 h-6 text-primary-400" />
				{/if}
			</div>
		</div>

		<div
			class="px-6 flex flex-col lg:flex-row gap-9 lg:gap-5 justify-between items-start text-sm lg:text-base
			 text-slate-600 font-medium"
		>
			<div class="flex flex-col gap-3">
				<span>Digest (SHA256)</span>
				<span class=" text-sm text-slate-500 font-normal">{manifest.digest.slice(7, 28)}</span>
			</div>

			<div class="flex flex-col gap-3">
				<span>Updated At</span>
				<span class="text-sm text-slate-500 font-normal">
					{#if new Date(manifest.updatedAt).toDateString().toLowerCase().endsWith('0001')}
						{new Date(manifest.createdAt).toDateString()}
					{:else}
						{new Date(manifest.updatedAt).toDateString()}
					{/if}
				</span>
			</div>
			<div class="flex flex-col gap-3">
				<span>Schema Version</span>
				<span class="break-all text-sm text-slate-500 font-normal">{manifest.schemaVersion}</span>
			</div>

			<!-- <div class="flex flex-col gap-3"> -->
			<!-- 	<span>Content Link</span> -->
			<!-- 	<span class="break-all text-sm text-slate-500 font-normal">{manifest.dfs_link}</span> -->
			<!-- </div> -->

			<div class="flex flex-col gap-3">
				<span>Size (compressed)</span>
				<span class=" text-sm text-slate-500 font-normal">{(manifest.size / 1000000).toFixed(2)} MB</span>
			</div>
		</div>
	</div>
{/if}
