<script lang="ts">
	import { fade } from 'svelte/transition';
	import { SettingsIcon, PlainCrossIcon, ArrowLeftIcon, ChevronRightIcon } from '$lib/icons';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import BuildTile from './build.svelte';
	import BuildCompact from './build-compact.svelte';
	import Settings from './settings.svelte';
	import IconButton from '$lib/icon-button.svelte';
	const handleTabSelect = (opts: any) => {
		return opts.selected
			? `font-semibold border-0 border-b-4 border-primary-400 text-lg text-slate-700`
			: `border-none selection:bg-primary-100 text-lg text-slate-700`;
	};

	let showFirstBuild = true;
	const toggleFirstBuild = () => {
		showFirstBuild = false;
	};
</script>

<svelte:head>
	<title>Builds | OpenRegistry</title>
</svelte:head>

<div class="w-full p-20">
	<TabGroup defaultIndex={1}>
		<TabList class="text-lg flex gap-9 ml-2 border-b-2 border-slate-300">
			<Tab let:selected class={handleTabSelect}>Builds</Tab>
			<Tab class={handleTabSelect}>Settings</Tab>
		</TabList>

		<div transition:fade={{ delay: 300, duration: 300 }}>
			<TabPanels>
				<TabPanel>
					{#if showFirstBuild}
						<div
							class="flex laptop:flex-col space-x-8 relative bg-white rounded-sm px-20 py-12 min-h-max border-2 
						border-primary-100 shadow-3xl mt-10"
						>
							<picture>
								<img src="/build.svg" alt="logo" class="apple:w-56 uw:w-56" width="200px" />
							</picture>
							<div class="flex flex-col gap-3 justify-center">
								<span class="text-lg lg:text-2xl font-semibold text-primary-500">
									Congratulations on your first Build!</span
								>
								<span
									class="text-lg desktop:text-base laptop:text-sm half:text-sm text-slate-600 ml-1"
								>
									you can now do more with your site. invite collaborators, protect previews, enable
									web analytics and more.</span
								>
								<button aria-label="explore button" class="border-0 bg-transparent w-44 rounded-lg">
									<div class="flex space-x-2">
										<SettingsIcon class="text-primary-400" />
										<span class="text-primary-400"> Explore Settings</span>
									</div>
								</button>
							</div>
							<IconButton
								on:click={toggleFirstBuild}
								class="absolute right-4 top-4 bg-transparent border-none w-4"
							>
								<PlainCrossIcon class="w-6 h-6 text-slate-600" />
							</IconButton>
						</div>
					{/if}
					<BuildTile />
					<div class="border border-primary-200 rounded flex flex-col">
						<div class="bg-slate-200 grid grid-cols-7 justify-between px-3 py-1 text-slate-800">
							<span>Environment</span>
							<span class=" col-span-2">Source</span>
							<span class=" col-span-2">Deployment</span>
							<span class=" col-span-2">Status</span>
						</div>
						<div>
							{#each new Array(10) as item}
								<BuildCompact />
								<hr />
							{/each}
						</div>

						<div class="bg-white py-2 flex gap-2 px-3 items-center justify-start">
							<IconButton class="w-3">
								<ArrowLeftIcon class="h-6 w-6 text-slate-500" />
							</IconButton>
							<IconButton class="w-3">
								<ChevronRightIcon class="h-6 w-6 text-slate-600" />
							</IconButton>
							<span class="text-sm text-slate-500">1 to 10 of 100 builds</span>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<Settings />
				</TabPanel>
			</TabPanels>
		</div>
	</TabGroup>
</div>
