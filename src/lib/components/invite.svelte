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

<div class="flex justify-center items-center w-full py-1 px-6">
	<form
		on:submit|preventDefault={() => sendInvites()}
		class="flex justify-center items-center gap-6 flex-col h-full w-full"
	>
		<span class="text-2xl capitalize font-semibold text-primary-500">Invite Your Colleauges</span>
		<div class="w-full flex flex-col gap-6">
			<div class="flex flex-col w-full">
				<Textfield
					label="Emails"
					onInput={readEmails}
					bind:value={emails}
					placeholder="jane@openregistry.dev, john@..."
				/>
			</div>
			{#if respMsg}
				<div class="w-full text-center pt-1">
					<span class={statusCode > 299 ? 'text-rose-600' : 'text-slate-700'}>{respMsg}</span>
				</div>
			{/if}
			<div class="flex w-full gap-6 justify-center">
				<ButtonSolid {isLoading} on:click={sendInvites}>Send Invites</ButtonSolid>
				<ButtonOutlined on:click={handleModal}>Cancel</ButtonOutlined>
			</div>
		</div>
	</form>
</div>
