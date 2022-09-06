<script>
    import AddAccount from "$lib/icons/add-account.svelte";
    import { goto } from "$app/navigation";
    import {fade, slide, scale} from "svelte/transition";
</script>

<div class="flex flex-col bg-cream-50 items-center space-y-6 px-10 pb-52 pt-20 min-h-[77vh]">
    <div class="flex static space-x-2 mx-4 mb-10">
        <div class="rounded-full bg-brown-600 w-6 text-white shadow-lg flex justify-center">1</div>
        <div class="text-sm">select repository</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div 
        on:click={() => goto("/apps/github/connect/setup")}
        class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center cursor-pointer">2</div>
        <div class="text-sm">set up builds and deployments</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">3</div>
        <div class="text-sm">deploy site</div>
    </div>

    <div class="bg-white rounded-md p-20 min-h-max shadow-lg w-3/4" transition:fade="{{delay: 300, duration: 300}}">
        <div class="flex flex-col justify-center items-center space-x-5 space-y-5">
            <span class="text-2xl font-bold text-brown-800">Deploy a site from your account</span>
            <span class="text-center text-lg">Select a repository to connect as your project’s source code. New commits will trigger Cloudflare to automatically build and 
                deploy your changes.
            </span>
        </div>
        <div class="flex space-x-2 items-center mt-10">
            <img src="/github.svg" alt="github-logo" width="24">
            <span class="text-lg font-semibold">Github | </span>
            <span class= "text-md font-light"> more coming soon</span>
        </div>
        <div class="flex flex-col relative my-4">
            <div class="w-24 bg-brown-700 h-[4px] rounded-md absolute"></div>
            <div class="bg-gray-300 h-[1px] mt-0.5 ml-24"></div>
        </div>
        
        <div class=" space-y-1 mt-20">
            <div class="flex space-x-1 ml-2">
                <img src="/github.svg" alt="github-logo" width="20">
                <span class="text-md font-semibold text-brown-900"> Github account</span>
            </div>
            <div class="flex relative w-2/5">
                <input type="text" placeholder="guacamole" class="rounded-md w-full"/>
                <div class="absolute right-1 top-2">
                    <svg
                    class="w-4 h-4 lg:h-6 lg:w-6 mx-1 half:w-4 half:h-4 half:mx-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                        fill="currentColor"
                    />
                     </svg>
                </div>
            </div>
            <div class="flex space-x-1">
                <AddAccount/>
                <span class="text-brown-800 text-md">Add account</span>    
            </div>
        </div>
        <div class="flex flex-col mt-14 space-y-3">
            <span class="ml-2 text-md font-semibold">
                Select a repository
            </span>
            <input class="rounded-md w-1/2 h-11" placeholder="blog"/>
            <span class="text-md text-gray-700"> If your repository is not shown, configure repository access for OpenRegistry app on Github.</span>
        </div>
        <hr class="mt-20 border-1 border-gray-300"/>
        <div class="flex justify-between items-center mt-10">
            <span 
            on:click={() => goto("/apps/github/connect")}
            class="text-brown-800 underline underline-offset-4 text-lg cursor-pointer">Cancel</span>
            <button 
            on:click={() => goto("/apps/github/connect/setup")}
            class="rounded-md text-white bg-brown-700 px-6 py-3 mt-2 tracking-wide text-lg">Begin setup</button>
        </div>
    </div>
</div>