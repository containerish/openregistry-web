<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Card from '$lib/card.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import IconButton from '$lib/icon-button.svelte';
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

<Card styles="w-full flex flex-col px-0">
	<div
		class="flex flex-col gap-24 desktop:gap-8 half:gap-4 w-full desktop:w-full lg:w-full half:w-3/5
		justify-center items-center laptop:w-full apple:w-full ipad:w-full"
	>
		<picture class="w-full">
			<source media="(min-width: 650px)" srcset="./hero1.svg" />
			<source media="(min-width: 465px)" srcset="./small-hero.svg" />
			<img alt="hero svg" src="./hero.svg" />
		</picture>

		<div class="text-primary-600 half:w-4/6 laptop:w-3/5">
			<div class="text-center">
				<span
					class="text-5xl uw:font-bold font-semibold 
				break-words half:text-3xl half:font-semibold apple:text-7xl uw:text-7xl"
				>
					A Decentralised Container Registry
				</span>
			</div>

			<div class="w-full">
				<p
					class="text-center text-primary-600 break-words text-lg half:text-md mt-5 
					uw:text-2xl apple:text-2xl"
				>
					OpenRegistry is an open source container registry developed for people by people.
					<!-- Store, Download, and Share your container images with decentralized OpenRegistry -->
				</p>
				<p
					class="text-center text-primary-600 break-words text-lg half:text-md 
					uw:text-2xl apple:text-2xl"
				>
					Backed by amazing distributed communities, OpenRegistry offers all the features of a
					container registry
				</p>
				<p
					class="text-center text-primary-600 break-words text-lg half:text-md 
					uw:text-2xl apple:text-2xl"
				>
					along with amazing additions like automated build system
				</p>
			</div>
		</div>

		<div class="h-full pb-8 desktop:ml-20">
			<form
				on:submit|preventDefault={() => goto(`/search?query=${query}`)}
				class="flex half:flex-col justify-center gap-5 items-center"
				action=""
			>
				<div>
					<input
						bind:value={query}
						name="search"
						type="text"
						placeholder="Search container images"
						class="placeholder-gray-500 form-control block w-96 half:w-80 px-3 py-2 apple:py-4 text-base font-normal
						text-gray-700 bg-white bg-clip-padding border-2 transition ease-in-out m-0
						focus:text-gray-700 rounded-md focus:border-primary-500 focus:ring-opacity-40
						focus:outline-none focus:ring focus:ring-priamry-400"
					/>
				</div>
				<div class="flex w-full justify-start half:justify-center mt-2">
					<ButtonSolid on:click={() => goto(`/search?query=${query}`)}>Search</ButtonSolid>
				</div>
			</form>
		</div>
	</div>

	<div
		class="grid grid-cols-5 laptop:grid-cols-3 half:grid-cols-2 gap-10 half:gap-2 laptop:gap-8
		py-20 half:py-0 laptop:py-0 laptop:pb-4 half:pb-4 half:w-1/2 laptop:w-3/5 laptop:min-w-[600px] half:place-items-center half:px-10"
	>
		<div class="col-span-5 laptop:col-span-3 half:col-span-2">
			<span
				class="text-center flex justify-center items-center text-primary-600 
				text-lg apple:text-xl half:text-sm half:break-words half:invisible laptop:invisible"
			>
				Browse, Pull, Push and Share 100s of container images by open source projects, software
				vendors and communities.
			</span>
			<div
				class="flex flex-col text-center items-center justify-center invisible 
				half:visible laptop:visible text-primary-600"
			>
				<span> Browse, Pull, Push and Share 100s of container </span>
				<span> images by open source projects, software vendors and communities.</span>
			</div>
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-[#081c45] border

			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<StorjIcon />
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-[#031828] border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./ipfs-logo.png" width="165px" /></div>
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center border border-pr
			imary-800 rounded gap-3 bg-stone-700 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<IexecIcon />
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-[#ce4748] border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<AkashIcon />
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-primary-600 b
			order border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./solanaLogo.png" width="120px" /></div>
		</div>

		<div
			class="border desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center border-primary-600 rounded 
			bg-white transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nginx" src="./nginx.png" width="100px" /></div>
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nginx" src="./busybox1.png" width="50px" /></div>
			<span class="text-lg font-semibold">BusyBox</span>
		</div>
		<div
			class="border desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center border-primary-600 rounded 
			bg-white transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl gap-2"
		>
			<div><img alt="nginx" src="./library-alpine-logo.png" width="50px" /></div>
			<span class="text-blue-800 font-semibold text-xl">Alpine</span>
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><MongoIcon /></div>
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./Redis-Logo.png" width="120px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider" />
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./nodejs.png" width="30px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider">node</span>
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./ubuntu-logo32.png" width="30px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider">ubuntu</span>
		</div>
		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./traefik-logo.png" width="30px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider">traefik</span>
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./python-logo-only.png" width="30px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider">python</span>
		</div>

		<div
			class="desktop:w-44 laptop:w-48 half:w-40 half:h-20 h-24 flex justify-center items-center bg-white border 
			border-primary-800 rounded gap-3 transition ease-in-out delay-100 hover:shadow-primary-200 hover:shadow-2xl"
		>
			<div><img alt="nodejs" src="./library-httpd-logo.png" width="50px" /></div>
			<span class="text-lg font-semibold text-primary-600 tracking-wider">httpd</span>
		</div>
	</div>
</Card>
