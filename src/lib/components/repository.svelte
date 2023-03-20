<script lang="ts">
	import { goto } from '$app/navigation';
	import { DownloadIcon, LockOpenIcon, StarIcon } from '$lib/icons';
	import type { Repository } from '$apis/registry';

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
				<button class="border-none p-0"><DownloadIcon /></button>
				<button class="border-none p-0"><StarIcon /></button>
				<button class="border-none p-0"><LockOpenIcon /></button>
			</div>
		</div>

		<div class="mt-2" />
	</div>
{:else}
	<div
		id={data.uuid + data.namespace}
		on:click={handleRepoDetail}
		on:keypress={handleRepoDetail}
		class="hover:shadow-primary-100 z-0 cursor-pointer hover:shadow-2xl w-full px-8 py-2 my-2 mx-2 bg-white 
		border-2 border-primary-100 rounded-sm max-w-[850px]"
	>
		<div class="pt-2 text-base lg:text-lg text-slate-700">
			<span>
				{data.namespace.split('/')[0]} /
				<span class="text-primary-500 font-medium">{data.namespace.split('/')[1]}</span>
			</span>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-xs font-light text-gray-400">
				{new Date(data.created_at).toDateString()}
			</span>

			<div class="flex gap-4">
				<DownloadIcon styles="text-primary-500 h-5 lg:h-6 w-5 lg:w-6" />
				<StarIcon styles="text-primary-500 h-5 lg:h-6 w-5 lg:w-6" />
				<LockOpenIcon styles="text-primary-500 h-5 lg:h-6 w-5 lg:w-6" />
			</div>
		</div>

		<div class="mt-2" />
	</div>
{/if}
