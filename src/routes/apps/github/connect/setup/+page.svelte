<script>
	import { goto } from '$app/navigation';
	import { fade, draw, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import RightArrow from '$lib/icons/arrow-right.svelte';
	import ArrowLeft from '$lib/icons/arrow-l.svelte';
	import ArrowDown from '$lib/icons/arrow-down.svelte';
	import Input from '$lib/textfield.svelte';
	import Info from '$lib/icons/info.svelte';
	import Book from '$lib/icons/book.svelte';
	import { page } from '$app/stores';

	const selectedRepo = $page.url.searchParams.get('selected_repo');
	const githubUsername = $page.url.searchParams.get('github_username');
</script>

<div class="flex flex-col min-h-[75vh] bg-cream-50 items-center space-y-6 px-10 pb-52 pt-20">
	<div class="flex static space-x-2 mx-4 mb-10">
		<div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">1</div>
		<div class="text-sm">select repository</div>
		<div class="w-12 border-t-2 border-brown-500 mt-2" />
		<div
			class="rounded-full bg-brown-600 w-6 text-white shadow-lg flex justify-center cursor-pointer"
		>
			2
		</div>
		<div class="text-sm">set up builds and deployments</div>
		<div class="w-12 border-t-2 border-brown-500 mt-2" />
		<div class="rounded-full bg-white w-6 text-brown-900 shadow-lg flex justify-center">3</div>
		<div class="text-sm">deploy site</div>
	</div>
	<div
		class="min-h-max bg-white p-20 rounded-md shadow-lg w-3/4"
		transition:fade={{ delay: 300, duration: 300 }}
	>
		<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
			<span class="text-2xl font-bold text-brown-800">Set up builds and deployments</span>
			<div class="flex space-x-3 justify-center items-center">
				<span class="text-lg"> Configure automatic builds and deployments for</span>
				<img class="mt-0.5" src="/github.svg" alt="github-logo" width="24" />
				<!-- must replace this with a variable -->
				<a target="_blank" href="https://github.com/{githubUsername}/{selectedRepo}">
					<u>
						{githubUsername}/{selectedRepo}
					</u>
				</a>
				<!-- must replace this with a variable -->
			</div>
		</div>
		<div class="flex flex-col my-10 space-y-1">
			<span class="font-semibold text-brown-900 text-lg">Project name</span>
			<div class="w-2/5">
				<Input />
			</div>
			<span class="text-md"> Your project will be deployed to akash network</span>
		</div>
		<div class="flex flex-col my-10 space-y-2">
			<span class="font-semibold text-brown-900"> Production branch</span>
			<div class="flex relative w-1/4">
				<div class="w-full">
					<Input placeholder="main" />
				</div>
				<div class="absolute right-1 top-2">
					<ArrowDown />
				</div>
			</div>
			<span class="text-md">
				Pushes to this branch automatically trigger deployments to the Production environment.
				Pushes to all other
			</span>
			<span class="text-md"> branches will trigger deployments within the Preview environment</span>
		</div>
		<hr class="my-16" />
		<div class="flex flex-col space-y-1">
			<div class="flex space-x-2">
				<span class="text-lg font-semibold text-brown-900"> Build Settings</span>
				<div
					class="flex space-x-2 justify-center items-center rounded-full bg-purple-200 max-w-fit px-2 pr-3 py-0.5 text-sm text-purple-900"
				>
					<Book />
					<span class="text-xs">Configuring build</span>
				</div>
			</div>
			<span class="text-md">
				If your project uses a static site generator or build tool, set the build instructions for
				Cloudflare.
			</span>
			<div>
				<div class="flex flex-col my-10 space-y-1">
					<span class=" text-brown-900 font-semibold"> Framework preset</span>
					<div class="flex relative w-1/4">
						<div class="w-full">
							<Input placeholder="main" />
						</div>
						<div class="absolute right-1 top-2">
							<ArrowDown />
						</div>
					</div>
					<span class="text-md"> select a framework to prefill recommended settings </span>
				</div>

				<div class="flex flex-col my-10 space-y-1">
					<div class="flex items-center space-x-1 w-2/5">
						<span class="font-semibold text-brown-900"> Build command</span>
						<Info />
					</div>
					<div class="w-2/5">
						<Input />
					</div>
					<span class="text-md"> e.g. npm run build </span>
				</div>

				<div class="flex flex-col my-10 space-y-1">
					<div class="flex items-center space-x-1 w-2/5">
						<span class="font-semibold text-brown-900"> Build output directory</span>
						<Info />
					</div>
					<div class="flex space-x-1">
						<span class="text-2xl text-brown-900 font-semibold">/</span>
						<div class="w-2/5">
							<Input />
						</div>
					</div>
					<span class="text-md"> e.g. dist </span>
				</div>
				<div class="flex flex-col space-y-8">
					<div class="flex items-center space-x-1">
						<RightArrow styles="text-blue-600" />
						<span class="text-blue-600 font-normal"> Root directory (advanced)</span>
					</div>
					<div class="flex items-center space-x-1">
						<RightArrow styles="text-blue-600" />
						<span class="text-blue-600 font-normal"> Environment variables (advanced)</span>
					</div>
				</div>

				<hr class="my-16" />

				<div class="flex justify-between items-center mt-10">
					<div
						on:click={() => goto('/apps/github/connect/select-repo')}
						class="flex space-x-1 cursor-pointer"
					>
						<ArrowLeft />
						<span class="text-brown-800 text-lg"> Change repository</span>
					</div>

					<button
						on:click={() => goto('/apps/github/connect/deploy')}
						class="rounded-md text-white bg-brown-700 px-6 py-3 mt-2 tracking-wide text-lg"
					>
						Save and Deploy</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
