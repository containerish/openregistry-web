<script lang="ts">
	import {
		ArrowLIcon,
		ArrowRIcon,
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
	import Textfield from '$lib/textfield.svelte';
	import Logo from './logo.svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import type { User } from '$apis/auth';
	import { backOut, bounceIn, quintIn, quintOut } from 'svelte/easing';
	import Advert from '../advert.svelte';
	import Carousel from './carousel.svelte';
	import Modal from '$lib/modal.svelte';
	import Invite from './invite.svelte';
	import Autocomplete from '../autocomplete.svelte';
	import { RegistryBackend } from '$apis/registry';

	const registry = new RegistryBackend();

	const handleAutoComplete = async (query: string) => {
		let result = await registry.SearchRepositories(query);
		console.log('here:', result);
		return result;
	};

	let compact: Boolean = false;
	let extended: Boolean = true;

	const handleSidebar = () => {
		compact = !compact;
		extended = !extended;
	};

	const showAdvert = () => {
		let timer = 0;
	};

	export let user: User;

	let showModal = false;
	const toggleModal = () => (showModal = !showModal);
</script>

<div class="bg-slate-50 desktop:min-h-max laptop:min-h-max rounded-sm flex flex-col justify-center items-center gap-14">
	{#if compact == true}
		<div
			in:fly={{ delay: 150, duration: 300, x: 50, opacity: 1, easing: backOut }}
			class="flex flex-col justify-start px-4 laptop:px-2 items-center gap-14 desktop:gap-8 laptop:gap-8 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max laptop:min-h-max my-0.5"
		>
			<div>
				<picture>
					<img class="" src="logo-new.png" alt="logo" width="60px" />
				</picture>
				
			</div>
			<button on:click={handleSidebar} class="bg-transparent border-transparent m-0 p-0">
				<ArrowRIcon styles="w-7 h-7 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 laptop:w-6 laptop:h-6 text-primary-400" />
			</button>
			<a href="/"><HomeIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a>
			<a href="https://docs.openregistry.dev/"
				><ReportIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<a href="/search"><SearchIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a>
			<a href="/repositories"
				><CubeIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<a href="/apps/github/connect"
				><GithubOutlinedIcon styles="h-9 w-9 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<a href="/faq"
				><QuestionMarkIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<a href="https://blog.openregistry.dev/"
				><PencilIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<a href=""><HeartIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a>
			<a href="https://github.com/containerish/OpenRegistry"
				><StarIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<button class="bg-transparent border-0" on:click={toggleModal}
				><UserPlusIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></button
			>
			<a href="/u"><ProfileIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a>
			<a href="/settings"
				><SettingsIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 text-primary-400" /></a
			>
			<SignOutIcon styles="w-8 h-8 text-primary-400 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 desktop:mb-4" />
		</div>
	{/if}
	{#if extended == true}
		<div
			in:fly={{ delay: 150, duration: 300, x: -100, opacity: 1, easing: backOut }}
			class="flex flex-col justify-between gap-10 px-5 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max laptop:min-h-max my-0.5 laptop:max-w-[316px]"
		>
			<div class="flex flex-row justify-between items-center gap-4 desktop:gap-2">
				<Logo type="dark" />
				<button on:click={handleSidebar} class="bg-transparent border-transparent mt-2">
					<ArrowLIcon styles="h-7 w-7 desktop:h-5 desktop:w-5 laptop:h-5 laptop:w-5 text-primary-500 cursor-pointer" />
				</button>
			</div>

			<div class="flex flex-col justify-center gap-10 desktop:gap-4 laptop:gap-4">
				<Autocomplete onAutoComplete={handleAutoComplete} />
				<div class="flex flex-col gap-10 desktop:gap-4">
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<a
							href="/"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<HomeIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Home</span>
						</a>
						<a
							href="https://docs.openregistry.dev"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<ReportIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Docs</span>
						</a>
					</div>
					<hr />

					<div class="flex flex-col gap-3.5 desktop:gap-2 laptop:gap-2">
						<a
							href="/search"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<SearchIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Explore</span>
						</a>
						<a
							href="/repositories"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<CubeIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Your Repositories</span>
						</a>
						<a
							href="/apps/github/connect"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<GithubOutlinedIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Connect Gihub</span>
						</a>
						<a
							href="/faq"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<QuestionMarkIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Help</span>
						</a>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<a
							href="https://blog.openregistry.dev"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<PencilIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Blog</span>
						</a>
						<a
							href="/about"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<HeartIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>About us</span>
						</a>
						<a
							href="https://github.com/containerish/OpenRegistry"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<StarIcon styles="w-6 h-6 desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Star us on Github</span>
						</a>
						<button
							on:click={toggleModal}
							class="bg-transparent border-0 flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<UserPlusIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Invite People</span>
						</button>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<a
							href="/u"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<ProfileIcon styles="text-slate-600 desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>View Profile</span>
						</a>
						<a
							href="/settings"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     		py-3 hover:bg-slate-50 hover:shadow-2xl hover:no-underline"
						>
							<SettingsIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Settings</span>
						</a>
					</div>
					<hr />
				</div>
			</div>

			<div
				class="flex flex-row justify-start items-center gap-4 text-slate-600 text-lg font-medium"
			>
				<div class="w-fit border-2 border-primary-300 p-2 rounded-full">
					<UserIcon styles="h-6 w-6" />
				</div>
				<div class="flex flex-col desktop:text-base">
					<span>{user.username}</span>
					<span>{user.email}</span>
				</div>
			</div>
			<div
				class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-3 hover:bg-slate-50 hover:shadow-2xl hover:no-underline"
			>
				<SignOutIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
				<span>Sign out</span>
			</div>
			<div class="bg-slate-100 px-4 shadow-inner opacity-90 mt-10">
				<Carousel>
					<Advert
						link="https://akash.network"
						styles="hover:bg-red-600"
						logo="akash-logo.svg"
						body="Infrastructure that powers web3 for cloud compute akash network is a distributed
								peer-to-peer marketplace for cloud compute"
					/>
					<Advert
						link="https://ipfs.io"
						styles="hover:bg-[#65c3ca]"
						logo="ipfs-logo.png"
						body="A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web
            				upgradeable, resilient, and more open."
					/>
				</Carousel>
			</div>
		</div>
		{#if showModal}
			<Modal>
				<Invite handleModal={toggleModal} />
			</Modal>
		{/if}
	{/if}
</div>
