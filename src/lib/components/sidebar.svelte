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
		SignOutIcon
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

<div class="bg-white desktop:min-h-max rounded-sm flex flex-col justify-center items-center gap-14">
	{#if compact == true}
		<div
			in:fly={{ delay: 150, duration: 300, x: 50, opacity: 1, easing: backOut }}
			class="flex flex-col justify-start px-4 items-center gap-14 desktop:gap-8 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max my-1"
		>
			<div>
				<img src="logo-new.png" alt="" width="50px" />
			</div>
			<button on:click={handleSidebar} class="bg-transparent border-transparent m-0 p-0">
				<ArrowRIcon styles="w-7 h-7 desktop:w-6 desktop:h-6 text-primary-400" />
			</button>
			<a href="/"><HomeIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a>
			<a href="https://docs.openregistry.dev/"
				><ReportIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<a href="/search"><SearchIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a>
			<a href="/repositories"
				><CubeIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<a href="/apps/github/connect"
				><GithubOutlinedIcon styles="h-9 w-9 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<a href="/faq"
				><QuestionMarkIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<a href="https://blog.openregistry.dev/"
				><PencilIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<a href=""><HeartIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a>
			<button class="bg-transparent border-0" on:click={toggleModal}
				><UserPlusIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></button
			>
			<a href="/u"><ProfileIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a>
			<a href="/settings"
				><SettingsIcon styles="w-8 h-8 desktop:w-6 desktop:h-6 text-primary-400" /></a
			>
			<SignOutIcon styles="w-8 h-8 text-primary-400 desktop:w-6 desktop:h-6 desktop:mb-4" />
		</div>
	{/if}
	{#if extended == true}
		<div
			in:fly={{ delay: 150, duration: 300, x: -100, opacity: 1, easing: backOut }}
			class="flex flex-col justify-between gap-10 px-5 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max my-1"
		>
			<div class="flex flex-row justify-between items-center gap-4 desktop:gap-2">
				<Logo type="dark" />
				<button on:click={handleSidebar} class="bg-transparent border-transparent mt-2">
					<ArrowLIcon styles="h-7 w-7 desktop:h-5 desktop:w-5 text-primary-500 cursor-pointer" />
				</button>
			</div>

			<div class="flex flex-col justify-center gap-10 desktop:gap-4">
				<div class="relative">
					<Autocomplete/>
				</div>
				<div class="flex flex-col gap-10 desktop:gap-4">
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<HomeIcon styles="desktop:w-5 desktop:h-5" />
							<span>Home</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<ReportIcon styles="desktop:w-5 desktop:h-5" />
							<span>Docs</span>
						</div>
					</div>
					<hr />

					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<SearchIcon styles="desktop:w-5 desktop:h-5" />
							<span>Explore</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<CubeIcon styles="desktop:w-5 desktop:h-5" />
							<span>Your Repositories</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<GithubOutlinedIcon styles="desktop:w-5 desktop:h-5" />
							<span>Connect Gihub</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<QuestionMarkIcon styles="desktop:w-5 desktop:h-5" />
							<span>Help</span>
						</div>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<PencilIcon styles="desktop:w-5 desktop:h-5" />
							<span>Blog</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<HeartIcon styles="desktop:w-5 desktop:h-5" />
							<span>About us</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<HeartIcon styles="desktop:w-5 desktop:h-5" />
							<span>Community</span>
						</div>
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<UserPlusIcon styles="desktop:w-5 desktop:h-5" />
							<span>Invite People</span>
						</div>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5 desktop:gap-2">
						<div
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl"
						>
							<ProfileIcon styles="text-slate-600 desktop:w-5 desktop:h-5" />
							<span>View Profile</span>
						</div>
						<a
							href="/settings"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     		py-3 hover:bg-slate-50 hover:shadow-2xl"
						>
							<SettingsIcon styles="desktop:w-5 desktop:h-5" />
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
				class="flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-[16px] px-3
                     py-1 hover:bg-slate-50 hover:shadow-2xl"
			>
				<SignOutIcon styles="desktop:w-5 desktop:h-5" />
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
