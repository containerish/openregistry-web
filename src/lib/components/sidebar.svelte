<script lang="ts">
	import {
		HomeIcon,
		ReportIcon,
		SearchIcon,
		CubeIcon,
		PencilIcon,
		HeartIcon,
		QuestionMarkIcon,
		GithubOutlinedIcon,
		ProfileIcon,
		SettingsIcon,
		UserPlusIcon,
		UserIcon,
		SignOutIcon,
		StarIcon
	} from '$lib/icons';
	import Logo from './logo.svelte';
	import type { User } from '$apis/auth';
	import Advert from '../advert.svelte';
	import Carousel from './carousel.svelte';
	import Invite from './invite.svelte';
	import Autocomplete from '../autocomplete.svelte';
	import { onMount } from 'svelte';
	import Dialog from '$lib/dialog.svelte';
	import { page } from '$app/stores';

	export let authorised = false;

	const handleAutoComplete = async (query: string) => {
		//  for some reason this is signing user out, do we even need the search in sidebar to search
		//  repositories?
		// let result = await registry.SearchRepositories(query);

		const url = new URL('/apis/registry/list/repositories', $page.url.origin);
		url.searchParams.set('query', query);
		const response = await fetch(url);
		if (response.status !== 200) {
			return;
		}
		return await response.json();
	};

	let extended: Boolean = true;

	const handleSidebar = () => {
		extended = !extended;
	};

	const showAdvert = () => {
		let timer = 0;
	};

	export let user: User;

	let showModal = false;
	const toggleModal = () => (showModal = !showModal);

	const handleScreenChange = () => {
		if (window.matchMedia('(max-width: 1000px)').matches) {
			extended = false;
		} else {
			extended = true;
		}
	};

	onMount(() => {
		handleScreenChange();
		window.addEventListener('resize', handleScreenChange);

		return () => window.removeEventListener('resize', handleScreenChange);
	});
</script>

<div
	class="bg-primary-700 rounded-sm flex flex-col justify-start items-center border-2 border-slate-300
	 shadow-2xl tall:min-h-[1700px]"
