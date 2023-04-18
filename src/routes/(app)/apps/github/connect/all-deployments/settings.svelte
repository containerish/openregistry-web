<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	const handleSettingsTab = (opts: any) => {
		return opts.selected
			? `font-semibold border-0 border-l-2 bg-slate-200 border-primary-400 text-start text-slate-700`
			: `border-none text-start text-slate-700`;
	};
</script>

<TabGroup defaultIndex={2} class="grid grid-cols-4 gap-9 px-3 py-9">
	<TabList class="col-span-1 flex flex-col w-full">
		<Tab class={handleSettingsTab}>General</Tab>
		<Tab class={handleSettingsTab}>Builds and Deployments</Tab>
		<Tab let:selected class={handleSettingsTab}>Environment Variables</Tab>
	</TabList>
	<TabPanels class="col-span-3">
		<TabPanel>
			<div class="flex flex-col gap-9 text-slate-700">
				<div class="flex flex-col gap-3">
					<div
						class="flex justify-between items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
					>
						<div class="flex flex-col gap-3">
							<span class="font-semibold text-primary-500 lg:text-lg">Build details</span>
							<span class="text-sm"><b>Project name:</b> openregistry-test</span>
							<span class="text-sm"><b>Date Created:</b> Thu, March 12, 2023</span>
						</div>
						<ButtonOutlined>Rename Project</ButtonOutlined>
					</div>
				</div>

				<div
					class="flex justify-between items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
				>
					<div class="flex flex-col gap-3">
						<div class="flex flex-col">
							<class class="font-semibold text-primary-500 text-lg">Members</class>
							<class class=" text-sm">Invite members to collaborate</class>
						</div>
						<span class="text-sm"
							>invite people to share the build project and collabotare with
						</span>
					</div>
					<ButtonOutlined>Manage Members</ButtonOutlined>
				</div>

				<div
					class="flex justify-between items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
				>
					<div class="flex flex-col gap-3">
						<div class="flex flex-col">
							<class class="font-semibold text-primary-500 text-lg">Access Policy</class>
							<class class=" text-sm">Control Access to your project's preview </class>
						</div>
						<span class="text-sm"
							>invite people to share the build project and collabotare with
						</span>
					</div>
					<ButtonOutlined>Manage Policies</ButtonOutlined>
				</div>

				<div
					class="flex justify-between items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
				>
					<div class="flex flex-col gap-3 max-w-lg">
						<span class="font-semibold text-lg text-rose-700">Delete Project</span>
						<span class="text-sm"
							>Deleting this project will permanently delete the project from openregistry and our
							databases and you will not be able to recover it. Along with it will go the
							environment variables and Access Policies
						</span>
					</div>
					<ButtonOutlined class="text-rose-700 border-rose-600">Delete Project</ButtonOutlined>
				</div>
			</div>
		</TabPanel>
		<TabPanel class="flex flex-col gap-9 text-slate-700">
			<div class="flex flex-col gap-9">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col">
						<span class="font-semibold text-lg text-primary-500">Branch Builds</span>
						<span class="text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>
					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9 
						bg-slate-50"
					>
						<div class="flex flex-col gap-6 items-start">
							<div class="rounded-full bg-emerald-200 text-emerald-800 text-xs px-2 py-1">
								Production branch
							</div>
							<span class="text-sm font-semibold">Production Branch:</span>
							<span class="text-sm font-semibold">Automatic Builds:</span>
						</div>
						<div class="grid grid-rows-3 gap-6">
							<span class=" row-start-2 text-sm">release-main</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-3 flex w-full self-start justify-end">
							<ButtonOutlined>Confirgure Production Builds</ButtonOutlined>
						</div>
					</div>

					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9 
					bg-slate-50"
					>
						<div class="flex flex-col gap-6 items-start">
							<div class="rounded-full bg-slate-200 text-slate-800 text-xs px-2 py-1">
								Preview branch
							</div>
							<span class="text-sm font-semibold">Branches Included:</span>
							<span class="text-sm font-semibold">Automatic Builds:</span>
						</div>
						<div class="col-span-2 grid grid-rows-3 gap-6">
							<span class=" row-start-2 text-sm">All non production branches</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-2 flex w-full self-start justify-end">
							<ButtonOutlined>Confirgure Preview Builds</ButtonOutlined>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col">
						<span class="font-semibold text-lg text-primary-500">Build Configuration</span>
						<span class=" text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>

					<div
						class="grid grid-cols-5 items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
					>
						<div class=" col-span-2 flex flex-col gap-6 items-start">
							<span class="text-sm font-semibold">Build command:</span>
							<span class="text-sm font-semibold">Build output Directory:</span>
							<span class="text-sm font-semibold">Root Directory:</span>
							<span class="text-sm font-semibold">Build command on Pull request:</span>
						</div>
						<div class="flex flex-col gap-6 items-start">
							<span class=" row-start-2 text-sm">pnpm run build</span>
							<span class="row-start-3 text-sm">/.sveltekit/openregistry</span>
							<span class="row-start-3 text-sm">/</span>
							<span class="row-start-3 text-sm">Enabled</span>
						</div>
						<div class="col-span-2 flex w-full self-start justify-end">
							<ButtonOutlined>Edit Configuration</ButtonOutlined>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col">
						<span class="font-semibold text-lg text-primary-500">Hooks</span>
						<span class="text-sm"
							>specify the brach that triggers the build for each environment</span
						>
					</div>

					<div
						class="flex justify-between items-center border-2 border-slate-300 rounded px-7 py-9 bg-slate-50"
					>
						<span class="text-sm"
							>Add a deploy hook by creating a name and selecting a desired branch</span
						>
						<ButtonOutlined>Add Hook</ButtonOutlined>
					</div>
				</div>
			</div>
		</TabPanel>
		<TabPanel class="flex flex-col gap-9 text-slate-700">
			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div class="flex flex-col gap-1">
						<span class="text-primary-500 font-semibold text-lg">Production</span>
						<span class="text-sm">Define variables for production environment</span>
					</div>
					<ButtonOutlined>Edit Variables</ButtonOutlined>
				</div>

				<div class="border-2 border-slate-300 rounded">
					<div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
						<span class="col-span-1 font-semibold">Variable name</span>
						<span class="col-span-2 font-semibold">Value</span>
					</div>
					<div class="bg-slate-50 min-h-[500px]" />
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div class="flex flex-col gap-1">
						<span class="text-primary-500 font-semibold text-lg">Preview</span>
						<span class="text-sm">Define variables for treview environment</span>
					</div>
					<ButtonOutlined>Edit Variables</ButtonOutlined>
				</div>

				<div class="border-2 border-slate-300 rounded">
					<div class="bg-slate-200 grid grid-cols-3 py-2 px-3">
						<span class="col-span-1 font-semibold">Variable name</span>
						<span class="col-span-2 font-semibold">Value</span>
					</div>
					<div class="bg-slate-50 min-h-[500px]" />
				</div>
			</div>
		</TabPanel>
	</TabPanels>
</TabGroup>
