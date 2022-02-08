<script lang="ts">
	import Copy from '$lib/icons/copy.svelte';
	import Download from '$lib/icons/download.svelte';
	import LockClosed from '$lib/icons/lock-closed.svelte';
	import Star from '$lib/icons/star.svelte';
	import {RegistryBackend} from '../apis/registry'
	import type { Repository as Repo, TagList } from '../apis/registry';

	export let data: Repo;
	export let compact = true;

	const handleRepoDetail = () => {
		location.href = `u/${data.namespace}`
	}
</script>

{#if compact}
	<div
			id={data.uuid}
			on:click={handleRepoDetail}
			class="hover:shadow-brown-100 cursor-pointer shadow-sm drop-shadow-sm w-11/12 px-8 py-2 my-2 mx-auto bg-brown-400 rounded-lg dark:bg-brown-800"
	>
		<div class="pt-2">
		<span class="dark:text-gray-50 text-lg">
			{data.namespace.split('/')[0]} /
			<span class="font-lato font-semibold">{data.namespace.split('/')[1]}</span>
		</span>
		</div>

		<div class="flex items-center justify-between">
		<span class="text-xs font-light text-gray-500 dark:text-gray-50">
			{new Date().toDateString()}
		</span>

			<div class="flex gap-4">
				<button class="border-none p-0"><Copy /></button>
				<button class="border-none p-0"><Download /></button>
				<button class="border-none p-0"><Star /></button>
				<button class="border-none p-0"><LockClosed /></button>
			</div>
		</div>

		<div class="mt-2" />
	</div>
	{:else}
	<div
			id={data.uuid+ data.namespace}
			on:click={handleRepoDetail}
			class="hover:shadow-brown-100 cursor-pointer shadow-sm drop-shadow-sm w-11/12 px-8 py-2 my-2 mx-2 bg-brown-400 rounded-lg dark:bg-brown-800"
	>
		<div class="pt-2">
		<span class="dark:text-gray-50 text-lg">
			{data.namespace.split('/')[0]} /
			<span class="font-lato font-semibold">{data.namespace.split('/')[1]}</span>
		</span>
		</div>

		<div class="flex items-center justify-between">
		<span class="text-xs font-light text-gray-500 dark:text-gray-50">
			{new Date().toDateString()}
		</span>

			<div class="flex gap-4">
				<button class="border-none p-0"><Copy /></button>
				<button class="border-none p-0"><Download /></button>
				<button class="border-none p-0"><Star /></button>
				<button class="border-none p-0"><LockClosed /></button>
			</div>
		</div>

		<div class="mt-2" />
	</div>
	{/if}
