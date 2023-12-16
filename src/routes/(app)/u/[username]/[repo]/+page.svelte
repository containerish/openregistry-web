<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Tag from "$lib/tag.svelte";
	import type { PageData } from "./$types";
	import ButtonOutlined from "$lib/button-outlined.svelte";
	import { page } from "$app/stores";
	import { env } from "$env/dynamic/public";
	import type { Repository } from "$lib/types/registry";
	import Switch from "$lib/components/switch.svelte";
	import { OpenRegistryClient } from "$lib/client/openregistry";
	import { GetVulnerabilityReportResponse } from "@buf/containerish_openregistry.bufbuild_es/services/yor/clair/v1/clair_pb";
	import ExternalLink from "$lib/icons/external-link.svelte";
	import { Loader } from "$lib/components";
	import { SpinnerCircle } from "$lib/icons";

	const openregistryClient = new OpenRegistryClient(fetch);
	let isOverview = false;
	let isTags = false;
	let isSetting = true;
	$: repository = {} as Repository;

	const toggleOverview = () => {
		isOverview = true;
		isTags = false;
		isSetting = false;
	};

	const toggleTags = () => {
		isTags = true;
		isOverview = false;
		isSetting = false;
	};

	const toggleSettings = () => {
		isSetting = true;
		isTags = false;
		isOverview = false;
	};

	export let data: PageData;
	const ns = data.username + "/" + data.repo;

	onMount(async () => {
		const url = new URL(
			"/apis/registry/repository-detail",
			$page.url.origin,
		);
		url.searchParams.set("namespace", ns);

		const response = await fetch(url);
		const data = await response.json();
		if (response.status !== 200) {
			console.log("error retrieaving tags: ", data);
			return;
		}
		repository = data;
	});

	let isCopied = "";
	let timeout: ReturnType<typeof setTimeout>;

	const handleCopy = (cmd: string) => {
		const u = new URL(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		switch (cmd) {
			case "push":
				isCopied = "push";
				window.navigator.clipboard.writeText(
					`docker push ${u.hostname}/${ns}`,
				);
				break;
			case "pull":
				isCopied = "pull";
				window.navigator.clipboard.writeText(
					`docker pull ${u.hostname}/${ns}`,
				);
		}

		timeout = setTimeout(() => {
			isCopied = "";
		}, 2000);
	};

	onDestroy(() => clearTimeout(timeout));

	const getImageCommand = (
		ns: string,
		subcommand: "pull" | "push" = "pull",
	) => {
		const u = new URL(env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		switch (subcommand) {
			case "pull":
				return `docker pull ${u.host}/${ns}`;
			case "push":
				return `docker push ${u.host}/${ns}`;
		}
	};

	const changeRepoVisibility = async () => {
		const response = await openregistryClient.changeRepositoryVisibility(
			repository.visibility === "Public" ? "Private" : "Public",
			repository.id,
		);
		if (!response.success) {
			console.log("error change repository visibility: ", response);
			return;
		}
		repository.visibility =
			repository.visibility === "Public" ? "Private" : "Public";
	};

	$: console.log("repo: ", repository);

	let imageVulnReport: GetVulnerabilityReportResponse;
	let isVulnReportLoading = false;
	const generateVulnReport = async () => {
		isVulnReportLoading = true;
		let digest = repository.image_manifests
			? repository.image_manifests[0].digest
			: "";

		const latestRef = repository.image_manifests?.find(
			(mf) => mf.reference === "latest",
		);
		if (latestRef) {
			digest = latestRef.digest;
		}
		const submitResponse =
			await openregistryClient.submitManifestForVulnScan(digest);
		if (submitResponse.success) {
			const vulnResp = await openregistryClient.getVulnReport(digest);
			if (vulnResp.success) {
				imageVulnReport = vulnResp.data;
			}
		}
		isVulnReportLoading = false;
	};
</script>

<div class="w-full max-w-[2000px] flex flex-col mx-2 py-4">
	<div
		class="flex py-10 lg:py-16 px-16 mx-3 gap-8 bg-primary-50 border-b-0 border-2 border-primary-100"
	>
		<div class="flex items-center">
			<img src="/cube-dark.png" alt="container" width="80px" class="" />
		</div>
		<div class="w-full text-slate-700 flex flex-col gap-2 justify-center">
			<!-- <div class="flex gap-4 items-center"> -->
			<!-- <IconButton class="mt-3 w-3">
					<Star class="w-5 h-5 lg:w-8 lg:h-8" />
				</IconButton> -->
			<!-- </div> -->
			<span class="text-3xl">{data.username}/{data.repo}</span>
			<span class="text-base capitalize">by {data.username}</span>
		</div>
	</div>

	<div
		class="flex gap-5 items-start justify-items-center mx-3 bg-primary-50 px-16 mb-8 border-t-0 border-2
		border-primary-100"
	>
		<button
			aria-label="tab for overview"
			on:click={toggleOverview}
			class="ease-in duration-300 h-10 px-4 pb-6 text-center text-primary-500 bg-transparent border-b-2
			border-transparent text-lg whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isOverview ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Overview
		</button>

		<button
			aria-label="tab for Tags"
			on:click={toggleTags}
			class="ease-in duration-300 h-10 px-4 pb-6 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-lg whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isTags ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Tags
		</button>

		<button
			aria-label="tab for Tags"
			on:click={toggleSettings}
			class="ease-in duration-300 h-10 px-4 pb-6 text-center text-primary-500 bg-transparent border-b-2
				border-transparent text-lg whitespace-nowrap cursor-base m-0 hover:border-b-primary-400
          {isSetting ? 'border-b-primary-500' : 'border-transparent'}"
		>
			Settings
		</button>
	</div>

	{#if !!repository}
		<div class="w-full py-4 flex px-3 justify-center">
			{#if isTags}
				<div
					class="bg-white w-full mx-3 flex-col gap-4 rounded-sm px-3 py-6 flex justify-center
				items-center border border-primary-100/50 shadow-2xl"
				>
					{#if repository.image_manifests}
						{#each repository.image_manifests as manifest}
							<Tag
								namespace={`${data.username}/${data.repo}`}
								{manifest}
							/>
						{/each}
					{:else}
						<div
							class="px-8 py-8 flex h-full w-full justify-center items-center flex-col gap-4"
						>
							<span class="text-slate-500 text-xl"
								>No tags found.</span
							>
							<code
								class="text-slate-500 rounded-sm bg-primary-50 py-2 px-4"
								>Try pushing an image?</code
							>
						</div>
					{/if}
				</div>
			{/if}

			{#if isOverview}
				<div
					class="flex flex-col xl:flex-row justify-start items-center gap-3 w-full px-9 xl:px-3"
				>
					<div
						class="w-full bg-white border border-primary-100/50 shadow-2xl mx-3 h-full rounded-sm
					px-8 py-8 flex justify-center items-center min-h-[200px] min-w-[500px]"
					>
						<span
							class="text-slate-500 rounded-sm bg-primary-50 py-2 px-4 text-xl"
						>
							No Overview Available.
						</span>
					</div>
					<div
						class="min-w-max flex flex-col justify-center items-center gap-3 py-6
					bg-white border border-primary-100/50 rounded-sm mx-4 px-6 shadow-2xl"
					>
						<span class="text-lg text-slate-700 font-medium mb-3"
							>Quick Docker Commands</span
						>
						<ButtonOutlined
							class="lowercase"
							on:click={() => handleCopy("pull")}
						>
							<span
								class="{isCopied === 'pull'
									? 'font-semibold'
									: ''} select-all text-sm lg:text-base text-primary-400
								py-2 px-2 lowercase tracking-wide"
							>
								{isCopied === "pull"
									? "Copied!!"
									: getImageCommand(ns, "pull")}
							</span>
						</ButtonOutlined>

						<ButtonOutlined on:click={() => handleCopy("push")}>
							<span
								class="{isCopied === 'push'
									? 'font-semibold'
									: ''} select-all text-sm lg:text-base text-primary-400
								px-2 py-2 lowercase tracking-wide"
							>
								{isCopied === "push"
									? "Copied!!"
									: getImageCommand(ns, "push")}
							</span>
						</ButtonOutlined>
					</div>
				</div>
			{/if}
			{#if isSetting}
				<div class="flex w-full justify-between items-center gap-9">
					<!-- <div class="flex w-full justify-between items-center"> -->
					<!-- 	<span class="text-lg font-semibold text-slate-500"> -->
					<!-- 		Scan for Vulnerabilities -->
					<!-- 	</span> -->
					<!-- 	<Switch disabled={true} label="" /> -->
					<!-- </div> -->
					<!-- <p class="text-sm text-slate-500 antialiased max-w-md"> -->
					<!-- 	By turning this setting on, you will be able to scan -->
					<!-- 	any possible vulnerabilities in your container -->
					<!-- 	images -->
					<!-- </p> -->
					<button
						on:click={generateVulnReport}
						class="bg-white w-1/2 mx-3 flex-col gap-2 rounded-sm p-6 flex justify-center
			  items-start border border-primary-100/50 shadow-2xl"
					>
						<div class="flex w-full justify-between items-center">
							<span
								class="text-lg font-semibold text-primary-400"
							>
								Generate Vulnerability Report
							</span>
						</div>
						<p class="text-sm text-slate-500 antialiased max-w-md">
							Generate a one-time vulnerability report for your
							container image
						</p>
					</button>
					<div
						class="bg-white w-1/2 mx-3 flex-col gap-2 rounded-sm p-6 flex justify-center
			  items-start border border-primary-100/50 shadow-2xl"
					>
						<div class="flex w-full justify-between items-center">
							<span
								class="text-lg font-semibold text-primary-400"
							>
								Container Image Visibility
							</span>
							<Switch
								on:change={changeRepoVisibility}
								bind:label={repository.visibility}
							/>
						</div>
						<p class="text-sm text-slate-500 antialiased max-w-md">
							The value of this feature determines the visibility
							of your container image. If the value is set to
							true/turned on, your image is <strong
								>PRIVATE</strong
							>
						</p>
					</div>
				</div>
			{/if}
		</div>
		<div class="w-11/12 self-center flex-col h-full flex gap-4">
			<div class="flex gap-3 text-slate-500 items-center">
				<span class="text-lg font-semibold">
					Vulnerability Report
				</span>
				{#if isVulnReportLoading}
					<SpinnerCircle />
				{/if}
			</div>
			{#if imageVulnReport}
				{#each Object.entries(imageVulnReport.vulnerabilities) as [vulnId, vuln]}
					<div
						class="py-4 px-6 bg-primary-50 flex justify-between items-center gap-3 border-primary-100 border"
					>
						<!-- <span class="text-lg font-semibold" -->
						<!-- 	>VulnID: {vulnId}</span -->
						<!-- > -->
						<div class="flex flex-col gap-2">
							<span class="font-normal text-slate-600">
								CVE ID:
								<span class="text-rose-700 font-semibold">
									{vuln.name}
								</span>
							</span>
							<span class="font-normal text-slate-600">
								Vulnerable Layer:
								<span class="text-rose-700 font-semibold">
									{vuln.distribution?.prettyName}
								</span>
							</span>

							<div class="flex gap-5">
								<span class="font-normal text-slate-600">
									Affected package:
									<span class="text-rose-700 font-semibold">
										{vuln.package?.name}
									</span>
								</span>
								<span class="font-normal text-slate-600">
									Fixed in:
									<span
										class="text-emerald-700 font-semibold"
									>
										{vuln.fixedInVersion}
									</span>
								</span>
							</div>
						</div>
						<div>
							<a
								href={vuln.links}
								target="_blank"
								class="flex justify-center items-center gap-1"
							>
								CVE Link
								<ExternalLink />
							</a>
						</div>
					</div>
				{/each}
			{:else}
				<div
					class="py-4 px-6 bg-primary-50 flex justify-center items-center gap-3 border-primary-100 border"
				>
					<span class="text-slate-700 py-4">
						No report available. Please Click the button above to
						generate the report
					</span>
				</div>
			{/if}
		</div>
	{/if}
</div>
