<script>
    import Card from '$lib/card.svelte';

</script>

<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50">
    <div class="animate-pulse grid grid-cols-3 rounded-md p-4 w-full mx-auto min-h-[80vh] gap-5 ">
        <div class="rounded-lg col-span-1 min-h-full flex justify-center items-center">
            <div class="flex-1 space-y-10 p-10">
                <div class="h-5 w-3/5 bg-brown-400 rounded"></div>
                <div class="h-4 bg-brown-400 rounded"></div>
                <div class="space-y-10">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-4 bg-brown-400 rounded col-span-2"></div>
                        <div class="h-4 bg-brown-400 rounded col-span-1"></div>
                    </div>
                    <div class="h-4 bg-brown-400 rounded"></div>
                </div>
                <div class="h-4 bg-brown-400 rounded"></div>
                <div class="space-y-10">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-4 bg-brown-400 rounded col-span-2"></div>
                    </div>
                    <div class="h-4 bg-brown-400 rounded"></div>
                </div>
                <div class="h-4 bg-brown-400 rounded"></div>
                <div class="space-y-10">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-4 bg-brown-400 rounded col-span-2"></div>

                    </div>
                    <div class="h-4 bg-brown-400 rounded"></div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-4 bg-brown-400 rounded col-span-2"></div>
                        <div class="h-4 bg-brown-400 rounded col-span-1"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-4 bg-brown-400 rounded col-span-2"></div>
                        <div class="h-4 bg-brown-400 rounded col-span-1"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="flex flex-col gap-14 rounded-lg col-span-2 min-h-full p-8 justify-center">
            <div class="h-10 w-32 bg-brown-400 rounded-lg"></div>
            <div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl"></div>
            <div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl"></div>
            <div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl"></div>
        </div>

    </div>
</Card>
