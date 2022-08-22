<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Card from '$lib/card.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import { goto } from '$app/navigation';

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

<Card
	styles="min-h-[93vh] w-full
	half:flex-col-reverse half:gap-2 apple:gap-56 uw:gap-56 lg:gap-20 desktop:gap-40 laptop:flex-col-reverse
	ipad:flex-col-reverse laptop:gap-0 from-grad-100 bg-gradient-to-br via-grad-400 to-grad-900"
>
	<div
		class="left flex flex-col w-full half:items-start half:justify-start desktop:w-full lg:w-3/4
	apple:w-full half:w-full half:z-0 z-30 laptop:-mt-36 laptop:-ml-20 ipad:-ml-56 ipad:-mt-48 ipad:w-full"
	>
		<div class="w-3/4 desktop:ml-28 z-35">
			<h1
				class="text-left text-6xl apple:font-bold uw:font-bold font-semibold font-poppins
				break-words whitespace-nowrap half:self-end half:text-4xl half:font-bold apple:text-7xl uw:text-8xl"
			>
				A Decentralised
			</h1>
			<h2
				class="text-6xl font-semibold font-poppins break-words whitespace-nowrap
				half:text-4xl half:font-bold apple:text-7xl uw:text-8xl"
			>
				Container Registry
			</h2>
			<div class="w-full">
				<p
					class="font-poppins text-left text-brown-900 break-words half:text-[19px] half:font-normal
					half:pr-16 text-xl mt-4 mb-20 apple:text-2xl uw:text-3xl"
				>
					Store, Download, and Share your container images with decentralized OpenRegistry
				</p>
			</div>
		</div>

		<div class="h-full p-8 w-full desktop:ml-20 half:-ml-6 half:-mt-12">
			<form
				on:submit|preventDefault={() => goto(`/search?query=${query}`)}
				class="flex half:flex-col half:items-start justify-end gap-5 items-center"
				action=""
			>
				<div>
					<input
						bind:value={query}
						name="search"
						type="text"
						placeholder="Search container images"
						class="placeholder-gray-500 form-control block w-96 half:w-80 px-3 py-3.5 half:py-3 text-base font-normal
						text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0
						focus:text-gray-700 border rounded-md focus:border-brown-100 focus:ring-opacity-40
						focus:outline-none focus:ring focus:ring-brown-800"
					/>
				</div>
				<div class="flex w-full justify-start mt-2.5">
					<ButtonSolid
					on:click={() => goto(`/search?query=${query}`)}
					>Search</ButtonSolid>
				</div>
			</form>
		</div>
	</div>
	<div class="right z-0 w-full relative desktop:w-3/5 apple:w-4/5 uw:w-3/4 min-w-max half:mt-56">
		<picture>
			<img
				class="h-full half:w-96 half:ml-32 half:-mt-56 half:mb-4 apple:w-3/4
			laptop:w-3/4 laptop:ml-10 laptop:pl-24 uw:w-3/4 w-full"
				src="/hero.svg"
				alt="OpenRegistry-Hero"
			/>
		</picture>
	</div>
</Card>

<style>
	.right {
		width: 66.4%;
		z-index: 0;
	}

	.left {
		padding: 0 5%;
		z-index: 50;
		margin-right: -40%;
		/* overflow-x: hidden; */
		width: 33.3%;
		min-height: 600px;
		display: flex;
		align-items: start;
		justify-content: center;
	}
</style>
