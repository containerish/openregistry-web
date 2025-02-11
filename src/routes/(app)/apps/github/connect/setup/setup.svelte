<script lang="ts">
	import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';
	import { ghStore } from '$lib/stores';
	import Disclosure from '$lib/disclosure.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { ArrowLeftIcon, AddAccountIcon, SettingsIcon, ToolsIcon } from '$lib/icons';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from '$lib/components/select.svelte';
	import type { SelectOptions } from '$lib/client/selectTypes';
	import type { Writable } from 'svelte/store';
	import type { SelectOption } from '@melt-ui/svelte';
	import type { OpenRegistryClient } from '$lib/client';
	import type { Client } from '@connectrpc/connect';
	import { GitHubActionsProjectService } from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
	import {
		ProjectBuildSettingsMessageSchema,
		type CreateProjectRequest,
	} from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
	import { create } from '@bufbuild/protobuf';

	export let handleNext: (index: number) => void;
	export let store: Writable<CreateProjectRequest>;
	export let openRegistryClient: OpenRegistryClient;

	export let projectsClient: Client<typeof GitHubActionsProjectService>;

	let dockerContextPath = '.';
	const getBuildCommand = (buildTool: string, dockerFilePath: string) => {
		const selectedRepository = $ghStore.selectedRepository!;
		let buildTag = ''; // by default latest
		if ($store.productionBranch) {
			buildTag = `:${$store.productionBranch}`;
		}

		const openRegistryURI = `${PUBLIC_OPEN_REGISTRY_BACKEND_URL}/${selectedRepository.repository.full_name}${buildTag}`;
		switch (buildTool) {
			case 'Docker':
				return `docker build -t ${openRegistryURI} -f ${dockerFilePath} ${dockerContextPath}`;
			case 'NerdCtl':
				return `nerdctl build -t ${openRegistryURI} -f ${dockerFilePath} ${dockerContextPath}`;
			default:
				return `docker build -t ${openRegistryURI} -f ${dockerFilePath} ${dockerContextPath}`;
		}
	};

	let isLoading = false;
	const handleSaveAndBuild = async () => {
		isLoading = true;
		const selectedRepository = $ghStore.selectedRepository;
		if (!selectedRepository) {
			alert('Please select a repository first');
			return;
		}
		try {
			await storeBuildProject();
			const err = await createPullRequest(selectedRepository.repository.name ?? '');
			if (!err) {
				isLoading = false;
				handleNext(2);
				return;
			}

			console.log('error creating pull request: ', err);
		} catch (err) {
			console.log('error storing build project: ', err);
		}
	};

	const dispatch = createEventDispatcher();

	type APIError = {
		error: string;
		message: string;
	};

	const createPullRequest = async (repositoryName: string): Promise<APIError | undefined> => {
		const response = await openRegistryClient.createPullRequest({
			dockerfile_path: $store.buildSettings?.worfklowFile ?? '',
			repository_name: repositoryName,
		});

		// success scenarios are two:
		// 1. 202 - setup is already done
		// 2. 201 - PR is created
		if (response.success) {
			if (response.data.status === 202) {
				dispatch('gha_pull_request', {
					pullRequestExists: true,
				});
				return;
			}
			dispatch('gha_pull_request', {
				pullRequestExists: false,
			});
			return;
		}

		dispatch('gha_pull_request_error', {
			error: response.error,
		});
	};

	onMount(() => {
		$store.buildSettings = create(ProjectBuildSettingsMessageSchema, {
			execCommand: getBuildCommand('Docker', './Dockerfile'),
		});

		$store.productionBranch = $ghStore.selectedRepository?.repository.default_branch ?? '';
	});

	const getRepositoryURL = () => {
		const username = $ghStore.githubUsername;
		const selectedRepoName = $ghStore.selectedRepository?.repository.name;
		return `https://github.com/${username}/${selectedRepoName}`;
	};

	const storeBuildProject = async () => {
		try {
			await projectsClient.createProject($store);
		} catch (err) {
			console.log('error storing prject info: ', err);
		}
	};

	const readDockerfilePath = (e: Event) => {
		const target = e.target as HTMLInputElement;

		$store.buildSettings!.worfklowFile = target.value;
		$store.buildSettings!.execCommand = getBuildCommand($store.buildSettings!.buildTool, target.value);
	};

	const branchSelectionOptions: SelectOptions = {
		filterBy: $ghStore.selectedRepository!.branches.map((b) => {
			return {
				value: b.name,
				label: b.name,
			} as SelectOption;
		}),
	};

	const buildToolSelectionOptions: SelectOptions = {
		filterBy: [
			{ value: 'Docker', label: 'Docker' },
			{ value: 'NerdCtl', label: 'NerdCtl' },
		],
	};
	const handleBranchSelection = (e: CustomEvent<SelectOption<string>>) => {
		$store.productionBranch = e.detail.value;
		$store.buildSettings!.execCommand = getBuildCommand(
			$store.buildSettings!.buildTool,
			$store.buildSettings!.worfklowFile
		);
	};

	const handleBuildToolSelection = (e: CustomEvent<SelectOption<'NerdCtl' | 'Docker'>>) => {
		console.log('build tool: ', e.detail.value);

		$store.buildSettings!.execCommand = getBuildCommand(e.detail.value, $store.buildSettings!.worfklowFile);
		$store.buildSettings!.buildTool = e.detail.value;
	};

	let invalidExecCommand = false;
	const readExecCommand = (e: Event) => {
		const target = e.target as HTMLInputElement;

		if (!target.value.startsWith('docker ') && !target.value.startsWith('nerdctl ')) {
			invalidExecCommand = true;
			return;
		}

		invalidExecCommand = false;
		$store.buildSettings!.execCommand = target.value;
	};

	$: isNextDisabled = invalidExecCommand || !$store.buildSettings?.buildTool || !$store.productionBranch;
