<script lang="ts">
	import { fade, slide, scale } from 'svelte/transition';
	import { SettingsIcon, PlainCrossIcon, ExternalLinkIcon, RecycleIcon } from '$lib/icons';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';

	const handleTabSelect = (opts: any) => {
		return opts.selected
			? `font-semibold border-0 border-b-4 border-primary-400 text-lg text-slate-700`
			: `border-none selection:bg-primary-100 text-lg text-slate-700`;
	};
</script>

<div class="bg-white w-full p-20">
	<TabGroup>
		<TabList class="text-lg flex gap-9 ml-2">
			<Tab class={handleTabSelect}>Builds</Tab>
			<Tab class={handleTabSelect}>Settings</Tab>
			
		</TabList>

		<div class="" transition:fade={{ delay: 300, duration: 300 }}>
			<TabPanels>
				<TabPanel>
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
								web analytics <br /> and more.</span
							>
							<button class="border-0 bg-transparent w-44 rounded-lg">
								<div class="flex space-x-2">
									<SettingsIcon styles="text-primary-400" />
									<span class="text-primary-400"> Explore Settings</span>
								</div>
							</button>
						</div>
						<button class="absolute right-4 top-4 bg-transparent border-none">
							<PlainCrossIcon styles="w-6 h-6 text-slate-600" />
						</button>
					</div>
					<div
						class="flex flex-col bg-white rounded-sm px-12 py-12 min-h-max border-2 border-primary-100 mt-10 
						border-l-4 border-l-green-600 border-opacity-100 shadow-2xl"
					>
						<div class="flex justify-between">
							<span class="text-xl laptop:text-lg half:text-lg font-semibold">Production</span>
							<button class="flex space-x-1 bg-transparent border-0">
								<span
									class="underline underline-offset-4 text-lg desktop:text-base laptop:text-base half:text-sm text-slate-600"
									>visit site</span
								>
								<ExternalLinkIcon styles="h-4 w-4 text-slate-700" />
							</button>
						</div>
						<div class="flex space-x-2">
							<RecycleIcon styles="w-5 h-5 text-slate-700" />
							<span class="tracking-wide text-lg laptop:text-base half:text-base">
								Automatic deployments enabled</span
							>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div />
				</TabPanel>
			</TabPanels>
		</div></TabGroup>
</div>
