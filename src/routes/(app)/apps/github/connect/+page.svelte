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
		goto(installationUrl);
	};
</script>

<div
	class="flex flex-col min-h-[75vh] desktop:min-h-max laptop:min-h-max half:min-h-max bg-slate-100 items-center space-y-6 p-10 
	pb-52 pt-32 desktop:pt-10 w-full laptop:min-w-max laptop:p-4 half:p-0 half:min-w-max"
>
	<div
		class="min-w-max bg-white p-20 rounded-sm border border-primary-200 shadow-2xl w-3/4 laptop:p-4 half:p-2"
	>
		<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
			<span class="text-2xl font-bold text-primary-600 laptop:text-xl half:text-xl"
				>Automated builds with Github Integration</span
			>
			<span class="text-center text-lg desktop:text-sm laptop:text-sm half:text-xs text-slate-600"
				>With three simple steps, you can set up automated builds with OpenRegistry.
				<br /> With every consequtive trigger (push/commit), OpenRegistry will bundle a build for
				you.
				<!-- </span> -->
			</span>
		</div>
		<hr class="m-10 laptop:mx-0 half:mx-0" />
		<div
			class="flex justify-center laptop:justify-start items-center space-x-24 desktop:space-x-20 
			laptop:space-x-0 half:space-x-0 py-10 desktop:py-5 gap-2"
		>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="/connect-github.png" alt="upload-file-image" class="w-80 laptop:w-40 half:w-40" />
			<div class="flex flex-col space-y-9 half:space-y-2">
				<span class="text-lg text-slate-600 desktop:text-base laptop:text-base half:text-xs"
					>To deploy a site, first select it from your personal or team <br />GitHub account.</span
				>
				<div class="w-full">
					<ButtonSolid on:click={installGithubApp}>
						<GihubIcon />
						Connect Github
					</ButtonSolid>
				</div>
			</div>
		</div>
		<hr class="m-10 laptop:mx-0" />
		<div class="flex flex-col items-start space-y-8 pl-24 laptop:p-0 text-slate-600">
			<span class="text-left text-lg desktop:text-base laptop:text-sm half:text-sm"
				><b class="text-primary-500">1. Select repository</b> <br />
				Select your site developed using any of the supported frameworks or no framework at all.
			</span>
			<span class="text-left text-lg desktop:text-base laptop:text-sm half:text-sm"
				><b class="text-primary-500">2. Set up builds and deployments</b><br />
				Specify how OpenRegistry automatically builds and deploys your repository's commits.
			</span>
			<p class="text-left text-lg desktop:text-base laptop:text-sm half:text-sm">
				<b class="text-primary-500">3. Deploy site</b><br />
				<span>
					Your site will be deployed to a free SSL-enabled hostname. Configure custom domains,
					restrict access,<br /> invite collaborators, and more.
				</span>
			</p>
		</div>
	</div>
</div>
