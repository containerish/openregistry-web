<script context="module">
	import { browser, dev } from '$app/env';
	import Card from '$lib/card.svelte';
	import Circle from '$lib/icons/circle.svelte';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>


<Card styles="bg-cream-50">
	<div class="flex flex-col w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-0 rounded-xl ">
			<h1 class="text-4xl font-semibold text-brown-900 mb-8 "> Decentralisation is the Future! and we want to play a role in making it better </h1>
			<span class="text-lg text-black">
               Our Vision is derived and powered by the principals of Web 3.0 and Dworld of Dapps.

            </span>
			<div class=" mt-28">
				<h1 class="text-5xl font-semibold text-brown-900 mt-5 mb-8"> Help build an Open Source World with us </h1>
				<span class="text-lg text-black">
                We started off as a fun project which eventually opened many doors for us

            </span>
			</div>
			<div class=" mt-28">
				<h1 class="text-5xl font-semibold text-brown-900 mt-5 mb-8"> Get to know our Team </h1>
				<span class="text-lg text-black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
				ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit
            </span>
			</div>
		</div>
		<div class="flex flex-row my-8 items-center">
			<div class="flex flex-col bg-brown-400 w-1/2 rounded-xl mx-8 py-4 px-4">
					<img
					on:click={()=> window.open("https://github.com/guacamole", "_blank")}
					src="https://avatars.githubusercontent.com/u/68041753?v=4&s=400" alt="guacamole"
					class="my-4 cursor-pointer self-center rounded-full border-2 border-black w-52"/>

				<h2 class="text-3xl font-semibold text-brown-900 self-center my-2">Guacamole</h2>
				<span class="text-lg text-black px-3.5 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</span>
			</div>
			<div class="flex flex-col bg-brown-400 w-1/2 rounded-xl mx-8 py-4 px-4">
				<img
					on:click={()=> window.open("https://github.com/jay-dee7", "_blank")}
					class="my-2.5 cursor-pointer self-center rounded-full w-56"
					src="https://avatars.githubusercontent.com/u/10788442?v=4&s=300" alt="jasdeep"/>
				<h2 class="text-3xl font-semibold text-brown-900 self-center my-2">Jasdeep</h2>
				<span class="text-lg text-black px-3.5 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</span>
			</div>

		</div>
	</div>

</Card>