>
	{#if !extended}
		<form method="POST" class="flex flex-col justify-start px-3 items-center gap-9 py-6">
			<a href="/">
				<picture>
					<img src="/logo-light.png" alt="logo" width="40px" />
				</picture>
			</a>

			<a href="/"><HomeIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="/search"><SearchIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="/repositories"><CubeIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="/apps/github/connect"
				><GithubOutlinedIcon class="w-6 h-6 lg:h-9 lg:w-9 text-primary-50" /></a
			>

			<a href="https://docs.openregistry.dev/" target="_blank" rel="noreferrer">
				<ReportIcon class="w-5 h-5 text-primary-50" />
			</a>

			<a href="/?/faq"><QuestionMarkIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="https://blog.openregistry.dev/" target="_blank" rel="noreferrer">
				<PencilIcon class="w-5 h-5 text-primary-50" /></a
			>

			<a href="/about"><HeartIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="https://github.com/containerish/OpenRegistry" target="_blank" rel="noreferrer">
				<StarIcon class="w-5 h-5 text-primary-50" /></a
			>

			<a href="#" class="bg-transparent border-0" on:click={toggleModal}>
				<UserPlusIcon class="w-5 h-5 text-primary-50" />
			</a>

			<a href="/u"><ProfileIcon class="w-5 h-5 text-primary-50" /></a>

			<a href="/settings"><SettingsIcon class="w-5 h-5 text-primary-50" /></a>

			<button
				aria-label="signout button"
				class="border-none bg-transparent"
				formaction="/?/signout"
			>
				<SignOutIcon class="w-5 h-5 text-primary-50" />
			</button>
		</form>
	{:else}
		<form method="POST" class="py-6 px-3">
			<label for="sidebar">
				<div class="flex flex-col justify-between gap-24 h-full tall:min-h-[1700px]">
					<div class="flex flex-col gap-9">
						<a
							href="/"
							class="flex flex-row justify-between items-center gap-4 hover:no-underline px-2"
						>
							<Logo type="light" />
						</a>

						<div class="flex flex-col justify-center gap-6">
							<Autocomplete onAutoComplete={handleAutoComplete} />
							<div class="flex flex-col gap-6">
								<div class="flex flex-col">
									<a
										href="/"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<HomeIcon />
										<span>Home</span>
									</a>

									<a
										href="/search"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<SearchIcon />
										<span>Explore</span>
									</a>

									<a
										href="/repositories"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<CubeIcon />
										<span>Your Repositories</span>
									</a>

									<a
										href="/apps/github/connect"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
									 hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<GithubOutlinedIcon class="h-6 w-5" />
										<span>Connect Gihub</span>
									</a>
								</div>
								<hr />

								<div class="flex flex-col">
									<a
										href="https://docs.openregistry.dev"
										target="_blank"
										rel="noreferrer"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<ReportIcon />
										<span>Docs</span>
									</a>

									<a
										href="/faq"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<QuestionMarkIcon />
										<span>Help</span>
									</a>
									<a
										href="https://blog.openregistry.dev"
										target="_blank"
										rel="noreferrer"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								  hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<PencilIcon />
										<span>Blog</span>
									</a>
								</div>
								<hr />
								<div class="flex flex-col">
									<a
										href="/about"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<HeartIcon />
										<span>About us</span>
									</a>
									<a
										href="https://github.com/containerish/OpenRegistry"
										target="_blank"
										rel="noreferrer"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								 hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<StarIcon />
										<span>Star us on Github</span>
									</a>
									<a
										href="#"
										on:click={toggleModal}
										class="bg-transparent border-0 flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
								 hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<UserPlusIcon />
										<span>Invite People</span>
									</a>
								</div>
								<hr />
								<div class="flex flex-col">
									<a
										href="/u"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
									hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<ProfileIcon class="text-slate-100 antialiased h-5 w-5 " />
										<span>View Profile</span>
									</a>
									<a
										href="/settings"
										class="flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
									 hover:bg-primary-600/60 py-2 px-3 text-sm xl:text-base hover:no-underline"
									>
										<SettingsIcon />
										<span>Settings</span>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-3">
						<div
							class="flex flex-col justify-start items-start gap-4 text-slate-100 antialiased
							tracking-wide font-medium rounded-lg bg-primary-600/50 p-2"
						>
							<div class="flex justify-start items-center gap-3">
								<div class="w-fit border-2 border-primary-50 p-1 lg:p-2 rounded-full">
									<UserIcon class="h-4 w-4 text-primary-50 fill-current" />
								</div>
								<div class="rounded-full text-xs px-2 text-emerald-900 bg-gradient-to-b from-emerald-200 to-emerald-300">active</div>
							</div>
							
							<div class="flex flex-col text-sm">
								<span>{user.username}</span>
								<span>{user.email}</span>
							</div>
						</div>
						<hr />
						<button
							formaction="/?/signout"
							class=" border-0 bg-transparent flex flex-row gap-3 justify-start items-center text-slate-100 antialiased tracking-wide
					  hover:bg-primary-600/60 py-2 px-3 hover:no-underline text-sm xl:text-base"
						>
							<SignOutIcon />
							<span>Sign out</span>
						</button>

						<div
							class="bg-primary-200/20 rounded flex justify-center shadow-inner opacity-90 mt-10 px-3"
						>
							<Carousel>
								<Advert
									link="https://akash.network"
									class="hover:bg-rose-500"
									logo="/akash.png"
									body="Infrastructure that powers web3 for cloud compute akash network is a distributed
								peer-to-peer marketplace for cloud compute"
								/>
								<Advert
									link="https://ipfs.io"
									class="hover:bg-[#65c3ca]"
									logo="/IPFS_ad.png"
									body="A peer-to-peer protocol designed to preserve and grow humanity's knowledge by 
						making the web upgradeable, resilient, and more open."
								/>
							</Carousel>
						</div>
					</div>
				</div>
			</label>
		</form>
		{#if showModal}
			<Dialog>
				<Invite handleModal={toggleModal} />
			</Dialog>
		{/if}
	{/if}
</div>
