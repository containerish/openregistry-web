<script lang="ts">
	import { setContext } from 'svelte';

	import Register from '../components/register.svelte';
	import Card from '$lib/card.svelte';
	import Button from '$lib/button.svelte';

	let showRegisterForm = false;
	let isLoading = false;

	function toggleRegisterForm() {
		showRegisterForm = !showRegisterForm;
	}

	const onClickRegister = () => {
		console.log('clicked register');
		isLoading = true;
		setTimeout(() => {
			toggleRegisterForm();
			isLoading = false;
		}, 3000);
	};

	// 1280px * 1394px
	// 3840 px *  1394 px
	setContext('onClickRegister', onClickRegister);
</script>

<Card
	styles="min-h-[93vh] dark:bg-gradient-to-tl dark:from-brown-800 dark:to-brown-800 bg-gradient-to-br w-full from-grad-100 via-grad-400 to-grad-900 apple:gap-56 uw:gap-56 lg:gap-20 desktop:gap-40"
>
	<div class="left flex flex-col w-full desktop:w-full lg:w-3/4 apple:w-full px-10 z-30">
		<div class="w-3/4">
			<h1
				class="dark:text-gray-50 text-left text-6xl apple:font-bold uw:font-bold font-semibold font-poppins break-words whitespace-nowrap apple:text-7xl uw:text-6xl"
			>
				A Decentralised
			</h1>
			<h2
				class="dark:text-gray-50 text-6xl font-semibold font-poppins break-words whitespace-nowrap apple:text-7xl uw:text-6xl"
			>
				Container Registry
			</h2>
			<div class="w-3/4">
				<p
					class="font-poppins text-left text-gray-700 break-words dark:text-gray-200 text-xl mt-4 mb-20 apple:text-2xl"
				>
					Store, Download, and Share your container images with decentralized Container Registry
				</p>
			</div>
		</div>

		{#if showRegisterForm}
			<div class="flex">
				<Register {isLoading} />
			</div>
		{/if}

		{#if !showRegisterForm}
			<Button
				onClick={toggleRegisterForm}
				styles="px-8 opacity-75 float-left py-5 text-lg font-medium leading-5 text-center text-gray-50 transition-colors duration-200 transform bg-black rounded-md md:w-auto no-underline"
				label="Register for Beta"
			/>
		{/if}
	</div>
	<div class="right z-0 w-full desktop:w-3/5 apple:w-4/5 uw:w-3/4 min-w-max">
		<picture>
			<source srcset="/hero-dark.svg" media="(prefers-color-scheme: dark)" />
			<img class="h-full apple:w-3/4 uw:w-3/4 w-full" src="/hero.svg" alt="OpenRegistry-Hero" />
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
		align-items: center;
		justify-content: center;
	}
</style>
