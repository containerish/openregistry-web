<script type="module" lang="ts">
	import Button from '$lib/button.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { Auth } from '../apis/auth';

	export let handleModal = () => {};

	const auth = new Auth();

	let emails = '';
	const readEmails = (e) => {
		emails = e.target.value;
	};

	const sendInvites = () => {
		auth.SendInvites(emails);
	};
</script>

<div class="px-10 py-10">
	<form
		on:submit|preventDefault={(e) => sendInvites()}
		class="flex justify-around items-center gap-8 flex-col h-full w-full"
	>
		<span class="text-2xl capitalize font-semibold font-lato"> Invite Your Colleauges </span>
		<div class="w-full">
			<div class="mt-2 w-full">
				<Textfield
					onInput={readEmails}
					label="Emails"
					subHeading="comma separated list of emails"
					type="text"
				/>
			</div>
			<div class="flex px-16 pt-8 w-full">
				<Button onClick={sendInvites} styles="text-gray-50 w-full mr-2" label="Send Invites" />
				<Button onClick={handleModal} styles="bg-gray-50 text-gray-800 w-2/3 ml-2" label="Cancel" />
			</div>
		</div>
	</form>
</div>
