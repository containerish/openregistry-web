<script>
	import { ghStore } from '$lib/stores';
	import ListBox from '$lib/listBox.svelte';
	import Disclosure from '$lib/disclosure.svelte';
	import Textfield from '$lib/textfield.svelte';
	import Input from '$lib/input.svelte';
	import { ArrowLeftIcon, InfoIcon, BookIcon, AddAccountIcon } from '$lib/icons';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	export let handleNext;
</script>

<div class="w-full">
	<div class="flex flex-col justify-center items-center gap-3">
		<span class="text-2xl font-bold text-primary-600">Set up builds and deployments</span>
		<div class="flex justify-center items-center gap-3">
			<span class="text-sm lg:text-base text-center text-slate-600">
				Configure automatic builds and deployments for</span
			>
			<div class="flex gap-1 items-center">
				<img class="mt-0.5" src="/github.svg" alt="github-logo" width="24" />
				<a
					class="text-primary-500"
					target="_blank"
					rel="noreferrer"
					href="https://github.com/{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository
						.name}"
				>
					<u>
						{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}
					</u>
				</a>
			</div>
		</div>
	</div>
	<hr class="mt-9" />

	<div class="flex flex-col justify-center my-10 gap-3">
		<span class="font-semibold text-primary-600 text-base lg:text-lg">Project name</span>
		<div class="w-full max-w-[420px]">
			<Textfield />
		</div>
		<span class="text-sm text-slate-700 antialiased">
			Your project will be deployed to akash network</span
		>
	</div>
	<div class="flex flex-col my-10 gap-3">
		<ListBox
			items={$ghStore.selectedRepository.branches.map((b, i) => ({
				name: b.name,
				id: i,
				handler: () => {
					ghStore.setActiveBranch(b.name);
				},
				disabled: false
			}))}
		/>
		<span class="text-sm text-slate-700 antialiased">
			Pushes to this branch automatically trigger deployments to the Production environment. Pushes
			branches will trigger deployments within the Preview environment to all other
		</span>
	</div>
	<hr class="my-9" />
	<div class="flex flex-col gap-3">
		<div class="flex gap-3">
			<span class="text-base text-primary-600 lg:text-lg font-semibold"> Build Settings</span>
			<div
				class="flex space-x-2 justify-center items-center rounded-sm bg-emerald-200 max-w-fit px-2 pr-3 py-0.5 
				text-sm text-emerald-800"
			>
				<BookIcon />
				<span class="text-xs">Configuring build</span>
			</div>
		</div>
		<span class="text-sm text-slate-700 antialiased">
			If your project uses a different tool than Docker (like nerdctl), then please set the build
			instructions for OpenRegistry
		</span>
		<div class="flex flex-col">
			<div class="flex flex-col my-6 gap-1 text-sm">
				<ListBox
					items={[
						{ name: 'Docker', id: 0, disabled: false },
						{ name: 'NerdCtl', disabled: false, id: 1 }
					]}
				/>
				<span class="text-slate-700 text-sm antialiased">
					select a framework to prefill recommended settings
				</span>
			</div>

			<div class="flex flex-col my-9 gap-3">
				<div class="flex items-center gap-1 w-2/5 text-primary-500">
					<span class="font-medium"> Build command</span>
					<InfoIcon />
				</div>
				<div class="w-full max-w-[420px]">
					<Textfield type="search" />
				</div>
				<span class="text-slate-600 text-sm antialiased">
					e.g. docker build -f Dockerfile -t openregistry.dev/test-user/myapp:latest .
				</span>
			</div>

			<div class="flex flex-col gap-6">
				<div class="flex items-center justify-start gap-1">
					<Disclosure title="Dockerfile directory (advanced)">
						<Textfield styles=" ml-10" type="search" />
					</Disclosure>
				</div>
				<div class="flex items-center justify-center w-full gap-1">
					<Disclosure title="Environment variables (advanced)">
						<div class="grid grid-flow-col gap-4 place-items-center grid-cols-2 w-full">
							<div class="w-3/4">
								<Textfield placeholder="key" type="search" />
							</div>
							<div class="w-3/4">
								<Textfield placeholder="value" type="search" />
							</div>
						</div>
						<ButtonOutlined styles="ml-10 mt-5 px-2 py-1 text-sm">
							<AddAccountIcon styles="text-primary-300" />
							<span>add more</span>
						</ButtonOutlined>
					</Disclosure>
				</div>
			</div>

			<hr class="my-9" />

			<div class="flex justify-between items-center mt-10">
				<div
					on:click={() => handleNext(0)}
					on:keypress={() => handleNext(0)}
					class="flex gap-1 cursor-pointer"
				>
					<ArrowLeftIcon styles="text-slate-700" />
					<span class="text-slate-700 text-base lg:text-lg">Change repository</span>
				</div>

				<ButtonSolid on:click={() => handleNext(2)}>Save and Deploy</ButtonSolid>
			</div>
		</div>
	</div>
</div>
