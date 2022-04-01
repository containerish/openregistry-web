<script lang="ts">
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';

	const header = () => {
		return `<span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span>`;
	};

	onMount(() => {
		new TypeIt('#typewriter', {
			loop: true,
			waitUntilVisible: true,
			afterComplete: (t: any) => {
				t.destroy();
			}
		})
			.options({ speed: 75 })
			.type(header(), { instant: true })
			.type('docker login openregistry.dev')
			.break()
			.options({ speed: 80 })
			.type('username: ', { instant: true })
			.pause(400)
			.type('janedoe')
			.pause(400)
			.break()
			.options({ speed: 20 })
			.type('password: ', { instant: true })
			.pause(600)
			.type('ghp_25733a2a9e7e4840b4b2f1a512ed815c7e48bac5a608c5')
			.break()
			.pause(1000)
			.options({ speed: 0, instant: true })
			.type('Login Succeeded')
			.break()
			.options({ speed: 0 })
			.type(header(), { delay: 800, instant: true })
			.go();
	});
</script>

<div class="w-full min-h-max h-full px-4">
	<div
		class="coding h-full min-h-[250px] inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-brown-900
    pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
	>
		<div class="top mb-2 flex">
			<div class="h-3 w-3 bg-red-500 rounded-full" />
			<div class="ml-2 h-3 w-3 bg-orange-300 rounded-full" />
			<div class="ml-2 h-3 w-3 bg-green-500 rounded-full" />
		</div>
		<div class="mt-4 flex" />
		<span id="typewriter" class="font-jetbrains-mono" />
	</div>
</div>
