<script lang="ts">
	import { ghStore } from "$lib/stores";
	import ListBox from "$lib/listBox.svelte";
	import Disclosure from "$lib/disclosure.svelte";
	import Textfield from "$lib/textfield.svelte";
	import {
		ArrowLeftIcon,
		InfoIcon,
		BookIcon,
		AddAccountIcon,
	} from "$lib/icons";
	import ButtonSolid from "$lib/button-solid.svelte";
	import ButtonOutlined from "$lib/button-outlined.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import type { CreateProjectState } from "$lib/types/index";
	import Select from "$lib/components/select.svelte";

	import { env } from "$env/dynamic/public";

	export let handleNext: (index: number) => void;

	let isLoading = false;
	let projectSettings: Partial<CreateProjectState> = {} as CreateProjectState;
	const handleSaveAndDeploy = async () => {
		isLoading = true;
		const selectedRepository = $ghStore.selectedRepository;
		if (!selectedRepository) {
			alert("Please select a repository first");
			return;
		}
		try {
			await storeBuildProject();
			const err = await createPullRequest(
				selectedRepository.repository.name ?? "",
			);
			if (!err) {
				console.log("selectedRepository: ", selectedRepository);
				isLoading = false;
				handleNext(2);
				return;
			}

			console.log("error creating pull request: ", err);
		} catch (err) {
			console.log("error storing build project: ", err);
		}
	};

	const dispatch = createEventDispatcher();
	const buildSettingsDispatcher = createEventDispatcher();

	type APIError = {
		error: string;
		message: string;
	};

	const dispatchBuildSettings = () => {
		const buildSettings = {
			projectName: projectName,
			buildSettings: {
				buildTool: selectedBuildToool.name,
				execCommand: selectedBuildToool.buildCommand,
				worfklowFile: dockerFilePath,
			},
		} as CreateProjectState;
		buildSettingsDispatcher("build_settings", buildSettings);
	};

	const createPullRequest = async (
		repositoryName: string,
	): Promise<APIError | undefined> => {
		dispatchBuildSettings();

		const response = await fetch("/apis/services/github/pull-request", {
			method: "POST",
			body: JSON.stringify({
				dockerfile_path: "Dockerfile",
				repository_name: repositoryName,
			}),
		});

		console.log("response stastuus: ", response.status);
		switch (response.status) {
			// notModified, which means, PR not created, which means, GHA already exists
			case 202:
				dispatch("gha_pull_request", {
					pullRequestExists: true,
				});
				break;
			case 201:
				dispatch("gha_pull_request", {
					pullRequestExists: false,
				});
				break;
			default:
				return (await response.json()) as APIError;
		}
	};

	onMount(() => {
		ghStore.setActiveBranch(
			$ghStore.selectedRepository?.repository.default_branch ?? "",
		);
	});

	const getRepositoryURL = () => {
		const username = $ghStore.githubUsername;
		const selectedRepoName = $ghStore.selectedRepository?.repository.name;
		return `https://github.com/${username}/${selectedRepoName}`;
	};

	const updateBuildTool = (buildTool: unknown) => {
		console.log("buildtool: ", buildTool);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		selectedBuildToool = buildTools.find(
			(tool) => tool.name === (buildTool as string),
		)!;
		console.log("projectSettings: ", projectSettings);
		projectSettings.buildSettings = {
			buildTool: buildTool as string,
			execCommand: "",
			worfklowFile: "",
		};
	};

	let selectedBranch =
		$ghStore.selectedRepository?.repository.default_branch ?? "";
	const getBuildCommand = (buildTool: "Docker" | "NerdCtl") => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const selectedRepository = $ghStore.selectedRepository!;
		const openRegistryURI = `${env.PUBLIC_OPEN_REGISTRY_BACKEND_URL}/${selectedRepository.repository.full_name}:${selectedBranch}`;
		switch (buildTool) {
			case "Docker":
				return `docker build -t ${openRegistryURI} -f ${dockerFilePath} ${dockerContextPath}`;
			case "NerdCtl":
				return `nerdctl build -t ${openRegistryURI} -f ${dockerFilePath} ${dockerContextPath}`;
		}
	};
	let dockerFilePath = "./Dockerfile";
	let dockerContextPath = ".";
	let buildTools = [
		{
			name: "Docker",
			id: 0,
			disabled: false,
			buildCommand: getBuildCommand("Docker"),
			handler: updateBuildTool,
		},
		{
			name: "NerdCtl",
			id: 1,
			disabled: false,
			buildCommand: getBuildCommand("NerdCtl"),
			handler: updateBuildTool,
		},
	];
	let selectedBuildToool = buildTools[0];

	let projectName = "";
	export let createProjectState: CreateProjectState;
	const storeBuildProject = async () => {
		const response = await fetch("/apis/services/github/actions/projects", {
			method: "POST",
			body: JSON.stringify(createProjectState),
		});
		const data = await response.json();
		console.log("response on client: ", response.status, data);
	};

	const readDockerfilePath = (e: Event) => {
		dockerFilePath = (e.target as HTMLInputElement).value;
		selectedBuildToool.buildCommand = getBuildCommand(
			selectedBuildToool.name === "Docker" ? "Docker" : "NerdCtl",
		);
	};

	const readProjectName = (e: Event) => {
		projectName = (e.target as HTMLInputElement).value;
	};

	let repoOptions = {
		filterBy: $ghStore.selectedRepository?.branches.map((b) => b.name),
	};

	let buildOptions = { filterBy: ["Docker", "NerdCtl"] };
	console.log("repoOptions", repoOptions);
