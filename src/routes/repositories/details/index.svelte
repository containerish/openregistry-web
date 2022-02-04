<script>
import Card from "$lib/card.svelte";
import Globe from '$lib/icons/globe.svelte';

</script>

<div>
    <Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50 dark:bg-brown-900">
        <div class="flex w-full h-full max-w-[3000px]">
            <div class="flex space-x-10 w-full">
                <div>
                    <Globe styles="h-16 w-16" />
                </div>
                <div class="w-full">
                    <h1 class="text-4xl font-medium dark:text-gray-200">janedoe/openregistry</h1>
                    <div class="flex mt-3">
                        <span class="text-md dark:text-gray-200">by janedoe</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-col flex-initial w-80">
                    <h1 class="text-2xl font-medium dark:text-gray-200">Docker Commands</h1>
                    <span class="text-lg">to push a new image to this repository</span>
                    <span class="bg-gray-400 text-gray-900 px-8 py-2"> docker push cntr.sh/janedoe/openregistry:tagname</span>
                </div>
            </div>
        </div>
    </Card>
</div>
