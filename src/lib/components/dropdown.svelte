<script lang="ts">
	import ChevronDown from '$lib/icons/chevron-down.svelte';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import type { User } from '$apis/auth';
	import { Auth } from '$apis/auth';
	import {
		ProfileIcon,
		QuestionMarkIcon,
		GithubIcon,
		UserPlusIcon,
		SettingsIcon,
		SignOutIcon
	} from '$lib/icons';
	import Modal from '$lib/modal.svelte';
	import Invite from './invite.svelte';
	import { goto } from '$app/navigation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	export let user: User;

	const auth = new Auth();
	export let closeMenu: VoidFunction;

	const signOut = async () => {
		const { error } = await auth.Signout();
		if (error) {
			console.error('error signnout user: ', error);
		}

		// tried using await goto('/') but it keeps failing
		location.href = '/';
	};

	let showModal = false;
	const toggleModal = () => (showModal = !showModal);

	const navigateAround = async (path: string) => {
		closeMenu();
		await goto(path);
	};
</script>

{#if user}
	<div class="min-w-max text-right">
		<div class="relative inline-block text-left ">
			<div>
				<Menu>
					<MenuButton
						class="transition ease-in-out duration-200
						flex space-x-2 justify-center items-center max-w-[48rem] min-w-[144px] desktop:min-w-[120px] border-2 border-primary-500 text-primary-500 
						rounded-md bg-transparent capitalize text-lg font-medium hover:rounded-full hover:ease-in py-3 px-4 laptop:py-1.5 desktop:text-base desktop:border-[1.5px]"
					>
						<ProfileIcon styles="h-5 w-5" />
						{user.username}
						<ChevronDown styles="h-5 w-5" />
					</MenuButton>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<MenuItems
							class=" absolute right-0 origin-top-right w-80 desktop:w-64 bg-slate-50 shadow-lg ring-1 ring-primary-400
						 focus:outline-none rounded"
						>
							<div class="hover:bg-slate-50 border-b-[1px] px-3 py-1 m-2 rounded-md">
								<MenuItem let:active class="no-underline">
									<button
										class="my-1 desktop:my-0 bg-transparent group border-0 flex flex-col items-start
								 		w-full px-2 text-lg text-start text-slate-600"
									>
										<span class="">{user.username}</span>
										{user.email}
									</button>
								</MenuItem>
							</div>
							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem href="/apps/github/connect" sveltekit:prefetch class="no-underline">
									<button
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex justify-start space-x-2 items-center
										 border-0 w-full px-2 text-lg text-center font-normal"
									>
										<GithubIcon styles="text-slate-700" />
										<span>Connect Github</span>
									</button>
								</MenuItem>
							</div>
							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem href="/u" sveltekit:prefetch class="no-underline">
									<button
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center
										 border-0 w-full px-2 text-lg text-center font-normal "
									>
										<ProfileIcon styles="text-slate-700" />
										<span>View Profile</span>
									</button>
								</MenuItem>
							</div>

							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem href="/settings" sveltekit:prefetch class="no-underline">
									<button
										on:click={() => navigateAround('/settings')}
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center 
										border-0 w-full px-2 text-lg text-center font-normal "
									>
										<SettingsIcon styles="text-slate-700" />
										<span>Settings</span>
									</button>
								</MenuItem>
							</div>
							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem href="" class="no-underline">
									<button
										on:click={toggleModal}
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center 
										border-0 w-full px-2 text-lg text-center font-normal "
									>
										<UserPlusIcon styles="text-slate-700" />
										<span>Invite Colleagues</span>
									</button>
								</MenuItem>
							</div>
							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem class="no-underline">
									<button
										on:click={() => navigateAround('/faq')}
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center 
										border-0 w-full px-2 text-lg text-center font-normal "
									>
										<QuestionMarkIcon styles="text-slate-700" />
										<span>Help</span>
									</button>
								</MenuItem>
							</div>

							<div class="h-full hover:bg-primary-50 py-1 px-3 m-2 rounded-md">
								<MenuItem class="no-underline">
									<button
										type="submit"
										class="text-primary-500 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center 
										border-0 w-full px-2 text-lg text-center font-normal"
									>
										<SignOutIcon styles="text-slate-700" />
										<span>Sign Out</span>
									</button>
								</MenuItem>
							</div>
						</MenuItems>
					</Transition>
				</Menu>
				{#if showModal}
					<Modal>
						<Invite handleModal={toggleModal} />
					</Modal>
				{/if}
			</div>
		</div>
	</div>
{/if}