</script>

<div class="w-full flex flex-col gap-6">
	<div class="flex flex-col justify-center items-center gap-2">
		<span class="text-2xl font-bold text-primary-600">Set up Automated Builds for your project</span>
		<div class="flex flex-col lg:flex-row justify-center items-center gap-3">
			<span class="text-sm lg:text-base text-center text-slate-600"> Configure automatic builds for</span>
			<div class="flex gap-1 items-center">
				<img class="mt-0.5" src="/github.svg" alt="github-logo" width="24" />
				<a class="text-primary-500" target="_blank" rel="noreferrer" href={getRepositoryURL()}>
					<u>
						{$ghStore.githubUsername}/{$ghStore.selectedRepository?.repository.name}
					</u>
				</a>
			</div>
		</div>
	</div>
	<hr class="" />

	<div class="flex flex-col justify-center gap-2">
		<div class="flex gap-3 items-center">
			<span class="font-semibold text-primary-600 text-base lg:text-lg">Project name</span>
			<ToolsIcon class="text-primary-600" />
		</div>
		<div class="w-full max-w-[420px]">
			<Textfield readonly={true} value={$store.projectName} />
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			Your project will be deployed to akash network</span
		>
	</div>
	<div class="flex flex-col gap-2 w-full">
		<div class="lg:w-1/3 w-full">
			<Select
				titleStyles="text-primary-500"
				on:change={handleBranchSelection}
				title="Branch"
				options={branchSelectionOptions}
				placeholder="Select a branch"
			/>
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			Pushes to this branch automatically trigger deployments to the Production environment. Pushes branches will
			trigger deployments within the Preview environment to all other
		</span>
	</div>
	<hr />
	<div class="flex flex-col gap-1">
		<div class="flex gap-2">
			<span class="text-base text-primary-600 lg:text-lg font-semibold"> Build Settings</span>
			<div class="flex justify-center items-center rounded-full text-primary-800 text-sm">
				<SettingsIcon class="text-primary-600" />
			</div>
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			If your project uses a different tool than Docker (like nerdctl), then please set the build instructions for
			OpenRegistry
		</span>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col my-6 gap-1 text-sm">
				<div class="lg:w-1/3 w-full">
					<Select
						titleStyles="text-primary-500"
						on:change={handleBuildToolSelection}
						title="Build tool"
						options={buildToolSelectionOptions}
						placeholder="Select a build tool"
					/>
				</div>
				<!-- <ListBox items={buildTools} /> -->
				<span class="text-slate-700 text-sm antialiased">
					select a framework to prefill recommended settings
				</span>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-1 text-primary-500">
					<span class="font-medium"> Build command</span>
				</div>
				<div class="w-full max-w-[500px]">
					<Textfield
						errors={invalidExecCommand ? ['Invalid build command'] : []}
						type="search"
						on:input={readExecCommand}
						value={$store.buildSettings?.execCommand}
						class={invalidExecCommand
							? 'focus:ring-rose-600 ring-rose-600 focus:border-rose-600 border-rose-600'
							: ''}
					/>
				</div>
				<span class="text-slate-600 text-xs lg:text-sm antialiased">
					e.g. docker build -f Dockerfile -t openregistry.dev/test-user/myapp:latest .
				</span>
			</div>

			<div class="flex flex-col">
				<div class="flex items-center justify-start max-w-min max-h-min">
					<Disclosure title="Dockerfile path (advanced)">
						<Textfield
							type="search"
							on:input={readDockerfilePath}
							value={$store.buildSettings?.worfklowFile}
						/>
					</Disclosure>
				</div>
				<div class="flex items-start justify-start w-full max-w-min max-h-min">
					<Disclosure title="Environment variables (coming soon)" disabled>
						<div class="w-3/4">
							<Textfield placeholder="key" type="search" />
						</div>
						<div class="w-3/4">
							<Textfield placeholder="value" type="search" />
						</div>
						<ButtonOutlined class="ml-10 mt-5 px-2 py-1 text-sm bg-white w-32 self-start">
							<AddAccountIcon class="text-primary-300" />
							<span>add more</span>
						</ButtonOutlined>
					</Disclosure>
				</div>
			</div>

			<hr class="m" />

			<div class=" mx-auto flex flex-col w-full items-center gap-6 md:flex-row justify-between md:items-baseline">
				<div
					role="button"
					tabindex={1}
					on:keypress={() => handleNext(0)}
					on:click={() => handleNext(0)}
					on:keypress={() => handleNext(0)}
					class="flex gap-1 cursor-pointer"
				>
					<ArrowLeftIcon class="text-slate-700" />
					<span class="text-slate-700 text-base antialiased"> Change repository </span>
				</div>

				<ButtonSolid {isLoading} on:click={handleSaveAndBuild} disabled={isNextDisabled}>
					Save and Build
				</ButtonSolid>
			</div>
		</div>
	</div>
</div>
