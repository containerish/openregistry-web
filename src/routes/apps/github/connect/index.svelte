<script>
    import Button from "$lib/button.svelte"
    import ArrowR from "$lib/icons/arrow-right.svelte"
    let toggleSteps = false
    const handleToggleSteps = () => { 
        toggleSteps = !toggleSteps
    }

    const installGithubApp = () => {
        const uri = "https://github.com/apps/demo-github-app-guacamole/installations/new"
        window.open(uri)
    }


</script>


<div class="flex flex-col min-h-screen bg-cream-50 justify-center items-center space-y-6 p-10">
    <div class="flex static space-x-2 m-4">
        <!-- the progress bar comes here -->
        <div class="rounded-full bg-brown-600 w-6 text-white shadow-lg flex justify-center">1</div>
        <div class="text-sm">select repository</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">2</div>
        <div class="text-sm">set up builds and deployments</div>
        <div class="w-12 border-t-2 border-brown-500 mt-2"></div>
        <div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">3</div>
        <div class="text-sm">deploy site</div>
        
    </div>
    <div class="min-w-max bg-white p-20 rounded-md">
        <div class="flex flex-col justify-center items-center space-x-5 space-y-5">
            <span class="text-lg font-bold text-brown-800">Deploy a site from your account</span>
            <span class="text-center">Select a repository to connect as your project’s source code. New commits will trigger Cloudflare to automatically build and <br/>deploy your changes.
            </span>
        </div>
        <hr class="m-10"/>
        <div class="flex justify-center items-center space-x-24 py-10">
            <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src="/git-connect.png" alt="upload-file-image" class="w-60"/>
        <div class="flex flex-col space-y-9">
            <span>To deploy a site, first select it from your personal or team <br/>GitHub account.</span>
            <button
            on:click= {installGithubApp}
            class="bg-brown-500 rounded-md w-40 h-10 flex space-x-2"
            >
                <img class="mt-0.5" src="/github.svg" alt="github-logo" width="24"> 
                <span class="">Connect Github</span>
            </button>
        </div> 
        </div>
        <hr class="m-10"/>
        <div class="flex flex-col justify-center items-center space-y-8">
            <span class="text-left w-96"><b>1. Select repository</b> <br/> 
                Select your site developed using any of the supported frameworks or no framework at all.
            </span>
            <span class="text-left w-96"><b>2. Set up builds and deployments</b><br/>
                Specify how OpenRegistry automatically builds and deploys your <br/>
                repository's commits.
            </span>
            <span class="text-left w-96"><b>3. Deploy site</b><br/>
                Your site will be deployed to a free SSL-enabled hostname. Configure<br/>
                 custom domains, restrict access, invite collaborators, and more.
            </span>
            
        </div>
    </div>
</div>
