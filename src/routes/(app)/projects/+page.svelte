<script lang="ts">
	import { navigating } from '$app/stores';
	import { Loader } from '$lib/components';
	import { pulseStore } from '$lib/components/pulse';
	import { Check, ExternalLinkIcon, GitBranchIcon, RecycleIcon } from '$lib/icons';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import {
		GetProjectResponse,
		ListProjectsResponse,
	} from '@buf/containerish_openregistry.bufbuild_es/services/kon/github_actions/v1/build_project_pb';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: projects = [] as GetProjectResponse[];

	const getProjects = () => {
		if (data.projects) {
			const resp = new ListProjectsResponse().fromJson(data.projects);
			return resp.projects;
		}

		return [];
	};

	onMount(async () => {
		projects = getProjects();
		if (projects.length === 0) {
			await goto('/apps/github/connect');
		}
	});

	$: {
		pulseStore.setPulseState(!$navigating && !!data.projects);
	}
</script>

<Loader>
	<div class="flex justify-center items-start w-full h-full min-w-max min-h-max py-8">
		<div class="justify-start flex flex-col gap-2 items-start w-full h-full max-w-[3000px]">
			{#each getProjects() as project}
				<!-- the values are added just for design purposes, must cahnge them with dynamic values once APIs are in place -->
				<div
					class="flex flex-col bg-white rounded-sm min-h-max border-2 border-primary-100/50
	border-l-4 border-l-emerald-600 border-opacity-100 w-11/12 shadow-2xl gap-3 px-6 py-6"
					in:fly={{ y: 200, duration: 300, delay: 200 }}
				>
					<div class="flex justify-between">
						<span class="text-lg text-slate-700">{project.projectName}</span>
						<button class="flex justify-center items-center gap-1 bg-transparent border-0 p-0 m-0">
							<span class="underline underline-offset-4 text-slate-600">Visit GitHub repository</span>
							<ExternalLinkIcon class="h-4 w-4 text-slate-700" />
						</button>
					</div>
					<div class="flex gap-3 justify-start items-center">
						<RecycleIcon class="h-4 w-4 text-slate-700" />
						<span class="text-slate-800 text-sm antialiased">Automatic builds enabled</span>
					</div>
					<hr class="-mx-6 border-b-1 border-slate-300" />
					<div class="flex flex-col lg:flex-row gap-6 justify-between">
						<div class="flex flex-col md:flex-row items-start gap-6 md:items-center">
							<div class="flex gap-2 items-center">
								<a href="#" class="text-slate-600 text-sm antialiased">
									{data.user?.username}/{project.repositoryName}
								</a>
								<ExternalLinkIcon class="h-4 w-4 text-primary-500" />
							</div>
						</div>
						<div class="flex gap-2 items-center">
							<Check class="h-5 w-5 text-emerald-600" />
							<span class="text-sm text-slate-600">Just now</span>
							<a href="#" class="underline text-sm">view details</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Loader>
