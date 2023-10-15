<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        DownloadIcon,
        LockClosedIcon,
        LockOpenIcon,
        StarIcon,
    } from "$lib/icons";
    import IconButton from "$lib/icon-button.svelte";
    import type { Repository } from "$lib/types/registry";

    export let username: string;
    export let repository: Repository;
    export let compact = true;

    const handleRepoDetail = () => {
        goto(`u/${username}/${repository.name}`);
    };
</script>

{#if compact}
    <div
        role="button"
        tabindex={1}
        id={repository.id}
        on:click={handleRepoDetail}
        on:keypress={handleRepoDetail}
        class="hover:shadow-primary-100 cursor-pointer shadow-sm drop-shadow-sm w-full px-8 py-2 my-2 mx-auto
			bg-white rounded"
    >
        <div class="pt-2">
            <span class="text-lg">
                {username} /
                <span class="font-semibold">{repository.name}</span>
            </span>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-xs font-light text-gray-500">
                {new Date(repository.created_at).toDateString()}
            </span>

            <div class="flex gap-4">
                <IconButton class="w-3"><DownloadIcon /></IconButton>
                <IconButton class="w-3"><StarIcon /></IconButton>
                {#if repository.visibility === "Private"}
                    <IconButton class="w-3">
                        <LockClosedIcon />
                    </IconButton>
                    It's locked
                {:else}
                    <IconButton class="w-3">
                        <LockOpenIcon />
                    </IconButton>
                    It's unlocked
                {/if}
            </div>
        </div>
        <div class="mt-2" />
    </div>
{:else}
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
            <div
                class="pt-2 text-base text-slate-700 flex justify-start items-center gap-3"
            >
                <span>
                    {username} /
                    <span class="text-primary-500 font-medium"
                        >{repository.name}</span
                    >
                </span>
                <div
                    class="rounded-lg bg-emerald-200 text-emerald-900 text-xs px-1"
                >
                    verified image
                </div>
            </div>

            <div class="flex items-end justify-between w-full">
                <span class="text-xs font-light text-gray-400">
                    {new Date(repository.created_at).toDateString()}
                </span>

                <div class="flex gap-4">
                    <DownloadIcon
                        class="hidden md:flex text-primary-500 h-5 w-5"
                    />
                    <StarIcon class="hidden md:flex text-primary-500 h-5 w-5" />
                    {#if repository.visibility === "Private"}
                        <LockClosedIcon
                            class="hidden md:flex text-red-500 h-5 w-5"
                        />
                    {:else}
                        <LockOpenIcon
                            class="hidden md:flex text-primary-500 h-5 w-5"
                        />
                    {/if}
                </div>
            </div>
        </div>
        <div class="mt-2" />
    </button>
{/if}
