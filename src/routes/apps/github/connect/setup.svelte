<script>
    import { Input } from "postcss";
import RightArrow from "../../../../lib/icons/arrow-right.svelte"
</script>


<div class="flex flex-col min-h-screen bg-cream-50 justify-center items-center space-y-6 p-10">
    <div class="flex static space-x-2 m-4">
        <!-- the progress bar comes here -->
        <div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">1</div>
        <div class="text-sm">select repository</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div class="rounded-full bg-brown-600 w-6 text-white shadow-lg flex justify-center">2</div>
        <div class="text-sm">set up builds and deployments</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">3</div>
        <div class="text-sm">deploy site</div>
    </div>
    <div class="min-w-max bg-white p-20 rounded-md w-4/5 shadow-lg">
        <div class="flex flex-col justify-center items-center space-x-5 space-y-5">
            <span class="text-lg font-bold text-brown-800">Set up builds and deployments</span>
            <div class="flex space-x-3 justify-center items-center">
                <span> Configure automatic builds and deployments for</span>
                <img class="mt-0.5" src="/github.svg" alt="github-logo" width="24"> 
                <!-- must replace this with a variable -->
                <span>guacamole/blog</span>
                <!-- must replace this with a variable -->
            </div> 
        </div>
        <div class="flex flex-col my-10 space-y-1">
            <span class="font-semibold text-brown-900"> Project name</span>
            <input type="text" placeholder="" class="rounded-md w-2/5"/>
            <span class="text-sm"> Your project will be deployed to akash network</span>
        </div>
        <div class="flex flex-col my-10 space-y-2">
            <span class="font-semibold text-brown-900"> Production branch</span>
            <div class="flex relative w-1/4">
                <input type="text" placeholder="main" class="rounded-md w-full"/>
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
            <span class="text-sm"> Pushes to this branch automatically trigger deployments to the Production environment. Pushes to all other </span>
            <span class="text-sm"> branches will trigger deployments within the Preview environment</span>
        </div>
        <hr class="my-16"/>
        <div class="flex flex-col space-y-1">
            <div class="flex space-x-2">
                <span class="text-lg font-semibold text-brown-900"> Build Settings</span>
                <div class="flex space-x-2 justify-center items-center rounded-full bg-purple-200 max-w-fit px-2 py-0.5 text-sm text-purple-900"> 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span class=" text-xs">Configuring build</span>
                </div>
            </div>
            <span>
                If your project uses a static site generator or build tool, set the build instructions for Cloudflare.
            </span>
            <div>
                <div class="flex flex-col my-10 space-y-1">
                    <span class="font-semibold text-brown-900"> Framework preset</span>
                    <div class="flex relative w-1/4">
                        <input type="text" placeholder="main" class="rounded-md w-full"/>
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
                    <span class="text-sm"> select a framework to prefill recommended settings </span>
                </div>

                <div class="flex flex-col my-10 space-y-1">
                    <div class="flex items-center space-x-1 w-2/5">
                        <span class="font-semibold text-brown-900"> Build command</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                    </div>
                    <input type="text" placeholder="" class="rounded-md w-2/5"/>
                    <span class="text-sm"> e.g. npm run build </span>
                </div>

                <div class="flex flex-col my-10 space-y-1">
                    <div class="flex items-center space-x-1 w-2/5">
                        <span class="font-semibold text-brown-900"> Build output directory</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                    </div>
                    <div class="flex space-x-1">
                        <span class="text-2xl text-brown-900 font-semibold">/</span>
                        <input type="text" placeholder="" class="rounded-md w-2/5"/>
                    </div>
                    <span class="text-sm"> e.g. dist </span>
                </div>
                <div class="flex flex-col space-y-8">
                    <div class="flex items-center space-x-1">
                        <RightArrow styles="text-blue-600"/>
                        <span class="text-blue-600 font-normal"> Root directory (advanced)</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <RightArrow styles="text-blue-600"/>
                        <span class="text-blue-600 font-normal"> Environment variables (advanced)</span>
                    </div>
                </div>
               

                <hr class="my-16"/>
            </div>
        </div>
        
    </div>

</div>