<script lang="ts">
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	const handleSettingsTab = (opts: any) => {
		return opts.selected
			? `font-semibold border-0 border-l-2 bg-slate-200 border-primary-400 text-start text-slate-700`
			: `border-none text-start text-slate-700`;
	};
</script>

<TabGroup defaultIndex={2} class="grid grid-cols-4 gap-6 px-3 py-9">
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
						<span class="font-semibold text-lg text-red-700">Delete Project</span>
						<span class="text-sm"
							>Deleting this project will permanently delete the project from openregistry and our
							databases and you will not be able to recover it. Along with it will go the
							environment variables and Access Policies
						</span>
					</div>
					<ButtonOutlined styles="text-red-700 border-red-600">Delete Project</ButtonOutlined>
				</div>
			</div>
		</TabPanel>
		<TabPanel>Content 2</TabPanel>
		<TabPanel class="flex flex-col gap-9 text-slate-700">
			<div class="flex flex-col gap-2">
				<span class="text-primary-500 font-semibold text-lg">Production</span>
				<span class="text-sm">Define variables for production environment</span>
				<div class="border-2 border-slate-300 rounded">
					<div class="bg-slate-200 grid grid-cols-3 py-1 px-2">
						<span class="col-span-1 font-semibold">Variable name</span>
						<span class="col-span-2 font-semibold">Value</span>
					</div>
				</div>
			</div>
		</TabPanel>
	</TabPanels>
</TabGroup>
