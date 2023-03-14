<script>
	import Textfield from '$lib/textfield.svelte';
	import RadioButton from '$lib/radioButton.svelte';
	import { GlobeIcon, LockClosedIcon } from '$lib/icons';
	import { getContext } from 'svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	const toggleModal = getContext('toggleModal');
</script>

<div class="px-5 lg:px-12 py-8">
	<form class="flex justify-around items-center gap-8 flex-col h-full w-full">
		<span class="text-2xl font-semibold text-primary-500 pb-4"> Create A New Repository </span>
		<div class="flex flex-col gap-4 w-full">
			<div class="flex gap-4 text-slate-600 pb-2">
				<RadioButton label="Public">
					<GlobeIcon styles="h-6 w-6" />
				</RadioButton>
				<RadioButton label="Private">
					<LockClosedIcon styles="h-6 w-6" />
				</RadioButton>
			</div>
			<div class="w-full">
				<Textfield label="Repository Name" type="email" />
			</div>
			<div class="w-full">
				<label for="textarea" class="block text-sm lg:text-base text-start font-semibold text-gray-600"
					>Description</label
				>
				<textarea
					rows="3"
					class="w-full resize-none border-primary-100 rounded-md focus:border-primary-200 
					focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500"
				/>
			</div>
			<div class="flex px-16 pt-2 w-full justify-center items-center space-x-5">
				<ButtonSolid>Create</ButtonSolid>
				<ButtonOutlined on:click={toggleModal}>Close</ButtonOutlined>
			</div>
		</div>
	</form>
</div>
