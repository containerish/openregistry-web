<script lang="ts">
	import Register from './pages/register.svelte';
	import { setContext } from 'svelte';

	let showRegisterForm = false;
	let isLoading = false;

	function toggleRegisterForm() {
		showRegisterForm = !showRegisterForm
	}

	const onClickRegister = () => {
		console.log('clicked me')
		isLoading = true
		setTimeout(() => {
			toggleRegisterForm()
			isLoading = false
		}, 3000)
	}

	setContext('onClickRegister', onClickRegister)

</script>

<main>

<nav class="dark:bg-gray-800 mx-10">
	<div class="container px-6 py-3 mx-auto">
		<div class="flex flex-col md:flex-row md:justify-between md:items-center">
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<img class="w-[2500px] h-full lg:max-w-4xl" src="/logo.svg" alt="Catalogue-pana.svg">

					<!-- Search input on desktop screen -->
					<div class="hidden mx-10 lg:block">
					</div>
				</div>

				<!-- Mobile menu button -->
				<div class="flex md:hidden">
					<button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
						<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
							<path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
			<div class="items-center md:flex">
				<div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
					<a class="my-1 font-poppins text-md leading-5 text-[#241d19] duration-500 transform dark:text-gray-900 md:mx-4 md:my-0" href="#">Blog</a>
					<a class="my-1 text-md leading-5 font-poppins text-[#241d19] duration-500 transform dark:text-gray-200 md:mx-4 md:my-0" href="#">About</a>
					<a class="my-1 text-md font-poppins leading-5 text-[#241d19] duration-500 transform dark:text-gray-200 md:mx-4 md:my-0" href="#">Github</a>
				</div>

				<div class="flex items-center py-2 -mx-1 md:mx-0">
					<button class="w-32 tracking-wider ml-4 btn items-center px-4 py-2 opacity-80 font-normal leading-6 text-md shadow rounded-md text-gray-50 bg-gray-100 transition ease-in-out duration-150">Sign In</button>
				</div>

				<!-- Search input on mobile screen -->
				<div class="mt-3 md:hidden">
					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
								<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</span>

						<input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search">
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>


<div class="container px-6 py-60 mx-auto">
	<div class="items-center lg:flex">

		<div class="w-full relative min-w-50 z-50">
			<div class="2xl:max-w-2xl mt-20">
				<h2 class="font-poppins text-left font-bold text-7xl">A Decentralised Container Registry</h2>
				<p class="font-poppins text-left text-gray-700 text-xl mt-4 mb-20"> Store, Download, and Share your container images with decentralized Container Registry</p>

				{#if showRegisterForm}
					<div class="flex">
						<Register {isLoading} />
					</div>
				{/if}

				{#if !showRegisterForm}
				<a on:click={toggleRegisterForm} class="px-3 button float-left py-5 text-lg font-medium leading-5 text-center text-gray-50 transition-colors duration-200 transform bg-black rounded-xl md:w-auto no-underline" href="#">Register For Beta</a>
				{/if}
			</div>
		</div>


		<div class="flex right-36 items-center relative justify-center z-0 mr-20 w-full lg:mt-0 lg:w-1/2">
			<img class="h-full lg:max-w-4xl" src="/hero.svg" alt="OpenRegistry-dev.svg">
		</div>


	</div>
</div>


</main>

<style>
	.scroll-hidden::-webkit-scrollbar {
		height: 0px;
		background: transparent; /* make scrollbar transparent */
	}

	.btn {
		background-color: #55443a;
		border: none;
	}

	.button {
		width: 35%;
		background-color: #241d19;
		color: #FFFFFF;
		border-radius: 8px;
		opacity: 0.8;
	}

	.min-w-50 {
		min-width: 50vw;
	}

	.navbar  {
		height: 5%;
		background-color: #eee;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
