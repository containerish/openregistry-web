<script>
	import { ghStore } from '$lib/stores';
	import ListBox from '$lib/listBox.svelte';
	import Disclosure from '$lib/disclosure.svelte';
	import Textfield from '$lib/textfield.svelte';
	import Input from '$lib/input.svelte';
	import { ArrowLeftIcon, InfoIcon, BookIcon, AddAccountIcon } from '$lib/icons';
	import ButtonSolid from '$lib/button-solid.svelte';

	export let handleNext;

	$: {
		console.log('branches in setup: ', $ghStore.selectedRepository);
	}
</script>

<div>
	<div class="flex flex-col justify-center items-center space-x-5 space-y-5">
		<span class="text-2xl font-bold text-brown-800">Set up builds and deployments</span>
		<div class="flex space-x-3 justify-center items-center">
			<span class="text-base desktop:text-base apple:text-lg uw:text-lg">
				Configure automatic builds and deployments for</span
			>
			<img class="mt-0.5" src="/github.svg" alt="github-logo" width="24" />
			<a
				target="_blank"
				href="https://github.com/{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository
					.name}"
			>
				<u>
					{$ghStore.githubUsername}/{$ghStore.selectedRepository.repository.name}
				</u>
			</a>
		</div>
	</div>
	<div class="min-w-[70vw] desktop:min-w-[62vw] uw:min-w-[40vw]" />
	<div class="flex flex-col my-10 space-y-2">
		<span class="font-semibold text-brown-900 text-base desktop:text-base apple:text-lg uw:text-lg"
			>Project name</span
		>
		<div class="w-2/5">
			<Textfield />
		</div>
		<span class="text-sm desktop:text-sm apple:text-base uw:text-base">
			Your project will be deployed to akash network</span
		>
	</div>
	<div class="flex flex-col my-10 space-y-2">
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
		<span class="text-sm desktop:text-sm apple:text-base uw:text-base">
			Pushes to this branch automatically trigger deployments to the Production environment. Pushes
			to all other
		</span>
		<span class="text-sm desktop:text-sm apple:text-base uw:text-base">
			branches will trigger deployments within the Preview environment</span
		>
	</div>
	<hr class="my-16" />
	<div class="flex flex-col space-y-1">
		<div class="flex space-x-2">
			<span
				class="text-base desktop:text-base apple:text-lg uw:text-lg font-semibold text-brown-900"
			>
				Build Settings</span
			>
			<div
				class="flex space-x-2 justify-center items-center rounded-full bg-purple-200 max-w-fit px-2 pr-3 py-0.5 
				text-sm text-purple-900"
			>
				<BookIcon />
				<span class="text-xs">Configuring build</span>
			</div>
		</div>
		<span class="text-sm desktop:text-sm apple:text-base uw:text-base">
			If your project uses a different tool than Docker (like nerdctl), then please set the build
			instructions for OpenRegistry
		</span>
		<div>
			<div class="flex flex-col my-10 space-y-1 text-sm apple:text-base uw:text-base">
				<ListBox
					items={[
						{ name: 'Docker', id: 0, disabled: false },
						{ name: 'NerdCtl', disabled: false, id: 1 }
					]}
				/>
				<span class="text-md"> select a framework to prefill recommended settings </span>
			</div>

			<div class="flex flex-col my-10 space-y-1">
				<div class="flex items-center space-x-1 w-2/5">
					<span
						class="font-normal desktop:font-medium apple:font-semibold uw:font-semibold text-brown-900"
					>
						Build command</span
					>
					<InfoIcon />
				</div>
				<div class="w-2/5">
					<Textfield />
				</div>
				<span class="text-md">
					e.g. <code>docker build -f Dockerfile -t openregistry.dev/test-user/myapp:latest .</code>
				</span>
			</div>

			<div class="flex flex-col space-y-8">
				<div class="flex items-center space-x-1">
					<Disclosure title="Dockerfile directory (advanced)">
						<Textfield />
					</Disclosure>
				</div>
				<div class="flex items-center justify-center w-full space-x-1">
					<Disclosure title="Environment variables (advanced)">
						<div class="grid grid-flow-col gap-4 place-items-center grid-cols-2 w-full">
							<div class="w-3/4">
								<Input placeholder="Key" value="" />
							</div>
							<div class="w-3/4">
								<Input placeholder="Value" value="" />
							</div>
						</div>
						<button
							class="flex gap-2 border-none py-2 px-3 place-items-center rounded-md bg-cream-50 mt-20"
						>
							<AddAccountIcon styles="text-brown-800" />
							Add More
						</button>
					</Disclosure>
				</div>
			</div>

			<hr class="my-16" />

			<div class="flex justify-between items-center mt-10">
				<div on:click={() => handleNext(0)} class="flex space-x-1 cursor-pointer">
					<ArrowLeftIcon />
					<span class="text-brown-800 text-base desktop:text-base apple:text-lg uw:text-lg"
						>Change repository</span
					>
				</div>

				<ButtonSolid onClick={() => handleNext(2)}>Save and Deploy</ButtonSolid>
			</div>
		</div>
	</div>
</div>
