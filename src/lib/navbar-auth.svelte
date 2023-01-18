<script lang="ts">
	import { goto } from '$app/navigation';
	import Autocomplete from './autocomplete.svelte';
	import type { User } from '$apis/auth';
	import { DropDown } from '$lib/components';
	import { RegistryBackend } from '$apis/registry';
	import Logo from './components/logo.svelte';

	export let user: User;

	let showMenu = true;

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
	<header class="py-2 border-b-2 border-slate-200 sticky top-0 bg-white z-40">
		<nav class="uw:max-w-[70vw] max-w-[100vw]  px-16 mx-auto">
			<div class="w-full px-6 mx-auto half:px-1 uw:px-12">
				<div class="flex justify-between w-full md:justify-between md:items-center">
					<div
						on:click={checkUserAuth}
						on:keypress={checkUserAuth}
						class="cursor-pointer flex-1 flex items-center half:ml-5"
					>
						<Logo type='dark'/>
					</div>

					<div class="flex-[2] pt-2 mx-10 justify-center items-center flex md:block half:hidden">
						<Autocomplete onAutoComplete={handleAutoComplete} />
					</div>

					<div class="items-center md:flex flex-[3] justify-end sm:flex half:flex">
						<div
							class="flex flex-col gap-8 text-lg font-semibold tracking-wide justify-center items-center md:flex-row half:mt-0 pl-10"
						>
							<a
								sveltekit:prefetch
								href="/search"
								class="text-primary-500 hover:scale-110 transform duration-500 font-normal"
							>
								Explore
							</a>
							<a
								href="/repositories"
								sveltekit:prefetch
								class="text-primary-500 hover:scale-110 transform duration-500 font-normal"
							>
								Repositories
							</a>
							<a
								sveltekit:prefetch
								href="/faq"
								class="text-primary-500 hover:scale-110 transform duration-500 font-normal"
							>
								FAQ
							</a>
							<DropDown {user} {closeMenu} />
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
{/if}
