<script type="module" lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { Auth } from '$apis/auth';
	import Textfield from '$lib/textfield.svelte';

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
		<span class="text-2xl capitalize font-semibold text-primary-500">Invite Your Colleauges</span>
		<div class="w-full">
			<div class="flex flex-col gap-1 w-full">
				<div class="flex items-center px-2">
					<label for="invite_email_input" class="block font-semibold text-sm text-slate-800">
						Email
					</label>
					<span class="px-2 text-xs text-slate-600 antialiased"
						>(comma separated list of emails)</span
					>
				</div>
				<Textfield
					onInput={readEmails}
					bind:value={emails}
					placeholder="jane@openregistry.dev, john@..."
				/>
			</div>
			{#if respMsg}
				<div class="w-full text-center pt-1">
					<span class={statusCode > 299 ? 'text-red-600' : 'text-brown-800'}>{respMsg}</span>
				</div>
			{/if}
			<div class="flex pt-4 w-full space-x-5 justify-center">
				<ButtonSolid {isLoading} on:click={sendInvites}>Send Invites</ButtonSolid>
				<ButtonOutlined on:click={handleModal}>Cancel</ButtonOutlined>
			</div>
		</div>
	</form>
</div>
