<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade, slide, scale } from 'svelte/transition';
	import Button from '$lib/button.svelte';
	import ArrowR from '$lib/icons/arrow-right.svelte';
	import { navigating } from '$app/stores';
	import { pulseStore } from '../../../../components/pulse';
	import { onMount } from 'svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import Pulse from '../../../../components/pulse.svelte';
	import { error, redirect } from '@sveltejs/kit';

	/** @type {import('./$types').PageData} */
	export let data: PageData;

	onMount(() => {
		if (!data.authenticated) {
			goto('/auth/unauthorised');
		}
	});

	let toggleSteps = false;
	const handleToggleSteps = () => {
		toggleSteps = !toggleSteps;
	};

	const installGithubApp = () => {
		const uri = 'https://github.com/apps/test-app-or/installations/new';
		window.open(uri);
	};

	$: {
		pulseStore.setPulseState(!$navigating && !!data);
	}
</script>

<div class="flex flex-col min-h-[75vh] bg-cream-50 items-center space-y-6 p-10 pb-52 pt-32">
	<div class="min-w-max bg-white p-20 rounded-md w-3/4">
		<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
			<span class="text-2xl font-bold text-brown-800">Deploy a site from your account</span>
			<!-- <span class="text-center text-lg">Select a repository to connect as your project’s source code. New commits will trigger Cloudflare to automatically build and <br/>deploy your changes. -->
			<!-- </span> -->
		</div>
		<hr class="m-10" />
		<div class="flex justify-center items-center space-x-24 py-10">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="/git-connect.png" alt="upload-file-image" class="w-60" />
			<div class="flex flex-col space-y-9">
				<span class="text-lg"
					>To deploy a site, first select it from your personal or team <br />GitHub account.</span
				>
				<button
					on:click={installGithubApp}
					class="bg-brown-500 rounded-md w-3/6 h-12 flex space-x-2 justify-center items-center border-none"
				>
					<img class="" src="/github.svg" alt="github-logo" width="24" />
					<span class="text-lg font-semibold">Connect Github</span>
				</button>
			</div>
		</div>
		<hr class="m-10" />
		<div class="flex flex-col items-start space-y-8 pl-24">
			<span class="text-left text-lg"
				><b>1. Select repository</b> <br />
				Select your site developed using any of the supported frameworks or no framework at all.
			</span>
			<span class="text-left text-lg"
				><b>2. Set up builds and deployments</b><br />
				Specify how OpenRegistry automatically builds and deploys your repository's commits.
			</span>
			<span class="text-left text-lg"
				><b>3. Deploy site</b><br />
				<span>
					Your site will be deployed to a free SSL-enabled hostname. Configure custom domains,
					restrict access,<br /> invite collaborators, and more.
				</span>
			</span>
		</div>
	</div>
</div>
