<script lang="ts">
	import Dropdown from '../components/dropdown.svelte';
	import User from './icons/user.svelte';
	import { JWT, UserInfo } from '../apis/auth';
	import { onMount } from 'svelte';

	var userInfo: JWT;

	let showMenu = false;
	const toggleMenu = () => {
		showMenu = !showMenu;
	};

	onMount(() => {
		userInfo = UserInfo();
		console.log('user: ', userInfo);
	});
</script>

<div class="items-center md:flex">
	<div class="flex flex-col justify-center items-center md:flex-row md:mt-0 md:ml-10 pl-10">
		<button
			class="my-1 text-lg leading-5 font-lato font-semibold text-brown-800 transition-colors duration-200 bg-inherit border-none transform dark:text-gray-200 hover:text-brown-800 dark:hover:text-brown-400 hover:no-underline md:mx-4 md:my-0"
		>
			Explore
		</button>
		<button
			class="my-1 mx-0 px-0 text-lg font-semibold font-lato leading-5 text-brown-800 transition-colors duration-200 transform bg-inherit border-none dark:text-gray-200 hover:text-brown-800 dark:hover:text-brown-400 hover:no-underline md:mx-4 md:my-0"
		>
			Repositories
		</button>
		<button
			on:click={() => (window.location.href = '/faq')}
			class="my-1 text-lg font-semibold px-0 leading-5 text-brown-800 border-2 transition-colors duration-200 transform bg-inherit border-none dark:text-gray-200 hover:text-brown-800 dark:hover:text-brown-400 hover:no-underline md:mx-4 md:my-0"
		>
			FAQ
		</button>

		{#if userInfo && userInfo.UserPayload}
			<Dropdown {userInfo} show={showMenu}>
				<button
					on:click={toggleMenu}
					class="flex items-center dark:text-gray-200 px-4 ml-10 mt-1.5 font-lato font-semibold border-brown-800 hover:border-brown-100 border-2 tracking-wide text-brown-800 capitalize transition-colors duration-200 transform bg-inherit rounded-md hover:bg-brown-50 dark:hover:bg-brown-800 focus:outline-none focus:ring focus:ring-brown-300 focus:ring-opacity-80"
				>
					<User />
					<span>{userInfo.UserPayload.username}</span>
					<svg
						class="w-5 h-5 mx-1"
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
		{/if}
	</div>
</div>

<!-- Require css -->
<style>
	.scroll-hidden::-webkit-scrollbar {
		height: 0px;
		background: transparent; /* make scrollbar transparent */
	}
</style>
