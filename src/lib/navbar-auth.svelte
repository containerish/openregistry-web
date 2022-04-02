<script lang="ts">
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import Autocomplete from './autocomplete.svelte';
	import UserIcon from './icons/user.svelte';
	import type { User } from '../apis/auth';
	import Dropdown from '../components/dropdown.svelte';
	import { RegistryBackend } from '../apis/registry';

	let u: User;
	let sessionOk: boolean = false;
	// @ts-ignore
	session.subscribe(async ({ authenticated, user }) => {
		u = user;
		sessionOk = authenticated;
	});

	let showMenu = false;
	const toggleMenu = () => {
		showMenu = !showMenu;
	};

	const registry = new RegistryBackend();

	const handleAutoComplete = async (query: string) => {
		return await registry.SearchRepositories(query);
	};

	const closeMenu = () => {
		showMenu = false;
	};

	const handleShowMenu = () => {
		showMenu = !showMenu;
	};

	const navigateAround = async (path: string) => {
		await goto(path);
	};
</script>

{#if sessionOk}
	<header class="bg-gradient-to-r from-brown-50 to-brown-500 py-4}">
		<nav class="uw:max-w-[70vw] max-w-[100vw] py-2 px-16 mx-auto">
			<div class="container w-full px-6 mx-auto half:px-1 uw:px-12">
				<div class="flex justify-between w-full md:justify-between md:items-center">
					<div class="cursor-pointer flex-1 flex items-center half:ml-5">
						<picture class="md:w-44" on:click={() => goto('/')}>
							<img class="h-full w-full" src="/logo.svg" alt="openeregistry" />
						</picture>
					</div>

					<div class="flex-[2] pt-2 mx-10 justify-center items-center flex md:block half:hidden">
						<Autocomplete onAutoComplete={handleAutoComplete} />
					</div>

					<div class="items-center md:flex flex-[3] justify-end sm:flex half:flex">
						<div class="flex flex-col justify-center items-center md:flex-row half:mt-0 pl-10">
							<button
								on:click={() => navigateAround('/search')}
								class="my-1 text-lg leading-5 font-lato font-semibold text-brown-800 transition-colors duration-200 bg-inherit
			border-none transform hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								Explore
							</button>
							<button
								on:click={() => navigateAround('/repositories')}
								class="my-1 mx-0 px-0 text-lg font-semibold font-lato leading-5 text-brown-800 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								Repositories
							</button>
							<button
								on:click={() => navigateAround('/faq')}
								class="my-1 text-lg font-semibold px-0 leading-5 text-brown-800 border-2 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								FAQ
							</button>
							<Dropdown user={u} show={showMenu} {closeMenu} {handleShowMenu}>
								<button
									on:click={toggleMenu}
									class="flex items-center px-4 w-full half:px-2 ml-8 half:ml-4 mt-1.5 font-lato font-semibold border-brown-800
					hover:border-brown-100 border-2 tracking-wide text-brown-800 capitalize transition-colors duration-200
					transform bg-inherit rounded-md hover:bg-brown-50 focus:outline-none focus:bg-cream-50"
								>
									<UserIcon styles="h-4 w-4 lg:h-4 lg:w-6 " />
									<span class="font-semibold text-sm">{u.username}</span>
									<svg
										class="w-4 h-4 lg:h-6 lg:w-6 mx-1 half:w-4 half:h-4 half:mx-0"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
{/if}
