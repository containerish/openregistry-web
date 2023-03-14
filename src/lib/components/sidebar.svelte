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

<div class="bg-slate-50 rounded-sm flex flex-col justify-center items-center gap-14">
	{#if !extended}
		<form
			method="POST"
			class="flex flex-col justify-start px-4 items-center gap-9 border-2 border-primary-50 shadow-2xl py-6"
		>
			<a href="/">
				<picture>
					<img class="" src="/logo-new.png" alt="logo" width="60px" />
				</picture>
			</a>

			<a href="/"><HomeIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="/search"><SearchIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="/repositories"><CubeIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="/apps/github/connect"
				><GithubOutlinedIcon styles="w-6 h-6 lg:h-9 lg:w-9 text-primary-400" /></a
			>

			<a href="https://docs.openregistry.dev/" target="_blank" rel="noreferrer">
				<ReportIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" />
			</a>

			<a href="/?/faq"><QuestionMarkIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="https://blog.openregistry.dev/" target="_blank" rel="noreferrer">
				<PencilIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a
			>

			<a href="/about"><HeartIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="https://github.com/containerish/OpenRegistry" target="_blank" rel="noreferrer">
				<StarIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a
			>

			<a href="#" class="bg-transparent border-0" on:click={toggleModal}>
				<UserPlusIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" />
			</a>

			<a href="/u"><ProfileIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<a href="/settings"><SettingsIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" /></a>

			<button class="border-none bg-transparent" formaction="/?/signout">
				<SignOutIcon styles="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" />
			</button>
		</form>
	{:else}
		<form
			method="POST"
			class="flex flex-col justify-between gap-10 border-2 border-primary-50 shadow-2xl py-6 px-6 lg:px-9"
		>
			<a href="/" class="flex flex-row justify-between items-center gap-4 hover:no-underline">
				<Logo type="dark" />
			</a>

			<div class="flex flex-col justify-center gap-10">
				<Autocomplete onAutoComplete={handleAutoComplete} />
				<div class="flex flex-col gap-10">
					<div class="flex flex-col gap-3.5">
						<a
							href="/"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<HomeIcon styles="" />
							<span>Home</span>
						</a>

						<a
							href="/search"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<SearchIcon styles="" />
							<span>Explore</span>
						</a>

						<a
							href="/repositories"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<CubeIcon styles="" />
							<span>Your Repositories</span>
						</a>

						<a
							href="/apps/github/connect"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
							hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<GithubOutlinedIcon styles="h-7 w-6.5" />
							<span>Connect Gihub</span>
						</a>
					</div>
					<hr />

					<div class="flex flex-col gap-3.5">
						<a
							href="https://docs.openregistry.dev"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<ReportIcon styles="" />
							<span>Docs</span>
						</a>

						<a
							href="/faq"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<QuestionMarkIcon styles="" />
							<span>Help</span>
						</a>
						<a
							href="https://blog.openregistry.dev"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<PencilIcon styles="" />
							<span>Blog</span>
						</a>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5">
						<a
							href="/about"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg py-2.5
							hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<HeartIcon styles="" />
							<span>About us</span>
						</a>
						<a
							href="https://github.com/containerish/OpenRegistry"
							target="_blank"
							rel="noreferrer"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg  py-2.5
							 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<StarIcon styles="w-6 h-6 " />
							<span>Star us on Github</span>
						</a>
						<a
							href="#"
							on:click={toggleModal}
							class="bg-transparent border-0 flex flex-row gap-3 justify-start items-center text-slate-600 
							text-lg py-2.5 hover:bg-slate-100 hover:shadow-2xl 
							hover:no-underline"
						>
							<UserPlusIcon styles="" />
							<span>Invite People</span>
						</a>
					</div>
					<hr />
					<div class="flex flex-col gap-3.5 ">
						<a
							href="/u"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     py-2.5 hover:bg-slate-100 hover:shadow-2xl hover:no-underline"
						>
							<ProfileIcon styles="text-slate-600 h-6 w-6 " />
							<span>View Profile</span>
						</a>
						<a
							href="/settings"
							class="flex flex-row gap-3 justify-start items-center text-slate-600 text-lg
                     		py-3 hover:bg-slate-50 hover:shadow-2xl hover:no-underline"
						>
							<SettingsIcon styles="" />
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
				<div class="flex flex-col">
					<span>{user.username}</span>
					<span>{user.email}</span>
				</div>
			</div>
			<button
				formaction="/?/signout"
				class=" border-0 bg-transparent flex flex-row gap-3 justify-start items-center text-slate-600 text-lg 
		        py-3 hover:bg-slate-50 hover:shadow-2xl hover:no-underline"
			>
				<SignOutIcon styles="" />
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
						body="A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by 
						making the web upgradeable, resilient, and more open."
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