</script>

<div class="w-full flex flex-col gap-6">
	<div class="flex flex-col justify-center items-center gap-2">
		<span class="text-2xl font-bold text-primary-600"
			>Set up Automated Builds for your project</span
		>
		<div
			class="flex flex-col lg:flex-row justify-center items-center gap-3"
		>
			<span class="text-sm lg:text-base text-center text-slate-600">
				Configure automatic builds for</span
			>
			<div class="flex gap-1 items-center">
				<img
					class="mt-0.5"
					src="/github.svg"
					alt="github-logo"
					width="24"
				/>
				<a
					class="text-primary-500"
					target="_blank"
					rel="noreferrer"
					href={getRepositoryURL()}
				>
					<u>
						{$ghStore.githubUsername}/{$ghStore.selectedRepository
							?.repository.name}
					</u>
				</a>
			</div>
		</div>
	</div>
	<hr class="" />

	<div class="flex flex-col justify-center gap-2">
		<span class="font-semibold text-primary-600 text-base lg:text-lg"
			>Project name</span
		>
		<div class="w-full max-w-[420px]">
			<Textfield on:input={readProjectName} value={projectName} />
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			Your project will be deployed to akash network</span
		>
	</div>
	<div class="flex flex-col gap-2">
		<!-- <ListBox
      items={$ghStore?.selectedRepository?.branches.map((b, i) => ({
        name: b.name,
        id: i,
        handler: () => {
          ghStore.setActiveBranch(b.name);
          selectedBranch = b.name;
          selectedBuildToool.buildCommand = getBuildCommand(
            selectedBuildToool.name === "Docker" ? "Docker" : "NerdCtl"
          );
        },
        disabled: false,
      })) ?? []}
    /> -->
		<div class="max-w-min">
			<Select title="Branch" options={repoOptions} placeholder="master" />
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			Pushes to this branch automatically trigger deployments to the
			Production environment. Pushes branches will trigger deployments
			within the Preview environment to all other
		</span>
	</div>
	<hr />
	<div class="flex flex-col gap-1">
		<div class="flex gap-2">
			<span class="text-base text-primary-600 lg:text-lg font-semibold">
				Build Settings</span
			>
			<div
				class="flex space-x-2 justify-center items-center rounded-full bg-emerald-100 max-w-fit px-2.5 pr-3
				text-sm text-emerald-900"
			>
				<BookIcon />
				<span class="text-xs">Configuring build</span>
			</div>
		</div>
		<span class="text-xs lg:text-sm text-slate-700 antialiased">
			If your project uses a different tool than Docker (like nerdctl),
			then please set the build instructions for OpenRegistry
		</span>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col my-6 gap-1 text-sm">
				<div class="max-w-min">
					<Select
						title=""
						options={buildOptions}
						placeholder="Docker"
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
					<InfoIcon />
				</div>
				<div class="w-full max-w-[420px]">
					<Textfield
						type="search"
						value={selectedBuildToool.buildCommand}
					/>
				</div>
				<span class="text-slate-600 text-xs lg:text-sm antialiased">
					e.g. docker build -f Dockerfile -t
					openregistry.dev/test-user/myapp:latest .
				</span>
			</div>

			<div class="flex flex-col">
				<div
					class="flex items-center justify-start max-w-min max-h-min"
				>
					<Disclosure title="Dockerfile directory (advanced)">
						<Textfield
							class="ml-10"
							type="search"
							value={dockerFilePath}
							on:input={readDockerfilePath}
						/>
					</Disclosure>
				</div>
				<div
					class="flex items-start justify-start w-full max-w-min max-h-min"
				>
					<Disclosure title="Environment variables (advanced)">
						<div class="w-3/4">
							<Textfield placeholder="key" type="search" />
						</div>
						<div class="w-3/4">
							<Textfield placeholder="value" type="search" />
						</div>
						<ButtonOutlined
							class="ml-10 mt-5 px-2 py-1 text-sm bg-white w-32 self-start"
						>
							<AddAccountIcon class="text-primary-300" />
							<span>add more</span>
						</ButtonOutlined>
					</Disclosure>
				</div>
			</div>

			<hr class="m" />

			<div
				class=" mx-auto flex flex-col w-full items-center gap-6 md:flex-row justify-between md:items-baseline"
			>
				<div
					role="button"
					tabindex={1}
					on:keypress={() => handleNext(0)}
					on:click={() => handleNext(0)}
					on:keypress={() => handleNext(0)}
					class="flex gap-1 cursor-pointer"
				>
					<ArrowLeftIcon class="text-slate-700" />
					<span class="text-slate-700 text-base antialiased">
						Change repository
					</span>
				</div>

				<ButtonSolid
					{isLoading}
					on:click={handleSaveAndDeploy}
					disabled={!projectName}
				>
					Save and Build
				</ButtonSolid>
			</div>
		</div>
	</div>
</div>
