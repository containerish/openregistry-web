<script>
	import Textfield from '$lib/textfield.svelte';
	import RadioButton from '$lib/radioButton.svelte';
	import Globe from '$lib/icons/globe.svelte';
	import LockClosed from '$lib/icons/lock-closed.svelte';
	import { getContext } from 'svelte';
	import ButtonSolid from '$lib/button-solid.svelte';
	import ButtonOutlined from '$lib/button-outlined.svelte';

	const toggleModal = getContext('toggleModal');
</script>

<div class="px-10 py-10">
	<form class="flex justify-around items-center gap-8 flex-col h-full w-full">
		<span class="text-2xl capitalize font-semibold font-lato"> Create A New Repository </span>
		<div class="w-full">
			<div class="bg-cream-50 flex gap-4">
				<RadioButton label="Public">
					<Globe styles="h-6 w-6" />
				</RadioButton>
				<RadioButton label="Private">
					<LockClosed styles="bg-cream-50 h-6 w-6" />
				</RadioButton>
			</div>
			<div class="mt-2 w-full">
				<Textfield label="Repository Name" type="email" />
			</div>
			<div class="mt-2 w-full">
				<label for="textarea" class="block text-md text-gray-800">Description</label>
				<textarea
					rows="3"
					class="w-full resize-none rounded-md focus:border-brown-600 focus:outline-brown-100 focus:ring-brown-700"
				/>
			</div>
			<div class="flex px-16 pt-8 w-full justify-center items-center space-x-5">
				<ButtonSolid>Create</ButtonSolid>
				<ButtonOutlined onClick={toggleModal}>Close</ButtonOutlined>
			</div>
		</div>
	</form>
</div>
