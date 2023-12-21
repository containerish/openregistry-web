<script type="module" lang="ts">
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import { Auth } from '$apis/auth';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { UserPlusIcon } from '$lib/icons';
	import Textarea from '$lib/textarea.svelte';

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

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: false,
	});
</script>

<button
	use:melt={$trigger}
	class="bg-transparent border-0 flex flex-row gap-3 justify-start items-center text-slate-700 antialiased tracking-wide
hover:bg-primary-100/50 rounded py-2 px-3 text-sm xl:text-base hover:no-underline"
	><UserPlusIcon /> Invite People</button
>
<div use:melt={$portalled} class="w-full h-full">
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-primary-800/50 max-w-[2000px]"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="flex flex-col fixed left-[50%] bg-white top-[50%] z-50 max-h-[30vh] w-[50vw]
	  max-w-[630px] translate-x-[-50%] translate-y-[-50%] md:flex-row justify-center items-start gap-3
	  rounded shadow-2xl shadow-primary-800/30"
		>
			<div
				class="bg-primary-100/50 w-full md:w-1/2 h-full p-14 flex flex-col text-center justify-center
		items-center gap-9"
			>
				<span class="text-2xl capitalize font-semibold text-primary-500" use:melt={$title}
					>Invite Your Colleauges</span
				>
				<img src="/cube-light.png" alt="" width="90px" />
			</div>
			<form
				on:submit|preventDefault={() => sendInvites()}
				class="flex justify-center items-start gap-9 flex-col h-full w-full p-6 bg-white"
			>
				<div class="w-full flex flex-col gap-2 h-full">
					<div class="flex flex-col w-full gap-3">
						<span class="text-slate-500 text-sm"
							>fill in a comma separated list of emails below and hit send to invite your colleauges</span
						>
						<Textarea
							on:input={readEmails}
							bind:value={emails}
							rows={4}
							name="Emails"
							placeholder="e.g jane@openregistry.dev, john@..."
						/>
					</div>
					{#if respMsg}
						<div class="w-full text-center">
							<span class={statusCode > 299 ? 'text-rose-600' : 'text-slate-700'}>{respMsg}</span>
						</div>
					{/if}
				</div>
				<div class="flex w-full gap-6 justify-center">
					<ButtonOutlined class="w-full p-0 m-0">
						<button class="w-full h-full" use:melt={$close}> Cancel </button>
					</ButtonOutlined>
					<ButtonSolid class="w-full" {isLoading} on:click={sendInvites}>Send Invites</ButtonSolid>
				</div>
			</form>
		</div>
	{/if}
</div>
