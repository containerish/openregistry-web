<script context="module">
	import { browser, dev } from '$app/env';
	import Card from '$lib/card.svelte';
	import Circle from '$lib/icons/circle.svelte';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>


<Card styles="bg-cream-50">
	<div class="flex flex-col w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
		<div class="bg-brown-400 justify-start items-center px-10 py-20 mx-5 my-0 rounded-xl ">
			<h1 class="text-4xl font-semibold text-brown-900 mb-5"> Decentralisation is the Future! and we want to play a role in making it better </h1>
			<span class="text-lg text-black">
                With growing
            </span>
			<div class=" mt-32">
				<h1 class="text-4xl font-semibold text-brown-900 my-5"> Help build an Open Source World with us </h1>
				<span class="text-lg text-black">
                Currently, you cannot rename an OpenRegistry repository once it's been created. You will need to create a new repository with the name of your choice,
                move all relevant tags to the new repository created, and delete the existing repository you wish to rename.
            </span>
			</div>

		</div>
	</div>

</Card>




