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

	const handleSignOutSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					// await update();
					goto('/repositories');
					break;
				case 'failure':
					// handle error here
					await applyAction(result);
					await update();
					break;
				case 'error':
					// handle server side error here
					await update();
					await applyAction(result);
				default:
					await update();
			}
		};
	};
</script>

{#if user}
	<div class="min-w-max text-right z-50">
		<div class="relative inline-block text-left">
			<div>
				<Menu>
					<MenuButton
						class="mt-1.5 inline-flex justify-center items-center w-full px-6 py-2 desktop:px-4 desktop:py-1.5 font-medium desktop:font-normal text-brown-900 capitalize border-2
					 border-brown-800 bg-transparent rounded-md hover:bg-brown-700 hover:text-white space-x-2 tracking-wide"
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
							class="absolute right-0 origin-top-right w-72 desktop:w-64 bg-white shadow-lg ring-1 ring-brown-900 
						ring-opacity-10 focus:outline-none rounded-md"
						>
							<div class="hover:bg-brown-50 border-b-[1px] px-3 py-1 m-2 rounded-md">
								<MenuItem let:active class="no-underline">
									<button
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group border-0 flex flex-col items-start
								 		w-full px-2 text-sm text-start"
									>
										<span class="text-lg text-brown-900">{user.username}</span>
										{user.email}
									</button>
								</MenuItem>
							</div>
							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<MenuItem href="/apps/github/connect" sveltekit:prefetch class="no-underline">
									<button
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex justify-start space-x-2 items-center
										 border-0 w-full px-2 text-sm text-center hover:bg-brown-50"
									>
										<GithubIcon />
										<span>Connect Github</span>
									</button>
								</MenuItem>
							</div>
							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<MenuItem href="/u" sveltekit:prefetch class="no-underline">
									<button
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center
										 border-0 w-full px-2 text-sm text-center hover:bg-brown-50"
									>
										<ProfileIcon />
										<span>View Profile</span>
									</button>
								</MenuItem>
							</div>

							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<MenuItem href="/settings" sveltekit:prefetch class="no-underline">
									<button
										on:click={() => navigateAround('/settings')}
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center border-0 w-full px-2 text-sm text-center hover:bg-brown-50"
									>
										<SettingsIcon />
										<span>Settings</span>
									</button>
								</MenuItem>
							</div>
							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<MenuItem href="" class="no-underline">
									<button
										on:click={toggleModal}
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center border-0 w-full px-2 text-sm text-center hover:bg-brown-50"
									>
										<UserPlusIcon />
										<span>Invite Colleagues</span>
									</button>
								</MenuItem>
							</div>
							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<MenuItem class="no-underline">
									<button
										on:click={() => navigateAround('/faq')}
										class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center border-0 w-full px-2 text-sm text-center hover:bg-brown-50"
									>
										<QuestionMarkIcon />
										<span>Help</span>
									</button>
								</MenuItem>
							</div>

							<div class="hover:bg-brown-50 h-full py-1 px-3 m-2 rounded-md">
								<form method="POST" action="?/signout" use:enhance={handleSignOutSubmit}>
									<MenuItem class="no-underline">
										<button
											type="submit"
											class="text-brown-800 my-1 desktop:my-0 bg-transparent group flex space-x-2 justify-start items-center border-0 w-full px-2 text-sm text-center"
										>
											<SignOutIcon />
											<span>Sign Out</span>
										</button>
									</MenuItem>
								</form>
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
