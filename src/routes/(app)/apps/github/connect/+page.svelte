<script lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import GihubIcon from '$lib/github.svelte';
	import { env } from '$env/dynamic/public';
	import { fly } from 'svelte/transition';

	const installGithubApp = () => {
		const installationUrl = env.PUBLIC_GITHUB_APP_PUBLIC_LINK + '/installations/new';
		window.open(installationUrl, '_self');
	};
</script>

<svelte:head>
	<title>Github Integration | OpenRegistry</title>
</svelte:head>

<div class="flex flex-col items-center w-full min-w-min my-20" in:fly={{ y: 200, duration: 300 }}>
	<div class="bg-slate-50/50 rounded-sm border border-primary-100/50 shadow-2xl p-9 lg:px-20 lg:py-16">
		<div class="w-full max-w-xl lg:max-w-4xl">
			<div class="flex flex-col justify-center items-center gap-3">
				<span class="text-2xl font-bold text-primary-600 text-center"
					>Automated builds with Github Integration</span
				>
				<span class="text-center text-sm text-slate-700 antialiased"
					>With three simple steps, you can set up automated builds with OpenRegistry.
					<br /> With every consequtive trigger (push/commit), OpenRegistry will bundle a build for you.
				</span>
			</div>
			<hr class="mx-0 my-10 lg:mx-10" />
			<div class="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<div in:fly={{ x: -100, duration: 400, delay: 300 }}>
					<img src="/catainer/catainer-hi.png" alt="upload-file-image" class="w-40" />
				</div>
				<div class="flex flex-col items-center lg:items-start gap-6">
					<span class="text-slate-700 text-center lg:text-start antialiased max-w-lg"
						>Hi, I'm Catainer! <br /> I will help you with your first ever build. <br />
						To deploy a site, first select it from your personal or team GitHub account
					</span>
					<ButtonSolid class="max-w-[208px]" on:click={installGithubApp}>
						<GihubIcon />
						Connect Github
					</ButtonSolid>
				</div>
			</div>
			<hr class="my-6 border-b border-primary-50" />
			<div class="flex flex-col justify-center gap-6 text-slate-600">
				<div class="flex flex-col w-full gap-1">
					<span class="text-primary-500 font-semibold"> 1. Select repository </span>
					<span class="text-sm">
						Select your site developed using any of the supported frameworks or no framework at all.
					</span>
				</div>
				<div class="flex flex-col w-full gap-1">
					<span class="text-primary-500 font-semibold"> 2. Set up builds </span>
					<span class="text-sm">
						Specify how OpenRegistry automatically builds and deploys your repository's commits.
					</span>
				</div>
				<div class="flex flex-col w-full gap-1">
					<span class="text-primary-500 font-semibold"> 3. Deploy site </span>
					<span class="text-sm">
						Your site will be deployed to a free SSL-enabled hostname. Configure custom domains, restrict
						access, invite collaborators, and more.
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
