<script lang="ts">
	import { goto } from '$app/navigation';

	import Copy from '$lib/icons/copy.svelte';
	import Download from '$lib/icons/download.svelte';
	import LockOpen from '$lib/icons/lock-open.svelte';
	import Star from '$lib/icons/star.svelte';
	import type { Repository } from '../apis/registry';

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
		class="hover:shadow-brown-100 cursor-pointer shadow-sm drop-shadow-sm w-11/12 px-8 py-2 my-2 mx-auto
			bg-brown-400 rounded-lg"
	>
		<div class="pt-2">
			<span class="text-lg">
				{data.namespace.split('/')[0]} /
				<span class="font-lato font-semibold">{data.namespace.split('/')[1]}</span>
			</span>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-xs font-light text-gray-500">
				{new Date(data.created_at).toDateString()}
			</span>

			<div class="flex gap-4">
				<button class="border-none p-0"><Download /></button>
				<button class="border-none p-0"><Star /></button>
				<button class="border-none p-0"><LockOpen /></button>
			</div>
		</div>

		<div class="mt-2" />
	</div>
{:else}
	<div
		id={data.uuid + data.namespace}
		on:click={handleRepoDetail}
		class="hover:shadow-brown-100 cursor-pointer shadow-sm drop-shadow-sm w-11/12 px-8 py-2 my-2 mx-2 bg-brown-400 rounded-lg"
	>
		<div class="pt-2">
			<span class="text-lg">
				{data.namespace.split('/')[0]} /
				<span class="font-lato font-semibold">{data.namespace.split('/')[1]}</span>
			</span>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-xs font-light text-gray-500">
				{new Date(data.created_at).toDateString()}
			</span>

			<div class="flex gap-4">
				<Download styles="bg-brown-400 h-6 w-6" />
				<Star styles="bg-brown-400 h-6 w-6" />
				<LockOpen styles="bg-brown-400 h-6 w-6" />
			</div>
		</div>

		<div class="mt-2" />
	</div>
{/if}
