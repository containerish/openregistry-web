<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Card from '$lib/card.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { RepoBox } from '$lib/components';
	import { goto } from '$app/navigation';
	import { MongoIcon } from '$lib/icons';

	let showRegisterForm = false;
	let isLoading = false;
	function toggleRegisterForm() {
		showRegisterForm = !showRegisterForm;
	}

	const onClickRegister = () => {
		isLoading = true;
		setTimeout(() => {
			toggleRegisterForm();
			isLoading = false;
		}, 3000);
	};

	// 1280px * 1394px
	// 3840 px *  1394 px
	let resolution;
	const getResolution = () => {
		const isIphone = navigator.userAgent.includes('iPhone');
		return isIphone ? 'iPhone' : 'noit';
	};

	onMount(() => {
		resolution = getResolution();
	});

	let query = '';

	setContext('onClickRegister', onClickRegister);
</script>

<Card id="top" class="w-full flex flex-col px-0 bg-white">
	<div class="flex flex-col items-center justify-center gap-9 w-full">
		<picture class="w-full">
			<source media="(min-width: 2000px)" srcset="./big-hero-new.svg" />
			<source media="(min-width: 650px)" srcset="./hero-101.svg" />
			<source media="(min-width: 360px)" srcset="./small-hero.svg" />
			<img alt="hero svg" class="w-full" src="./hero.svg" />
		</picture>

		<div
			class="flex max-w-[1391px] flex-col items-center text-center text-primary-600 w-full px-6 md:px-16"
		>
			<span class="text-3xl font-semibold md:text-5xl lg:font-bold lg:text-6xl">
				A Decentralised Container Registry
			</span>

			<p class="mt-5 break-words text-base text-primary-600 md:text-xl">
				OpenRegistry is an open source container registry developed for people by people. Backed by
				amazing distributed communities, OpenRegistry offers all the features of a container
				registry along with awesome additions like automated build system
			</p>
		</div>

		<div class="h-full py-9">
			<form
				on:submit|preventDefault={() => goto(`/search?q=${query}`)}
				class="flex flex-col items-center justify-center gap-5 md:flex-row"
			>
				<div>
					<input
						aria-label="search repositories"
						aria-hidden="true"
						bind:value={query}
						name="search"
						type="text"
						placeholder="Search container images"
						class="form-control focus:ring-priamry-400 ease-in-outfocus:border-primary-500 m-0 block w-80
						rounded-md border-2 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700
						placeholder-gray-500 transition focus:text-gray-700 focus:outline-none focus:ring
						focus:ring-opacity-40 md:w-96 lg:py-4"
					/>
				</div>
				<div class="mt-2 flex w-full justify-center md:justify-start">
					<ButtonSolid on:click={() => goto(`/search?q=${query}`)}>Search</ButtonSolid>
				</div>
			</form>
		</div>
	</div>

	<div class="flex flex-col justify-center items-center gap-9 pt-10 pb-20">
		<div
			class="flex flex-col items-center justify-center text-center text-base text-primary-600 lg:text-lg px-9"
		>
			<span>
				Browse, Pull, Push and Share 100s of container images by open source projects, software
				vendors and communities.
			</span>
		</div>

		<div
			class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-9 max-w-6xl"
			aria-label="popular repositories"
		>
			<RepoBox class="bg-[#081c45]" href="#">
				<img src="./storj.svg" alt="storj" />
			</RepoBox>

			<RepoBox href="#" class="bg-stone-700">
				<img src="./iexec.svg" alt="iexec" />
			</RepoBox>

			<RepoBox class="bg-[#062b3f]">
				<div class="h-full w-full flex justify-center items-center">
					<img src="./ipfs.svg" alt="ipfs" />
				</div>
			</RepoBox>

			<RepoBox href="#" class="bg-[#ce4748]">
				<img src="akash-logo.svg" alt="akash" />
			</RepoBox>

			<RepoBox href="#" class="bg-primary-600">
				<div><img alt="nodejs" src="./solanaLogo.png" width="120px" /></div>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nginx" src="./nginx.png" width="100px" /></div>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nginx" src="./busybox1.png" width="50px" /></div>
				<span class="text-lg font-semibold text-primary-700">BusyBox</span>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nginx" src="./library-alpine-logo.png" width="50px" /></div>
				<span class="text-xl font-semibold text-blue-800">Alpine</span>
			</RepoBox>

			<RepoBox href="#">
				<MongoIcon />
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./Redis-Logo.png" width="120px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600" />
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./nodejs.png" width="30px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600">node</span>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./ubuntu-logo32.png" width="30px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600">ubuntu</span>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./traefik-logo.png" width="30px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600">traefik</span>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./python-logo-only.png" width="30px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600">python</span>
			</RepoBox>

			<RepoBox href="#">
				<div><img alt="nodejs" src="./library-httpd-logo.png" width="50px" /></div>
				<span class="text-lg font-semibold tracking-wider text-primary-600">httpd</span>
			</RepoBox>
		</div>
	</div>
</Card>
