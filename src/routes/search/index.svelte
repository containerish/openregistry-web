<script lang="ts">
    import Card from '$lib/card.svelte';
    import Modal from '$lib/modal.svelte';
    import Pagination from '$lib/pagination.svelte';
    import { onMount, setContext } from 'svelte';
    import NewRepository from '../../components/newRepository.svelte';
    import Repository from '../../components/repository.svelte';
    import { RegistryBackend } from '../../apis/registry.ts';
    import { Repository as Repo } from '../../apis/registry';
    import Checkbox from '$lib/checkbox.svelte';
    import type { AxiosResponse } from 'axios';

    const backend = new RegistryBackend();

    let repositoryList: Repo[] = [];

    onMount(() => {
        backend.ListRepositories().then((repoList: Repo[]) => {
            if (!repoList) {
                return;
            }
            console.log('loiiiiii: ', repoList);
            repositoryList = repoList;
        });
        backend.ListTags('johndoe/openregistry');
    });

    let showModal = false;
    const toggleModal = () => {
        showModal = !showModal;
    };

    setContext('toggleModal', toggleModal);
    console.log('repo list', repositoryList);
</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50 dark:bg-brown-900">
    <div class="flex w-full h-full max-w-[3000px]">
        <div class="h-full w-1/3 px-4 py-4 my-4">
            <h3 class="font-semibold font-lato text-xl mb-4 text-brown-900">Filters</h3>
            <div class="my-5">
                <span class="text-lg font-lato text-brown-800">Operating System</span>
                <ul>
                    <li> <Checkbox label="Linux"/></li>
                    <li>
                        <Checkbox label="Windows"/>
                    </li>
                </ul>
            </div>
            <div class="my-5">
                <span class="text-lg font-lato text-brown-800">Categories</span>
                <ul>
                    <li>
                        <Checkbox label="Analytics"/>
                    </li>
                    <li> <Checkbox label="Base Images"/></li>
                    <li> <Checkbox label="Databases"/></li>
                    <li> <Checkbox label="Devops tools"/></li>
                    <li> <Checkbox label="Featured Images"/></li>
                    <li> <Checkbox label="Operating Systems"/></li>
                    <li> <Checkbox label="Programming Languages"/></li>
                    <li> <Checkbox label="Messaging Services"/></li>
                    <li> <Checkbox label="Application Frameworks"/></li>
                </ul>
            </div>
            <div class="my-5">
                <span class="text-lg font-lato text-brown-800">Architectures</span>
                <ul>
                    <li><Checkbox label="ARM32"/></li>
                    <li> <Checkbox label="ARM64"/></li>
                    <li> <Checkbox label="X86"/></li>
                    <li> <Checkbox label="X86-64"/></li>
                </ul>
            </div>

        </div>
        <div class="w-3/4 my-8">
            <div class="flex px-4 pb-2 justify-between uw:px-36 apple:px-24">
                <button
                        on:click={toggleModal}
                        class="px-4 mx-1 lg:mr-0 text-gray-700 border-2 border-brown-100 dark:border-brown-800 bg-white rounded-md sm:inline dark:bg-brown-900 dark:text-gray-100 hover:bg-brown-50 dark:hover:bg-brown-800 hover:text-gray-700 dark:hover:text-gray-100"
                >
                    Sort
                </button>
                {#if showModal}
                    <Modal>
                        <NewRepository />
                    </Modal>
                {/if}
            </div>

            {#if repositoryList && repositoryList.length > 0}
                <div class="w-full">
                    {#each repositoryList as repo}
                        <Repository data={repo} compact={false} />
                    {/each}
                </div>

                <div class="flex justify-center py-4 bg-cream-50 dark:bg-brown-900">
                    <Pagination />
                </div>
            {:else}
                <div class="flex justify-center items-center">
                    <div class="bg-gray-50 w-10/12 rounded-md px-20 py-20 my-5 flex justify-center items-center">
                        <span class="text-brown-800 text-4xl">No Repositories</span>
                    </div>
                </div>

            {/if}
        </div>
    </div>
</Card>
