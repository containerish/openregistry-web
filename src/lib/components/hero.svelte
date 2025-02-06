<script lang="ts">
	import { setContext } from 'svelte';
	import Card from '$lib/card.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { RepoBox } from '$lib/components';
	import { goto } from '$app/navigation';
	import { MongoIcon } from '$lib/icons';

	let showRegisterForm = false;
	function toggleRegisterForm() {
		showRegisterForm = !showRegisterForm;
	}

	const onClickRegister = () => {
		setTimeout(() => {
			toggleRegisterForm();
		}, 3000);
	};

	let query = '';

	setContext('onClickRegister', onClickRegister);
</script>

<Card id="hero" class="flex w-full flex-col px-0">
	<div class="flex w-full flex-col items-center justify-center gap-9">
		<picture class="w-full">
			<source media="(min-width: 2000px)" srcset="/hero-big.webp" />
			<source media="(min-width: 650px)" srcset="/hero-clear.webp" />
			<source media="(min-width: 360px)" srcset="/hero-small.webp" />
			<img alt="hero svg" class="w-full" src="/hero-big.webp" />
		</picture>

		<div class="flex w-full max-w-[1391px] flex-col items-center px-6 text-center text-primary-600 md:px-16">
			<span class="text-3xl font-semibold md:text-4xl md:font-bold 2xl:text-6xl">
				A Decentralised Container Registry
			</span>

			<p class="mt-5 break-words text-base text-slate-700 lg:text-lg">
				OpenRegistry is an open source container registry developed for people by people. Backed by amazing
				distributed communities, OpenRegistry offers all the features of a container registry along with awesome
				additions like automated build system
			</p>
		</div>

		<div class="flex h-full w-full items-center justify-center py-9">
			<form
				on:submit|preventDefault={() => goto(`/search?q=${query}`)}
				class="mx-auto flex w-full flex-col items-center gap-3 lg:gap-6 md:flex-row lg:w-1/2"
			>
				<input
					aria-label="search repositories"
					bind:value={query}
					name="search"
					type="text"
					placeholder="Search container images"
					class="form-control focus:ring-priamry-400 ease-in-outfocus:border-primary-500 m-0 w-11/12
						rounded-lg border-2 bg-white bg-clip-padding px-3 py-3 text-base font-normal text-gray-700
						placeholder-gray-500 transition focus:text-gray-700 focus:outline-none focus:ring
						focus:ring-opacity-40 lg:w-2/3"
				/>

				<ButtonSolid on:click={() => goto(`/search?q=${query}`)}>Search</ButtonSolid>
			</form>
		</div>

		<div class="flex flex-col items-center justify-center gap-9 py-10">
			<div class="browse flex flex-col items-center justify-center px-9 text-center text-base text-slate-600">
				<span>
					Browse, Pull, Push and Share 100s of container images by open source projects, software vendors and
					communities.
				</span>
			</div>

			<div
				class=" browse grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-9"
				aria-label="popular repositories"
			>
				<RepoBox class="bg-[#081c45]" href="#">
					<img src="./storj.svg" alt="storj" width="110px" />
				</RepoBox>

				<RepoBox href="#" class="bg-stone-700">
					<img src="./iexec.svg" alt="iexec" width="110px" />
				</RepoBox>

				<RepoBox class="bg-[#062b3f]">
					<div class="flex h-full w-full items-center justify-center">
						<img src="./ipfs.svg" alt="ipfs" width="110px" />
					</div>
				</RepoBox>

				<RepoBox href="#" class="bg-[#ce4748]">
					<img src="akash-logo.svg" alt="akash" width="110px" />
				</RepoBox>

				<RepoBox href="#" class="bg-primary-600">
					<div><img alt="nodejs" src="./solanaLogo.png" width="110px" /></div>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nginx" src="./nginx.png" width="90px" /></div>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nginx" src="./busybox1.png" width="40px" /></div>
					<span class="ml-1 text-lg font-semibold text-primary-600">BusyBox</span>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nginx" src="./library-alpine-logo.png" width="40px" /></div>
					<span class="ml-1 text-xl font-semibold text-blue-800">Alpine</span>
				</RepoBox>

				<RepoBox href="#">
					<MongoIcon />
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./Redis-Logo.png" width="100px" /></div>
					<span class="text-lg font-semibold tracking-wider text-primary-600" />
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./nodejs.png" width="30px" /></div>
					<span class="ml-1 text-lg font-semibold tracking-wider text-primary-600">node</span>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./ubuntu-logo32.png" width="30px" /></div>
					<span class="ml-1 text-lg font-semibold tracking-wider text-primary-600">ubuntu</span>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./traefik-logo.png" width="30px" /></div>
					<span class="ml-1 text-lg font-semibold tracking-wider text-primary-600">traefik</span>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./python-logo-only.png" width="30px" /></div>
					<span class="ml-1 text-lg font-semibold tracking-wider text-primary-600">python</span>
				</RepoBox>

				<RepoBox href="#">
					<div><img alt="nodejs" src="./library-httpd-logo.png" width="50px" /></div>
					<span class="ml-1 text-lg font-semibold tracking-wider text-primary-600">httpd</span>
				</RepoBox>
			</div>
		</div>
	</div>
</Card>
