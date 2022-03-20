<script lang="ts">
	import Card from '$lib/card.svelte';
	import Textarea from '$lib/textarea.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { Support } from '../apis/support';
	import SupportIcon from '$lib/icons/support.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import SpinnerCircle from '$lib/icons/spinner-circle.svelte';
	const support = new Support();
	let email = '';
	let isLoading = false;
	let ticketResponse = '';
	let disableSendButton = true;

	if (browser) {
		// @ts-ignore
		session.subscribe(async ({ authenticated, user }) => {
			if (authenticated) {
				email = user.email;
				return;
			}
			goto('/auth/unauthorized');
		});
	}

	const handleFormSubmit = async (e: any) => {
		isLoading = true;
		const subject = e.target.subject.value;
		const body = e.target.body.value;

		const { error, data } = await support.CreateNewTicket(body, subject, email);
		isLoading = false;
		if (error) {
			ticketResponse = `<span class="text-red-700 font-semibold">${error}</span>`;
			console.error('error: ', error);
			return;
		}

		ticketResponse = `<span class="text-green-700 font-semibold">Ticket Created Successfully</span>`;
		console.log('ticket: ', data);
	};
</script>

<svelte:head>
	<title>FAQ | OpenRegistry</title>
</svelte:head>

<Card styles="bg-cream-50">
	<div class="w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
		<div class=" bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-5 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">
				How do I rename a OpenRegistry repository?
			</h1>
			<span class="text-lg text-black">
				Currently, you cannot rename an OpenRegistry repository once it's been created. You will
				need to create a new repository with the name of your choice, move all relevant tags to the
				new repository created, and delete the existing repository you wish to rename.
			</span>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">
				Can a repository be transferred to a different account?
			</h1>
			<span class="text-lg text-black">
				Repositories can not be transferred to a different account. If you would like to transfer a
				repository to a different account, you will need to download any images You can then
				recreate the repository on the new account.
			</span>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">
				How can I reset my OpenRegistry password?
			</h1>
			<span class="text-lg text-black">
				You can reset your OpenRegistry password at .................
			</span>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">How can I change my email address?</h1>
			<span class="text-lg text-black">
				You can reset your OpenRegistry password at .................
			</span>
		</div>

		<Card>
			<div class="w-full -ml-10">
				<h3 class="mt-1 ml-2 text-2xl font-normal text-left text-brown-900 ">Need More Help?</h3>
				<form on:submit|preventDefault={(e) => handleFormSubmit(e)} class="w-full lg:w-2/5 py-2">
					<Textfield name="subject" type="text" placeholder="Subject" />
					<Textarea name="body" placeholder="Write to us" />
					<div>
						{@html ticketResponse}
					</div>
					<button
						disabled={disableSendButton}
						on:click={handleFormSubmit}
						class="disabled:cursor-not-allowed disabled:hover:bg-brown-800 inline-flex items-center gap-2 ml-1 px-6 py-2 mt-2 text-lg font-medium tracking-wide text-gray-100
       transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700
       focus:outline-none focus:bg-brown-900 border-none"
					>
						{#if isLoading}
							<SpinnerCircle />
						{:else}
							<SupportIcon />
						{/if}
						Send
					</button>
				</form>
			</div>
		</Card>
	</div>
</Card>
