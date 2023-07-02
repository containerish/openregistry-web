<script>
	import Textfield from '$lib/textfield.svelte';
	import RadioButton from '$lib/radioButton.svelte';
	import { GlobeIcon, LockClosedIcon } from '$lib/icons';
	import { getContext } from 'svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';
	import Textarea from '$lib/textarea.svelte';

	const toggleModal = getContext('toggleModal');
</script>

<div class="flex flex-col md:flex-row">
	<div class="bg-primary-100/50 flex flex-col items-center justify-start gap-9 p-6 md:p-9">
		<span class="text-2xl font-semibold text-primary-500"> Create A New Repository </span>
		<img src="/cube-dark.png" alt="cube" width="120px" class="md:py-4">
	</div>
	<form class="flex justify-around items-center gap-6 flex-col h-full w-full px-9 py-6">
		<div class="flex flex-col gap-3 w-full">
			<div class="flex gap-4 text-slate-600 pb-2">
				<RadioButton label="Public">
					<GlobeIcon class="h-6 w-6" />
				</RadioButton>
				<RadioButton label="Private">
					<LockClosedIcon class="h-6 w-6" />
				</RadioButton>
			</div>
			<div class="w-full">
				<Textfield label="Repository Name" type="email" />
			</div>
			<div class="w-full">
				<label
					for="textarea"
					class="block text-sm lg:text-base text-start font-semibold text-slate-500 ml-1"
					>Description</label
				>
				<Textarea class="p-0 m-0" />
			</div>
		</div>
		<div class="flex pt-2 w-full justify-center items-center gap-6">
			<ButtonOutlined class="w-full" on:click={toggleModal}>Close</ButtonOutlined>
			<ButtonSolid class="w-full">Create</ButtonSolid>
		</div>
	</form>
</div>
