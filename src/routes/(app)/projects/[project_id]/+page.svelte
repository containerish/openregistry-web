<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { SettingsIcon, PlainCrossIcon, ArrowLeftIcon, ChevronRightIcon } from '$lib/icons';
	import BuildTile from './build.svelte';
	import BuildCompact from './build-compact.svelte';
	import Settings from './settings.svelte';
	import IconButton from '$lib/icon-button.svelte';
	import { twMerge } from 'tailwind-merge';
	const handleTabSelect = (opts: { selected: boolean }) => {
		return opts.selected
			? `font-semibold border-0 border-b-4 border-primary-400 text-lg text-slate-700 -mb-0.5`
			: `border-none selection:bg-primary-100 text-lg text-slate-700 -mb-0.5`;
	};

	let showFirstBuild = true;
	const toggleFirstBuild = () => {
		showFirstBuild = false;
	};

	const {
		elements: { root, list, content, trigger },
		states: { value },
	} = createTabs({
		defaultValue: 'tab-1',
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Builds' },
		{ id: 'tab-2', title: 'Settings' },
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});
</script>

<svelte:head>
	<title>Builds | OpenRegistry</title>
</svelte:head>

<div
	use:melt={$root}
	class={twMerge(
		'flex max-w-[2000px] flex-col overflow-hidden rounded-xl shadow-lg  data-[orientation=vertical]:flex-row',
		className
	)}
