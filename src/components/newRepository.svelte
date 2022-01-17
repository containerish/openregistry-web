<script>
	import Button from '$lib/button.svelte';
	import Textfield from '$lib/textfield.svelte';
	import RadioButton from '$lib/radioButton.svelte';
	import Globe from '$lib/icons/globe.svelte';
	import LockClosed from '$lib/icons/lock-closed.svelte';
	import { getContext } from 'svelte';

	const toggleModal = getContext('toggleModal');
</script>

<div class="px-10 py-10">
	<form class="flex justify-around items-center gap-8 flex-col h-full w-full">
		<span class="text-2xl capitalize font-semibold font-lato dark:text-gray-200">
			Create A New Repository
		</span>
		<div class="w-full">
			<div class="bg-cream-50 flex gap-4 dark:bg-brown-900">
				<RadioButton label="Public">
					<Globe />
				</RadioButton>
				<RadioButton label="Private">
					<LockClosed />
				</RadioButton>
			</div>
			<div class="mt-2 w-full">
				<Textfield label="Repository Name" type="email" />
			</div>
			<div class="mt-2 w-full">
				<label for="textarea" class="block text-md text-gray-800 dark:text-gray-200"
					>Description</label
				>
				<textarea
					rows="3"
					class="w-full resize-none rounded-md focus:border-brown-600 dark:focus:border-brown-700 focus:outline-brown-100 focus:ring-brown-700"
				/>
			</div>
			<div class="flex px-16 pt-8 w-full">
				<Button styles="text-gray-50 w-full mr-2" label="Create" />
				<Button
					onClick={() => toggleModal()}
					styles="bg-gray-50 text-gray-800 w-2/3 ml-2"
					label="Close"
				/>
			</div>
		</div>
	</form>
</div>
