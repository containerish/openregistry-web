<script>
    import Card from '$lib/card.svelte';
</script>

<svelte:head>
    <title>FAQ|Open Registry</title>
</svelte:head>

<Card styles="bg-cream-50 dark:bg-brown-900">
    <div class="w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
        <div class="dark:bg-brown-700 bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-5 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How do I rename a OpenRegistry repository? </h1>
            <span class="text-lg text-black">
                Currently, you cannot rename an OpenRegistry repository once it's been created. You will need to create a new repository with the name of your choice,
                move all relevant tags to the new repository created, and delete the existing repository you wish to rename.
            </span>
        </div>

        <div class="dark:bg-brown-700 bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> Can a repository be transferred to a different account? </h1>
            <span class="text-lg text-black">
                Repositories can not be transferred to a different account.
                If you would like to transfer a repository to a different account, you will need to download any images
                You can then recreate the repository on the new account.
            </span>
        </div>

        <div class="dark:bg-brown-700 bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How can I reset my OpenRegistry password? </h1>
            <span class="text-lg text-black">
              You can reset your OpenRegistry password at .................
            </span>
        </div>

        <div class="dark:bg-brown-700 bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How can I change my email address? </h1>
            <span class="text-lg text-black">
              You can reset your OpenRegistry password at .................
            </span>
        </div>

        <Card>
            <div class="w-full -ml-10">
                <form method="post" action="mail:team@openregistry.dev?subject=subject&message=message">
                    <h3 class="mt-1 ml-2 text-2xl font-normal text-left text-brown-900 dark:text-gray-300">Need More Help?</h3>
                    <textarea class="block w-1/2 px-5 py-5 mt-2 text-gray-700 text-lg placeholder-gray-500 bg-white border
                    rounded-md dark:bg-brown-400 dark:border-gray-600 dark:placeholder-gray-400 focus:border-brown-100
                    dark:focus:border-brown-600 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
                    type="text" placeholder="Write to us" aria-label="write to us"></textarea>

                    <button class="w-32 px-6 py-3 mt-5 text-lg font-medium tracking-wide text-gray-100
                    transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2
                    hover:bg-brown-700 focus:outline-none focus:bg-brown-900 border-none">
                        Save
                    </button>
                </form>
            </div>

        </Card>
    </div>
</Card>
