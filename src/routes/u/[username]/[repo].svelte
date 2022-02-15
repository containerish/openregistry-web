<script lang="ts" context="module">
    import Copy from '$lib/icons/copy.svelte';
    import Download from '$lib/icons/download.svelte';
    import LockClosed from '$lib/icons/lock-closed.svelte';
    import Star from '$lib/icons/star.svelte';
    import Card from "$lib/card.svelte";
    import Globe from '$lib/icons/globe.svelte';
    import {RegistryBackend} from '../../../apis/registry'
    import type { Repository as Repo, TagList } from '../../../apis/registry';
    import {onMount} from "svelte";

    let isOverview = true;
    let isTags = false;

    const toggleOverview = () => {
        isOverview = true;
        isTags = false;
    };

    const toggleTags = () => {
        isTags = true;
        isOverview = false;
    };

    let repo;
    let username;
    const registryBackend = new RegistryBackend()

    const repoDetail = (namespace: string) => {
        registryBackend.ListTags(namespace).then((tagList: TagList) => {
            console.log('repoinfo: ', tagList)
        })
    }

    export async function load({ params, fetch, session, stuff }) {
        console.log('pkjsdkf: ', params.repo, params.username)
        repo = params.repo
        username = params.username
        return true
    }
</script>

<div class="min-h-[93vh] dark:bg-brown-900 bg-cream-50">
    <div class="flex flex-col w-full h-full mt-20">
        <div class="flex py-24 px-20 space-x-10 w-full bg-brown-400">
            <div>
                <Globe styles="h-16 w-16" />
            </div>
            <div class="w-full">
                <div class="flex gap-4">
                    <h1 class="text-4xl font-medium dark:text-gray-200">{username}/{repo}</h1>
                    <Star styles="w-8 h-8 mt-1.5"/>
                </div>
                <span class="text-md dark:text-gray-200">by {username}</span>
            </div>
        </div>

        <div
        class="flex gap-5 items-start justify-items-center dark:bg-brown-800 bg-brown-400 space-x-10 px-16 mb-10"
        >
            <button
                    on:click={toggleOverview}
                    class="ease-in duration-300 h-10 pb-9 py-2 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base
					focus:outline-none dark:hover:border-b-gray-50 hover:border-b-black"
            >
                Overview
            </button>

            <button
                    on:click={toggleTags}
                    class="ease-in duration-300 h-10 px-4 pb-9 text-center text-brown-900 bg-transparent border-b-2
					border-transparent apple:text-xl uw:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base
					focus:outline-none dark:hover:border-b-gray-50 hover:border-b-black"
            >
                Tags
            </button>
        </div>

        <div class="w-full flex ml-5">
            {#if isOverview}
                <div class="bg-gray-50 w-2/3 rounded-md px-28 py-20 flex justify-center items-center">
                    <span class="text-brown-700 text-2xl">No Overview Available</span>
                </div>
            {/if}
            {#if isTags}
                <div class="bg-gray-50 w-2/3 rounded-md px-28 py-20 flex justify-center items-center">
                    <span class="text-brown-700 text-2xl">Your tags will show here</span>
                </div>
            {/if}
            <div class="flex flex-col rounded-md mx-4 my-4 bg-gray-50 px-4 py-4">
                <h1 class="text-xl font-medium dark:text-gray-200 mb-4">Docker Push Command</h1>
                <span class="rounded-md bg-gray-400 text-sm text-gray-900 px-4 py-2"> docker push cntr.sh/janedoe/openregistry:tagname</span>
            </div>
        </div>
    </div>
</div>


