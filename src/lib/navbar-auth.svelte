<script context="module">
	export async function load({ error, status, session }) {
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}

		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	import Dropdown from '../components/dropdown.svelte';
	import User from './icons/user.svelte';
	export let user;

	let showMenu = false;
	const toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<div class="items-center md:flex sm:flex half:flex">
	<div class="flex flex-col justify-center items-center md:flex-row half:mt-0 pl-10">
		<button
			on:click={() => (location.href = '/search')}
			class="my-1 text-lg leading-5 font-lato font-semibold text-brown-800 transition-colors duration-200 bg-inherit
			border-none transform hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
		>
			Explore
		</button>
		<button
			on:click={() => (window.location.href = '/repositories')}
			class="my-1 mx-0 px-0 text-lg font-semibold font-lato leading-5 text-brown-800 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
		>
			Repositories
		</button>
		<button
			on:click={() => (window.location.href = '/faq')}
			class="my-1 text-lg font-semibold px-0 leading-5 text-brown-800 border-2 transition-colors duration-200
			transform bg-inherit border-none hover:text-brown-800 hover:no-underline md:mx-6 md:my-0 half:mx-2"
		>
			FAQ
		</button>
		<Dropdown {user} show={showMenu}>
			<button
				on:click={toggleMenu}
				class="flex items-center px-4 half:px-2 ml-8 half:ml-4 mt-1.5 font-lato font-semibold border-brown-800
					hover:border-brown-100 border-2 tracking-wide text-brown-800 capitalize transition-colors duration-200
					transform bg-inherit rounded-md hover:bg-brown-50 focus:outline-none focus:bg-cream-50"
			>
				<User styles="h-6 w-6" />
				<span>{user.username}</span>
				<svg
					class="w-5 h-5 mx-1 half:w-4 half:h-4 half:mx-0"
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
