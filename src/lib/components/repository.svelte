<script lang="ts">
	import { goto } from '$app/navigation';
	import { DownloadIcon, LockOpenIcon, StarIcon } from '$lib/icons';
	import type { Repository } from '$apis/registry';
	import IconButton from '$lib/icon-button.svelte';

	export let data: Repository;
	export let compact = true;

	const handleRepoDetail = () => {
		goto(`u/${data.namespace}`);
	};
</script>

{#if compact}
	<div
		id={data.uuid}
		on:click={handleRepoDetail}
		on:keypress={handleRepoDetail}
		class="hover:shadow-primary-100 cursor-pointer shadow-sm drop-shadow-sm w-full px-8 py-2 my-2 mx-auto
			bg-white rounded"
	>
		<div class="pt-2">
			<span class="text-lg">
				{data.namespace.split('/')[0]} /
				<span class="font-semibold">{data.namespace.split('/')[1]}</span>
			</span>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-xs font-light text-gray-500">
				{new Date(data.created_at).toDateString()}
			</span>

			<div class="flex gap-4">
				<IconButton class="w-3"><DownloadIcon /></IconButton>
				<IconButton class="w-3"><StarIcon /></IconButton>
				<IconButton class="w-3"><LockOpenIcon /></IconButton>
			</div>
		</div>

		<div class="mt-2" />
	</div>
{:else}
	<button
		aria-label="repository button"
		id={data.uuid + data.namespace}
		on:click={handleRepoDetail}
		on:keypress={handleRepoDetail}
		class="hover:shadow-primary-100 z-0 cursor-pointer hover:shadow-2xl w-full px-6 py-2 m-2
	    bg-slate-50 border-[1.5px] border-primary-100 rounded max-w-[850px] flex items-center gap-3"
	>
		<img src="/cube-light.png" alt="" width="33px" />
		<div class="flex flex-col w-full justify-between">
			<div class="pt-2 text-base text-slate-700 flex justify-start items-center gap-3">
				<span>
					{data.namespace.split('/')[0]} /
					<span class="text-primary-500 font-medium">{data.namespace.split('/')[1]}</span>
				</span>
				<div class="rounded-lg bg-emerald-200 text-emerald-900 text-xs px-1">verified image</div>
			</div>

			<div class="flex items-end justify-between w-full">
				<span class="text-xs font-light text-gray-400">
					{new Date(data.created_at).toDateString()}
				</span>

				<div class="flex gap-4">
					<DownloadIcon class="hidden md:flex text-primary-500 h-5 w-5" />
					<StarIcon class="hidden md:flex text-primary-500 h-5 w-5" />
					<LockOpenIcon class="hidden md:flex text-primary-500 h-5 w-5" />
				</div>
			</div>
		</div>

		<div class="mt-2" />
	</button>
{/if}
