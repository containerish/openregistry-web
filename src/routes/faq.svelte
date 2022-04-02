<script lang="ts">
	import Card from '$lib/card.svelte';
	import Textarea from '$lib/textarea.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { Support } from '../apis/support';
	import SupportIcon from '$lib/icons/support.svelte';
	import SpinnerCircle from '$lib/icons/spinner-circle.svelte';
	import FaqTerminal from '$lib/faqTerminal.svelte';
	const support = new Support();
	let isLoading = false;
	let ticketResponse = '';
	let formValidation = {
		isSubjectValid: false,
		isBodyValid: false,
		isEmailValid: false
	};

	const validateBody = (e: any) => {
		if (e.target.value.length >= 10) {
			formValidation.isBodyValid = true;
		}
	};

	const validateSubject = (e: any) => {
		if (e.target.value.length >= 20) {
			formValidation.isSubjectValid = true;
		}
	};

	const validateEmail = (e: any) => {
		const email: string = e.target.value;
		const regexp = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		const regexFailed = regexp.test(email);
		// minimum length for email is 3 chars
		if (!email || email.length < 3 || !regexFailed) {
			formValidation.isEmailValid = false;
			/* = 'email is invalid'; */
			return;
		}

		formValidation.isEmailValid = true;
	};

	const handleFormSubmit = async (e: any) => {
		isLoading = true;
		const subject = e.target.subject.value;
		const body = e.target.body.value;
		const email = e.target.email.value;

		const { error } = await support.CreateNewTicket(body, subject, email);
		isLoading = false;
		if (error) {
			ticketResponse = `<span class="text-red-700 font-semibold">${error}</span>`;
			console.error('error: ', error);
			return;
		}

		ticketResponse = `<span class="text-green-700 font-semibold">Ticket Created Successfully</span>`;
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
				I Signed in with GitHub, how can I docker login to pull/push images ?
			</h1>
			<span class="text-lg text-black">
				You can use a PAT (Personal Access Token) from GitHub for Docker CLI login. To create a PAT,
				follow the official GitHub guide here:
				<a
					href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
				>
					GitHub Doc for PAT
				</a>
				and use the generated Personal Access Token as your password for docker login. <br /> The username
				will same as your GitHub username
			</span>
			<div
				class="w-full p-8 max-h-fit half:px-10 half:mb-10 laptop:px-10 apple:w-3/5 uw:w-3/6 uw:px-32"
			>
				<FaqTerminal />
			</div>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">How can I change my email address?</h1>
			<span class="text-lg text-black">
				Currently, this functionality is unavailable. However, we're working on integrating it into
				OpenRegistry with coming releases
			</span>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">
				How can I change my OpenRegistry Password
			</h1>
			<span class="text-lg text-black">
				To change your OpenRegistry Password, go to your
				<span class="font-semibold">Profile -> Settings -> Change Password.</span><br />
				Enter the current password, new password and finally confirm the new password and there you have
				it! In case you forgot your OpenRegistry Password, please click on forgot password and you'll
				receive an email to reset the password
			</span>
		</div>

		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-6 rounded-xl">
			<h1 class="text-3xl font-semibold text-brown-900 mb-5">A Humble Note</h1>
			<span class="text-lg text-black">
				OpenRegistry is a small team of 2 developers, as we work towards making it the best
				Container Registry, please make sure to drop any bug reports or improvement advice in the
				section below. We'd love to hear from you!
			</span>
		</div>

		<Card>
			<div class="w-full -ml-10">
				<h3 class="mt-1 ml-2 text-2xl font-normal text-left text-brown-900 ">Need More Help?</h3>
				<form on:submit|preventDefault={(e) => handleFormSubmit(e)} class="w-full lg:w-2/5 py-2">
					<Textfield name="email" type="email" onInput={validateEmail} placeholder="Email" />
					<Textfield name="subject" type="text" onInput={validateSubject} placeholder="Subject" />
					<Textarea name="body" onInput={validateBody} placeholder="Write to us" />
					<div>
						{@html ticketResponse}
					</div>
					<button
						disabled={!formValidation.isBodyValid ||
							!formValidation.isSubjectValid ||
							!formValidation.isEmailValid}
						on:click={handleFormSubmit}
						class="disabled:cursor-not-allowed disabled:hover:bg-brown-800 inline-flex items-center gap-2 ml-1 px-6
            py-2 mt-2 text-lg font-medium tracking-wide text-gray-100 transition-colors duration-200 transform
            bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-900 border-none"
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
