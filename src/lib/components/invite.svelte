<script type="module" lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { Auth } from '$apis/auth';

	export let handleModal = () => {};

	const auth = new Auth();

	let isLoading = false;
	let emails = '';
	let respMsg = '';
	let statusCode: number;

	const readEmails = (e: any) => {
		emails = e.target.value;
	};

	const sendInvites = async () => {
		isLoading = true;
		const { error, status } = await auth.SendInvites(emails);
		statusCode = status;
		if (error) {
			isLoading = false;
			respMsg = error.error;
			return;
		}

		respMsg = 'Email invitations sent successfully';
		emails = '';
		isLoading = false;
	};
</script>

<div class="px-10 py-10">
	<form
		on:submit|preventDefault={() => sendInvites()}
		class="flex justify-around items-center gap-8 flex-col h-full w-full"
	>
		<span class="text-2xl capitalize font-semibold font-lato">Invite Your Colleauges</span>
		<div class="w-full">
			<div class="mt-2 w-full">
				<div class="flex items-center px-2">
					<label for="invite_email_input" class="block font-semibold text-sm text-gray-800">
						Email
					</label>
					<span class="px-2 text-xs text-brown-800">(comma separated list of emails)</span>
				</div>
				<input
					on:input={readEmails}
					name="invite_email_input"
					type="text"
					bind:value={emails}
					placeholder="jane@openregistry.dev, john@..."
					class="placeholder-gray-400 text-sm form-control block w-full px-3 py-2 base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-brown-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white border rounded-md focus:border-brown-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-brown-800"
				/>
			</div>
			{#if respMsg}
				<div class="w-full text-center pt-1">
					<span class={statusCode > 299 ? 'text-red-600' : 'text-brown-800'}>{respMsg}</span>
				</div>
			{/if}
			<div class="flex px-16 pt-4 w-full space-x-5 justify-center">
				<ButtonSolid {isLoading} onClick={sendInvites}>Send Invites</ButtonSolid>
				<ButtonOutlined onClick={handleModal}>Cancel</ButtonOutlined>
			</div>
		</div>
	</form>
</div>
