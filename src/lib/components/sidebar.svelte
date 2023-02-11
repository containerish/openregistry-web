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
	import Modal from '$lib/modal.svelte';
	import Invite from './invite.svelte';
	import Autocomplete from '../autocomplete.svelte';
	import { RegistryBackend } from '$apis/registry';
	import { onMount } from 'svelte';
	import Dialog from '$lib/dialog.svelte';

	export let authorised = false;
	const registry = new RegistryBackend();

	const handleAutoComplete = async (query: string) => {
		let result = await registry.SearchRepositories(query);
		console.log('here:', result);
		return result;
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
		if (window.matchMedia('(max-width: 800px)').matches) {
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
	class="bg-slate-50 desktop:min-h-max laptop:min-h-max rounded-sm flex flex-col justify-center items-center gap-14"
>
	{#if !extended}
		<form
			method="POST"
			class="flex flex-col justify-start px-4 laptop:px-2 items-center gap-14 desktop:gap-8 laptop:gap-8 half:gap-5 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max laptop:min-h-max my-0.5 half:min-h-max"
		>
			<a href="/">
				<picture>
					<img class="" src="/logo-new.png" alt="logo" width="60px" />
				</picture>
			</a>
			<a href="/"
				><HomeIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="https://docs.openregistry.dev/"
				><ReportIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/search"
				><SearchIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/repositories"
				><CubeIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/apps/github/connect"
				><GithubOutlinedIcon
					styles="h-9 w-9 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/?/faq"
				><QuestionMarkIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="https://blog.openregistry.dev/"
				><PencilIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/about"
				><HeartIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="https://github.com/containerish/OpenRegistry"
				><StarIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="#" class="bg-transparent border-0" on:click={toggleModal}>
				<UserPlusIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/>
			</a>
			<a href="/u"
				><ProfileIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<a href="/settings"
				><SettingsIcon
					styles="w-8 h-8 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 text-primary-400"
				/></a
			>
			<button class="border-none bg-transparent" formaction="/?/signout">
				<SignOutIcon
					styles="w-8 h-8 text-primary-400 desktop:w-6 desktop:h-6 laptop:w-6 laptop:h-6 half:w-6 half:h-6 desktop:mb-4"
				/>
			</button>
		</form>
	{:else}
		<form
			method="POST"
			class="flex flex-col justify-between gap-10 px-5 border-2 border-primary-50 
			shadow-2xl py-6 min-h-[1610px] desktop:min-h-max laptop:min-h-max my-0.5 laptop:max-w-[316px]"
		>
			<a
				href="/"
				class="flex flex-row justify-between items-center gap-4 desktop:gap-2 hover:no-underline"
			>
				<Logo type="dark" />
			</a>

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
						<a
							href="#"
							on:click={toggleModal}
							class="bg-transparent border-0 flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<UserPlusIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
							<span>Invite People</span>
						</a>
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
			<button
				formaction="/?/signout"
				class=" border-0 bg-transparent flex flex-row gap-3 justify-start items-center text-slate-600 text-xl desktop:text-base laptop:text-base px-3
                     py-3 hover:bg-slate-50 hover:shadow-2xl hover:no-underline"
			>
				<SignOutIcon styles="desktop:w-5 desktop:h-5 laptop:h-5 laptop:w-5" />
				<span>Sign out</span>
			</button>
			<div class="bg-slate-100 px-4 shadow-inner opacity-90 mt-10">
				<Carousel>
					<Advert
						link="https://akash.network"
						styles="hover:bg-red-600"
						logo="/akash-logo.svg"
						body="Infrastructure that powers web3 for cloud compute akash network is a distributed
								peer-to-peer marketplace for cloud compute"
					/>
					<Advert
						link="https://ipfs.io"
						styles="hover:bg-[#65c3ca]"
						logo="/IPFS_ad.png"
						body="A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web
            				upgradeable, resilient, and more open."
					/>
				</Carousel>
			</div>
		</form>
		{#if showModal}
			<Modal>
				<Invite handleModal={toggleModal} />
			</Modal>
		{/if}
	{/if}
</div>
