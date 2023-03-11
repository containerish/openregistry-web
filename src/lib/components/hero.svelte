<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Card from '$lib/card.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { RepoBox } from '$lib/components';
	import { goto } from '$app/navigation';
	import { MongoIcon, StorjIcon, IexecIcon, AkashIcon } from '$lib/icons';

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

<Card id="top" styles="w-full flex flex-col px-0">
	<div class="flex flex-col items-center justify-center gap-4 md:w-full md:gap-8 xl:gap-24">
		<picture class="w-full">
			<source media="(min-width: 2000px)" srcset="./big-hero.svg" />
			<source media="(min-width: 650px)" srcset="./hero1.svg" />
			<source media="(min-width: 390px)" srcset="./small-hero.svg" />
			<img alt="hero svg" class="w-full" src="./hero.svg" />
		</picture>

		<div class="flex max-w-[1391px] flex-col items-center text-center text-primary-600 w-3/5 sm:w-4/5 lg:w-full">
			<span class="text-3xl font-semibold md:text-5xl xl:font-bold 2xl:text-6xl">
				A Decentralised Container Registry
			</span>

			<p
				class="mt-5 break-words text-base text-primary-600 md:text-xl 
					2xl:text-2xl"
			>
				OpenRegistry is an open source container registry developed for people by people. Backed by
				amazing distributed communities, OpenRegistry offers all the features of a container
				registry along with awesome additions like automated build system
			</p>
		</div>

		<div class="h-full pb-8 lg:ml-20">
			<form
				on:submit|preventDefault={() => goto(`/search?q=${query}`)}
				class="flex flex-col items-center justify-center gap-5 md:flex-row"
			>
				<div>
					<input
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

	<div
		class="grid w-2/3 lg:w-full max-w-[1100px] grid-cols-2 place-items-center gap-2 py-10 px-4 md:w-3/5 md:min-w-[600px]
		md:grid-cols-3 lg:gap-8 lg:py-20 lg:grid-cols-5">
		<div class="col-span-2 pb-10 md:col-span-3 lg:col-span-5">
			<div
				class="flex flex-col items-center justify-center text-center 
				text-base text-primary-600 lg:text-lg"
			>
				<span> Browse, Pull, Push and Share 100s of container images by open source projects, software vendors 
				and communities.</span>
				
			</div>
		</div>
		<RepoBox styles="bg-[#081c45]" href="#">
			<StorjIcon />
		</RepoBox>

		<RepoBox>
			<div class="h-full w-full bg-cover" style="background-image:url(./ipfs-logo.png);">.</div>
		</RepoBox>

		<RepoBox href="#" styles="bg-stone-700">
			<IexecIcon />
		</RepoBox>
		<RepoBox href="#" styles="bg-[#ce4748]">
			<AkashIcon />
		</RepoBox>

		<RepoBox href="#" styles="bg-primary-600">
			<div><img alt="nodejs" src="./solanaLogo.png" width="120px" /></div>
		</RepoBox>

		<RepoBox href="#">
			<div><img alt="nginx" src="./nginx.png" width="100px" /></div>
		</RepoBox>

		<RepoBox href="#">
			<div><img alt="nginx" src="./busybox1.png" width="50px" /></div>
			<span class="text-lg font-semibold">BusyBox</span>
		</RepoBox>

		<RepoBox href="#">
			<div><img alt="nginx" src="./library-alpine-logo.png" width="50px" /></div>
			<span class="text-xl font-semibold text-blue-800">Alpine</span>
		</RepoBox>

		<RepoBox href="#">
			<div><MongoIcon /></div>
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
</Card>
