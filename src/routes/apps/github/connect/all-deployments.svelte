<script lang="ts">
    import { fade, slide, scale } from 'svelte/transition';
    import Settings from '$lib/icons/settings.svelte';
    import Cross from '$lib/icons/plain-cross.svelte';
    import ExternalLink from '$lib/icons/external-link.svelte';
    import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";


  const handleTabSelect = (opts:any) => {
        console.log("is selected: ", opts)
        return opts.selected ? 
        `font-semibold  border-0 border-b-4 border-brown-700 text-lg tracking-wide` : 
        `border-none selection:bg-brown-500 text-lg tracking-wide`
  };

</script>


<div class="bg-cream-50 items-start space-y-6 px-20 pb-52 pt-20 min-h-max w-[100vw]">
    <TabGroup>
        <TabList class="text-lg space-x-5 ml-2" >
            <Tab class={handleTabSelect}>Deployments</Tab>
            <Tab class={handleTabSelect}>Custom domains</Tab>
            <Tab class={handleTabSelect}>Settings</Tab>
            <div class="border-t-2 border-gray-400 -mt-3 w-full"></div>
        </TabList>
        
        <div class="" transition:fade={{ delay: 300, duration: 300 }}>
            <TabPanels>
                <TabPanel>
                    <div class="flex space-x-8 relative bg-white rounded-md px-20 py-12 min-h-max border-2 border-gray-500 border-opacity-50 mt-10">
                        <picture>
                            <img src="/deployment.svg" alt="logo">
                        </picture>
                        <div class="flex flex-col space-y-10 justify-center">
                            <span class="text-2xl font-semibold text-brown-900"> Congratulations on your first deployment!</span>
                            <span class="text-lg"> you can now do more with your site. invite collaborators, protect previews, enable web 
                                analytics <br/> and more.</span>
                            <button class="border-0 bg-transparent w-44 rounded-lg">
                                <div class="flex space-x-2">
                                    <Settings styles="text-brown-800"/>
                                    <span> Explore Settings</span>
                                    </div>
                            </button>
                        </div>
                        <button class="absolute right-4 top-4 bg-transparent border-none">
                            <Cross styles="w-6 h-6"/>
                        </button>
                    </div>
                    <div class="flex flex-col space-x-8 bg-white rounded-md px-12 py-12 min-h-max border-2 border-gray-400 mt-10 border-l-4 border-l-green-600 border-opacity-100">
                        <div class="flex justify-between">
                            <span class="text-lg font-semibold">Production</span>
                            <button class= "flex space-x-1 bg-transparent border-0">
                                <span class="underline underline-offset-4 text-lg text-brown-800">visit site</span>
                                <ExternalLink styles="h-4 w-4 text-brown-800"/>
                            </button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <span>
                        hello second tab
                    </span> 
                </TabPanel>
                <TabPanel>
                    <span>
                        meh
                    </span>
                </TabPanel>
            </TabPanels>
        </TabGroup>
        </div>
        

  