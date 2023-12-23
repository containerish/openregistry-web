<script lang="ts">
	import { goto } from '$app/navigation';
	import { DownloadIcon, LockClosedIcon, LockOpenIcon, StarIcon } from '$lib/icons';
	import type { Repository } from '$lib/types/registry';

	export let repository: Repository;
	export let compact = true;

	const handleRepoDetail = () => {
		goto(`u/${repository.user?.username}/${repository.name}`);
	};
</script>

<button
	aria-label="repository button"
	id={repository.id}
	on:click={handleRepoDetail}
	on:keypress={handleRepoDetail}
	class="hover:shadow-primary-100 z-0 cursor-pointer hover:shadow-2xl w-full px-6 py-2 m-2
	    bg-slate-50 border-[1.5px] border-primary-100 rounded max-w-[850px] flex items-center gap-3"
>
	<img src="/cube-light.png" alt="" width="33px" />
	<div class="flex flex-col w-full justify-between">
		<div class="pt-2 text-base text-slate-700 flex justify-start items-center gap-3">
			<span>
				{repository.user?.username} /
				<span class="text-primary-500 font-medium">{repository.name}</span>
			</span>
			<div class="rounded-lg bg-emerald-200 text-emerald-900 text-xs px-1"> verified image </div>
		</div>

		<div class="flex items-end justify-between w-full">
			<span class="text-xs font-light text-gray-400">
				{new Date(repository.created_at).toDateString()}
			</span>

			<div class="flex gap-4">
				<div class="flex items-center gap-1">
					<DownloadIcon class="hidden md:flex text-primary-500 h-5 w-5" />
					<span class="text-xs text-slate-600">
						{repository.pull_count}
					</span>
				</div>
				<div class="flex items-center gap-1">
					<StarIcon class="hidden md:flex text-primary-500 h-5 w-5" />
					<span class="text-xs text-slate-600">
						{repository.favorite_count}
					</span>
				</div>
				{#if repository.visibility === 'Private'}
					<LockClosedIcon class="hidden md:flex text-red-500 h-5 w-5" />
				{:else}
					<LockOpenIcon class="hidden md:flex text-primary-500 h-5 w-5" />
				{/if}
			</div>
		</div>
	</div>
	<div class="mt-2" />
</button>
