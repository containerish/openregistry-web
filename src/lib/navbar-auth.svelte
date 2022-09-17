<script lang="ts">
	import { userStore as session } from '$lib/userStore';
	import { goto } from '$app/navigation';
	import ButtonOutlined from './button-outlined.svelte';
	import ArrowDown from './icons/arrow-down.svelte';
	import Autocomplete from './autocomplete.svelte';
	import UserIcon from './icons/user.svelte';
	import type { User } from '../apis/auth';
	import Dropdown from '../components/dropdown.svelte';
	import { RegistryBackend } from '../apis/registry';

	export let user: User;

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

	const checkUserAuth = () => {
		if (user) {
			goto('/repositories');
			return;
		}
		goto('/');
	};
</script>

{#if user}
	<header class="bg-gradient-to-r from-brown-50 to-brown-500 py-4}">
		<nav class="uw:max-w-[70vw] max-w-[100vw] py-2 px-16 mx-auto">
			<div class="container w-full px-6 mx-auto half:px-1 uw:px-12">
				<div class="flex justify-between w-full md:justify-between md:items-center">
					<div on:click={checkUserAuth} class="cursor-pointer flex-1 flex items-center half:ml-5">
						<picture class="md:w-44">
							<img class="h-full w-full" src="/logo.svg" alt="openeregistry" />
						</picture>
					</div>

					<div class="flex-[2] pt-2 mx-10 justify-center items-center flex md:block half:hidden">
						<Autocomplete onAutoComplete={handleAutoComplete} />
					</div>

					<div class="items-center md:flex flex-[3] justify-end sm:flex half:flex">
						<div class="flex flex-col justify-center items-center md:flex-row half:mt-0 pl-10">
							<a
								sveltekit:prefetch
								href="/search"
								class="my-1 text-lg leading-5 font-lato font-semibold text-brown-800 transition-colors duration-200 bg-inherit
			border-none transform hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								Explore
							</a>
							<a
								href="/repositories"
								sveltekit:prefetch
								class="my-1 mx-0 px-0 text-lg font-semibold font-lato leading-5 text-brown-800 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								Repositories
							</a>
							<a
								sveltekit:prefetch
								href="/faq"
								class="my-1 text-lg font-semibold px-0 leading-5 text-brown-800 border-2 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
							>
								FAQ
							</a>
							<Dropdown {user} {closeMenu}>
								<div class="">
									<ButtonOutlined onClick={toggleMenu}>
										<UserIcon styles="h-4 w-4 lg:h-4 lg:w-6 " />
										<span class="font-semibold text-sm">{user.username}</span>
										<ArrowDown />
									</ButtonOutlined>
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
{/if}
