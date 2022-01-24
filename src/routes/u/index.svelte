<script lang="ts">
    import {onMount, setContext} from "svelte";
    import Profile from '$lib/icons/profile.svelte';
    import User from '$lib/icons/user.svelte';
    import Repository from '../../components/repository.svelte';
    import {RegistryBackend, Repository as Repo} from "../../apis/registry";
    let isRepo = true;
    let isStarred = false;
    let isContrib = false;

    const toggleRepo = () => {
        isContrib = false;
        isStarred = false;
        isRepo = true;
    };
    const toggleStarred = () => {
        isRepo = false;
        isContrib = false;
        isStarred = true;
    };
    const toggleisContrib = () => {
        isRepo = false;
        isStarred = false;
        isContrib = true;
    };

    const backend = new RegistryBackend();

    let repositoryList: Repo[] = [];

    onMount(()=>{
        backend.ListRepositories().then((repoList: Repo[]) => {
            console.log('loiiiiii: ', repoList)
            repositoryList = repoList
        })
        backend.ListTags("johndoe/openregistry")
    })

</script>

<div class="min-h-[93vh] dark:bg-brown-900 bg-cream-50">
<div class="flex gap-5 space-x-10 min-w-full justify-start items-center min-h-[20vh] dark:bg-brown-800 mt-20 px-20 bg:cream-50">
    <div class="px-4"></div>
    <div>
        <Profile/>
    </div>
    <div class="flex-initial w-64">
        <h1 class="text-5xl font-medium text-gray-200"> Jane Doe</h1>
        <div class="flex mt-3">
            <User/>
            <span class="text-lg text-gray-200">Community User</span>
        </div>

    </div>
    <div class="flex flex-col flex-initial w-32">
        <a class="dark:text-gray-100 text-2xl underline-offset-4" href="/settings"> Edit Profile</a>
        <span class="mt-3 text-lg text-gray-200"> Joined Today</span>
    </div>
</div>

<div class="flex gap-5 items-start justify-items-center dark:bg-brown-800 space-x-10 pb-2 px-40 mb-10">
    <button
            on:click={toggleRepo}
            class="ease-in duration-300 h-10 pb-9 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base focus:outline-none hover:border-b-gray-50">
        Repositories
    </button>

    <button
            on:click={toggleStarred}
            class="ease-in duration-300 h-10 px-4 pb-9 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base focus:outline-none hover:border-b-gray-50">
        Starred
    </button>

    <button
            on:click={toggleisContrib}
            class="ease-in duration-300 h-10 px-4 pb-9 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-2xl dark:text-gray-200 whitespace-nowrap cursor-base focus:outline-none hover:border-b-gray-50">
        Contributed
    </button>
</div>

    {#if isRepo}
        <div>
            <div class="w-full px-4">
                {#each repositoryList as item}
                    <Repository data={item}/>
                {/each}
            </div>
        </div>
        {/if}

    {#if isStarred}
        <div>
            <h1 class="text-7xl text-white">Starred</h1>
        </div>
    {/if}

    {#if isContrib}
        <div>
            <h1 class="text-7xl text-white"> Contribution </h1>
        </div>
    {/if}
</div>