>
	<div
		use:melt={$list}
		class="flex shrink-0 overflow-x-auto bg-neutral-100
    data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
		aria-label="Manage your account"
	>
		{#each triggers as triggerItem}
			<button use:melt={$trigger(triggerItem.id)} class="trigger relative">
				{triggerItem.title}
				{#if $value === triggerItem.id}
					<div
						in:send={{ key: 'trigger' }}
						out:receive={{ key: 'trigger' }}
						class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-magnum-400"
					/>
				{/if}
			</button>
		{/each}
	</div>
	<div use:melt={$content('tab-1')} class="grow bg-white p-5">
		{#if showFirstBuild}
			<div
				class="flex flex-col md:flex-row relative bg-white rounded-sm px-9 md:items-center py-3 md:py-0
		min-h-max border-2 border-primary-100/50 shadow-3xl mt-10 gap-6"
				in:fly={{ x: 200, duration: 300, delay: 100 }}
			>
				<div>
					<img
						src="/catainer/catainer-hearts.png"
						alt="logo"
						class="md:pb-12 max-w-[200px] md:max-w-[250px]"
					/>
				</div>
				<div class="flex flex-col gap-3 justify-center">
					<span class="text-2xl font-semibold text-primary-500"> Congratulations on your first Build!</span>
					<span class="text-sm lg:text-base text-slate-600 ml-1">
						you can now do more with your site. invite collaborators, protect previews, enable web analytics
						and more.</span
					>
					<button aria-label="explore button" class="border-0 bg-transparent w-44 rounded-lg">
						<div class="flex space-x-2">
							<SettingsIcon class="text-primary-400" />
							<span class="text-primary-400"> Explore Settings</span>
						</div>
					</button>
				</div>
				<IconButton on:click={toggleFirstBuild} class="absolute right-4 top-4 bg-transparent border-none w-4">
					<PlainCrossIcon class="w-6 h-6 text-slate-600" />
				</IconButton>
			</div>
		{/if}
		<BuildTile />
		<div
			class="border border-primary-100/50 rounded flex flex-col overflow-y-auto min-w-[700px]"
			in:fly={{ y: 200, duration: 300, delay: 300 }}
		>
			<div class="bg-primary-200/50 grid grid-cols-7 justify-between px-3 py-1 text-slate-800">
				<span>Environment</span>
				<span class=" col-span-2">Source</span>
				<span class=" col-span-2">Deployment</span>
				<span class=" col-span-2">Status</span>
			</div>
			<div class="">
				{#each new Array(2) as item}
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
				<span class="text-sm text-slate-500"> 1 to 10 of 100 builds </span>
			</div>
		</div>
	</div>
	<div use:melt={$content('tab-2')} class="grow bg-white p-5">
		<Settings />
	</div>
</div>

<!-- <div class="w-full p-6 md:p-12">
	<TabGroup defaultIndex={0}>
		<TabList class="text-lg flex gap-9 ml-2 border-b-2 border-slate-300">
			<Tab let:selected class={handleTabSelect}>Builds</Tab>
			<Tab class={handleTabSelect}>Settings</Tab>
		</TabList>

		<div in:fade={{ duration: 300 }}>
			<TabPanels>
				<TabPanel>
					{#if showFirstBuild}
						<div
							class="flex flex-col md:flex-row relative bg-white rounded-sm px-9 md:items-center py-3 md:py-0
							min-h-max border-2 border-primary-100/50 shadow-3xl mt-10 gap-6"
							in:fly={{ x: 200, duration: 300, delay: 100 }}
						>
							<div>
								<img
									src="/catainer/catainer-hearts.png"
									alt="logo"
									class="md:pb-12 max-w-[200px] md:max-w-[250px]"
								/>
							</div>
							<div class="flex flex-col gap-3 justify-center">
								<span
									class="text-2xl font-semibold text-primary-500"
								>
									Congratulations on your first Build!</span
								>
								<span
									class="text-sm lg:text-base text-slate-600 ml-1"
								>
									you can now do more with your site. invite
									collaborators, protect previews, enable web
									analytics and more.</span
								>
								<button
									aria-label="explore button"
									class="border-0 bg-transparent w-44 rounded-lg"
								>
									<div class="flex space-x-2">
										<SettingsIcon
											class="text-primary-400"
										/>
										<span class="text-primary-400">
											Explore Settings</span
										>
									</div>
								</button>
							</div>
							<IconButton
								on:click={toggleFirstBuild}
								class="absolute right-4 top-4 bg-transparent border-none w-4"
							>
								<PlainCrossIcon
									class="w-6 h-6 text-slate-600"
								/>
							</IconButton>
						</div>
					{/if}
					<BuildTile />
					<div
						class="border border-primary-100/50 rounded flex flex-col overflow-y-auto min-w-[700px]"
						in:fly={{ y: 200, duration: 300, delay: 300 }}
					>
						<div
							class="bg-primary-200/50 grid grid-cols-7 justify-between px-3 py-1 text-slate-800"
						>
							<span>Environment</span>
							<span class=" col-span-2">Source</span>
							<span class=" col-span-2">Deployment</span>
							<span class=" col-span-2">Status</span>
						</div>
						<div class="">
							{#each new Array(2) as item}
								<BuildCompact />
								<hr />
							{/each}
						</div>

						<div
							class="bg-white py-2 flex gap-2 px-3 items-center justify-start"
						>
							<IconButton class="w-3">
								<ArrowLeftIcon class="h-6 w-6 text-slate-500" />
							</IconButton>
							<IconButton class="w-3">
								<ChevronRightIcon
									class="h-6 w-6 text-slate-600"
								/>
							</IconButton>
							<span class="text-sm text-slate-500">
								1 to 10 of 100 builds
							</span>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<Settings />
				</TabPanel>
			</TabPanels>
		</div>
	</TabGroup>
</div> -->

<!-- <style lang="postcss">
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: default;
    user-select: none;

    border-radius: 0;
    background-color: theme(colors.neutral.100);

    color: theme(colors.neutral.900);
    font-weight: 500;
    line-height: 1;

    flex: 1;
    height: theme(spacing.12);
    padding-inline: theme(spacing.2);

    &:focus {
      position: relative;
    }

    &:focus-visible {
      @apply z-10 ring-2;
    }

    &[data-state="active"] {
      @apply focus:relative;
      background-color: white;
      color: "#fff";
    }
  }

  input {
    height: theme(spacing.8);
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: theme(borderRadius.md);
    border: 1px solid theme(colors.neutral.200);
    padding-inline: theme(spacing[2.5]);
    line-height: 1;
    color: theme(colors.neutral.900);

    &:focus {
      border-color: "#fff";
    }
  }

  .save {
    display: inline-flex;
    height: theme(spacing.8);
    cursor: default;
    align-items: center;
    justify-content: center;
    border-radius: theme(borderRadius.md);
    padding-inline: theme(spacing.4);
    line-height: 1;
    font-weight: theme(fontWeight.semibold);
    @apply transition;

    &:hover {
      opacity: 0.75;
    }

    &:focus {
      @apply !ring-green-600;
    }
  }
</style> -->
