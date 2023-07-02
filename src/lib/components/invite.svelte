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
		respMsg = '';
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

<div class="flex flex-col md:flex-row justify-center items-end gap-3 w-full">
	<div class="bg-primary-100/50 w-full md:w-1/2 h-full p-6 flex flex-col justify-center items-center gap-6">
		<span class="text-2xl capitalize font-semibold text-primary-500">Invite Your Colleauges</span>
		<img src="/cube-light.png" alt="" width="90px" />
	</div>
	<form
		on:submit|preventDefault={() => sendInvites()}
		class="flex justify-center items-center gap-6 flex-col h-full w-full p-6"
	>
		<div class="w-full flex flex-col gap-2 h-full">
			<div class="flex flex-col w-full">
				<Textfield
					label="Emails"
					on:input={readEmails}
					bind:value={emails}
					placeholder="jane@openregistry.dev, john@..."
				/>
			</div>
			{#if respMsg}
				<div class="w-full text-center">
					<span class={statusCode > 299 ? 'text-rose-600' : 'text-slate-700'}>{respMsg}</span>
				</div>
			{/if}
		</div>
		<div class="flex w-full gap-6 justify-center">
			<ButtonOutlined class="w-full" on:click={handleModal}>Cancel</ButtonOutlined>
			<ButtonSolid class="w-full" {isLoading} on:click={sendInvites}>Send Invites</ButtonSolid>
		</div>
	</form>
</div>
