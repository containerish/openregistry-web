<script lang="ts">
	import CopyIcon from './icons/copy.svelte';
	import type { Tag } from '$apis/registry';
	import { onDestroy } from 'svelte';
	// @ts-ignore
	export let tag: Tag;
	export let namespace: string;

	let selected = '';
	let timeout: any;
	const copyCommandToClipboard = () => {
		selected = tag.reference;
		navigator.clipboard.writeText(`docker pull openregistry.dev/${namespace}:${tag.reference}`);
		setTimeout(() => {
			selected = '';
		}, 2000);
	};

	onDestroy(() => clearTimeout(timeout));
</script>

{#if tag}
	<div class="flex flex-col gap-5 w-full p-4">
		<div class="flex py-2 px-6 items-center justify-start gap-9 lg:justify-between">
			<div>
				<span class="text-base lg:text-lg text-slate-600">
					Tag: <span class="font-semibold text-base lg:text-lg text-primary-300"
						>{tag.reference}</span
					>
				</span>
			</div>
			<div
				on:click={copyCommandToClipboard}
				on:keypress={copyCommandToClipboard}
				class="flex justify-center items-center text-md px-2 py-1 rounded-sm cursor-pointer"
			>
				{#if selected === tag.reference}
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
				<span class=" text-sm text-slate-500 font-normal">{tag.digest.slice(7, 28)}</span>
			</div>

			<div class="flex flex-col gap-3">
				<span>Updated At</span>
				<span class=" text-sm text-slate-500 font-normal"
					>{new Date(tag.updated_at).toDateString()}</span
				>
			</div>

			<div class="flex flex-col gap-3">
				<span>Content Link</span>
				<span class="break-all text-sm text-slate-500 font-normal">{tag.sky_link}</span>
			</div>

			<div class="flex flex-col gap-3">
				<span>Size (compressed)</span>
				<span class=" text-sm text-slate-500 font-normal">{(tag.size / 1000000).toFixed(2)} MB</span
				>
			</div>
		</div>
	</div>
{/if}
