<script lang="ts">
	import Card from '$lib/card.svelte';
	import Textarea from '$lib/textarea.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { Support } from '$apis/support';
	import { SpinnerCircle, SupportIcon } from '$lib/icons';
	import FaqTerminal from '$lib/faqTerminal.svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
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
			ticketResponse = `<span class="text-rose-700 font-semibold">${error}</span>`;
			console.error('error: ', error);
			return;
		}

		ticketResponse = `<span class="text-emerald-700 font-semibold">Ticket Created Successfully</span>`;
	};
</script>

<svelte:head>
	<title>FAQ | OpenRegistry</title>
</svelte:head>

<Card class=" bg-slate-50/50 mx-auto">
	<div class="w-3/4 lg:w-full min-h-[90vh] mx-10 my-4 lg:my-20 max-w-[3000px]">
		<div
			class=" bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-5 rounded-sm
			border border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">
				How do I rename a OpenRegistry repository?
			</h1>
			<span class="text-base text-slate-600">
				Currently, you cannot rename an OpenRegistry repository once it's been created. You will
				need to create a new repository with the name of your choice, move all relevant tags to the
				new repository created, and delete the existing repository you wish to rename.
			</span>
		</div>

		<div
			class="bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">
				Can a repository be transferred to a different account?
			</h1>
			<span class="text-base text-slate-600">
				Repositories can not be transferred to a different account. If you would like to transfer a
				repository to a different account, you will need to download any images You can then
				recreate the repository on the new account.
			</span>
		</div>

		<div
			class="bg-slate-50 shadow-inner flex flex-col p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100 gap-6"
		>
			<h1 class="text-2xl font-semibold text-slate-700">
				I Signed in with GitHub, how can I docker login to pull/push images ?
			</h1>
			<span class="text-base text-slate-600">
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
			<div class="lg:w-1/2">
				<FaqTerminal />
			</div>
		</div>

		<div
			class="bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">How can I change my email address?</h1>
			<span class="text-base text-slate-600">
				Currently, this functionality is unavailable. However, we're working on integrating it into
				OpenRegistry with coming releases
			</span>
		</div>

		<div
			class="bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">
				How can I change my OpenRegistry Password
			</h1>
			<span class="text-base text-slate-600">
				To change your OpenRegistry Password, go to your
				<span class="text-primary-400 font-semibold">Profile -> Settings -> Change Password.</span
				><br />
				Enter the current password, new password and finally confirm the new password and there you have
				it! In case you forgot your OpenRegistry Password, please click on forgot password and you'll
				receive an email to reset the password
			</span>
		</div>

		<div
			class="bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">A Humble Note</h1>
			<span class="text-base text-slate-600">
				OpenRegistry is a small team of 2 developers, as we work towards making it the best
				Container Registry, please make sure to drop any bug reports or improvement advice in the
				section below. We'd love to hear from you!
			</span>
		</div>
		<div
			class="bg-slate-50 shadow-inner justify-start items-center p-5 lg:p-10 my-6 rounded-sm border
			border-primary-100"
		>
			<h1 class="text-2xl font-semibold text-slate-700 mb-5">Learn More about OpenRegistry</h1>
			<span class="text-base text-slate-600">
				If you are completely new to Containers and Container Registries and interested in learning
				more about it. You can follow our
				<a href="https://docs.openregistry.dev/" class="text-primary-400">documentation</a> where we
				cover everything from basics of containers, step to step guide to getting started and video
				content for more clarity. We also have cute little <b class="text-primary-400">zines</b> in place
				to make your learning experience more fun!
			</span>
		</div>

		<Card>
			<div class="w-4/5 lg:w-full">
				<span class="mt-1 ml-2 text-2xl font-normal text-left text-slate-700">Need More Help?</span>
				<form
					on:submit|preventDefault={(e) => handleFormSubmit(e)}
					class="w-full lg:w-2/5 py-4 flex flex-col justify-start items-start gap-3"
				>
					<Textfield name="email" type="email" onInput={validateEmail} placeholder="Email" />
					<Textfield name="subject" type="text" onInput={validateSubject} placeholder="Subject" />
					<Textarea name="body" onInput={validateBody} placeholder="Write to us" />
					<div>
						{@html ticketResponse}
					</div>
					<ButtonSolid
						disabled={!formValidation.isBodyValid ||
							!formValidation.isSubjectValid ||
							!formValidation.isEmailValid}
						on:click={handleFormSubmit}
					>
						{#if isLoading}
							<SpinnerCircle />
						{:else}
							<SupportIcon />
						{/if}
						Send
					</ButtonSolid>
				</form>
			</div>
		</Card>
	</div>
</Card>
