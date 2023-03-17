<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonSolid from '$lib/button-solid.svelte';
	import GihubIcon from '$lib/github.svelte';
	import { env } from '$env/dynamic/public';

	let toggleSteps = false;
	const handleToggleSteps = () => {
		toggleSteps = !toggleSteps;
	};

	const installGithubApp = () => {
		const installationUrl = env.PUBLIC_GITHUB_APP_PUBLIC_LINK + '/installations/new';
		window.open(installationUrl, '_self');
	};
</script>

<div class="flex flex-col items-center space-y-6 w-full min-w-min lg:min-w-max sm:my-10 lg:my-20">
	<div class="min-w-min bg-white p-6 lg:p-16 rounded-sm border border-primary-200 shadow-2xl ">
		<div class="w-full lg:max-w-max">
			<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
				<span class="text-2xl font-bold text-primary-600 text-center"
					>Automated builds with Github Integration</span
				>
				<span class="text-center text-sm lg:text-base text-slate-600"
					>With three simple steps, you can set up automated builds with OpenRegistry.
					<br /> With every consequtive trigger (push/commit), OpenRegistry will bundle a build for
					you.
					<!-- </span> -->
				</span>
			</div>
			<hr class="mx-0 my-10 lg:mx-10" />
			<div class="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10 py-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src="/connect-github.png" alt="upload-file-image" class="w-40 lg:w-80" />
				<div class="flex flex-col items-center lg:items-start space-y-3 lg:space-y-9">
					<span class="text-sm text-slate-600 lg:text-base text-center lg:text-start"
						>To deploy a site, first select it from your personal or team GitHub account.</span
					>

					<ButtonSolid styles="max-w-[208px]" on:click={installGithubApp}>
						<GihubIcon />
						Connect Github
					</ButtonSolid>
				</div>
			</div>
			<hr class="m-10 laptop:mx-0" />
			<div class="flex flex-col items-start space-y-8 pl-0 lg:pl-24 text-slate-600">
				<span class="text-left text-sm lg:text-base"
					><b class="text-primary-500">1. Select repository</b> <br />
					Select your site developed using any of the supported frameworks or no framework at all.
				</span>
				<span class="text-left text-sm lg:text-base"
					><b class="text-primary-500">2. Set up builds and deployments</b><br />
					Specify how OpenRegistry automatically builds and deploys your repository's commits.
				</span>
				<p class="text-left text-sm lg:text-base">
					<b class="text-primary-500">3. Deploy site</b><br />
					<span>
						Your site will be deployed to a free SSL-enabled hostname. Configure custom domains,
						restrict access,<br /> invite collaborators, and more.
					</span>
				</p>
			</div>
		</div>
	</div>
</div>
