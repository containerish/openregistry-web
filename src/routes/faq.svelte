<script>
    import Card from '$lib/card.svelte';
</script>

<svelte:head>
    <title>FAQ|Open Registry</title>
</svelte:head>

<Card styles="bg-cream-50">
    <div class="w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
        <div class=" bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-5 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How do I rename a OpenRegistry repository? </h1>
            <span class="text-lg text-black">
                Currently, you cannot rename an OpenRegistry repository once it's been created. You will need to create a new repository with the name of your choice,
                move all relevant tags to the new repository created, and delete the existing repository you wish to rename.
            </span>
        </div>

        <div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> Can a repository be transferred to a different account? </h1>
            <span class="text-lg text-black">
                Repositories can not be transferred to a different account.
                If you would like to transfer a repository to a different account, you will need to download any images
                You can then recreate the repository on the new account.
            </span>
        </div>

        <div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> I Signed in with Github, how can i docker login to pull/push images ? </h1>
            <span class="text-lg text-black">
              You can use a PAT(Personal Access Token) from Github for Docker CLI login. To create a PAT follow the github guide:
                <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">
                    Github Doc for PAT
                </a>
                and use the generated Personal Access Token as your password for docker login. <br/> The username will same as your github username
            </span>
            <div class="bg-black w-96 p-4 mt-4">
                <span class="text-gray-400 ">
                    johnedoe#linux: docker login openregistry.dev
                    username: johndoe <br/>
                    password: **PAT**
                </span>
            </div>
        </div>

        <div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How can I change my email address? </h1>
            <span class="text-lg text-black">
              Currently, this functionality is unavailable. However, we're working on integrating it into OpenRegistry with coming releases
            </span>
        </div>

        <div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> How can I change my OpenRegistry Password </h1>
            <span class="text-lg text-black">
              To change your OpenRegistry Password, go to Your Profile -> Settings -> enter the current password,
                new password and confirm the new password and there you have it!
                In case you forgot your OpenRegistry Password, please click on forgot password and you'll receive
                an email to reset the password
            </span>
        </div>

        <div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
            <h1 class="text-3xl font-semibold text-brown-900 mb-5"> A Humble Note </h1>
            <span class="text-lg text-black">
              OpenRegistry is a small team of 2 developers, as we work towards making it the best Container Registry
                please make sure to drop any bug reports or improvement advice in the section below as we'd love to hear from you!
            </span>
        </div>

        <Card>
            <div class="w-full -ml-10">
                <form method="post" action="mail:team@openregistry.dev?subject=subject&message=message">
                    <h3 class="mt-1 ml-2 text-2xl font-normal text-left text-brown-900 ">Need More Help?</h3>
                    <textarea class="block w-1/2 px-5 py-5 mt-2 text-gray-700 text-lg placeholder-gray-500 bg-white border
                    rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
                    type="text" placeholder="Write to us" aria-label="write to us"></textarea>

                    <button class="w-28 ml-1 px-6 py-2 mt-5 text-lg font-medium tracking-wide text-gray-100
                    transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2
                    hover:bg-brown-700 focus:outline-none focus:bg-brown-900 border-none">
                        Send
                    </button>
                </form>
            </div>

        </Card>
    </div>
</Card>
