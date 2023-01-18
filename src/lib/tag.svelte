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
		<div class="flex py-2 items-center justify-between">
			<div>
				<span class="text-lg desktop:text-[16px] text-slate-600">
					Tag: <span class="font-semibold text-lg desktop:text-[16px] text-primary-300"
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
					<CopyIcon styles="w-8 h-8 text-primary-400 desktop:w-6 desktop:h-6" />
				{/if}
			</div>
		</div>

		<div class="table w-full">
			<div class="table-header-group">
				<div class="w-full table-row h-10 text-lg desktop:text-[16px]">
					<div class="table-cell text-slate-600 font-medium text-left">Digest (SHA256)</div>
					<div class="table-cell text-slate-600 font-medium text-left">Updated At</div>
					<div class="table-cell text-slate-600 font-medium text-left">Content Link</div>
					<div class="table-cell text-slate-600 font-medium text-left">Size (compressed)</div>
				</div>
			</div>
			<div class="table-row-group text-slate-500 text-lg desktop:text-[16px]">
				<div class="table-row">
					<div class="table-cell text-ellipsis max-w-xs">{tag.digest.slice(7, 28)}</div>
					<div class="table-cell">{new Date(tag.updated_at).toDateString()}</div>
					<div class="table-cell overflow-hidden text-ellipsis">{tag.sky_link}</div>
					<div class="table-cell">{(tag.size / 1000000).toFixed(2)} MB</div>
				</div>
			</div>
		</div>
	</div>
{/if}
