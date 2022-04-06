<script lang="ts">
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';

	const header = () => {
		return `<span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span>`;
	};

	onMount(() => {
		new TypeIt('#typewriter', {
			loop: false,
			waitUntilVisible: true,
			afterComplete: (t: any) => {
				t.destroy();
			}
		})
			.options({ speed: 0 })
			.type(header(), { instant: true })
			.options({ speed: 50 })
			.type('echo Qwerty@123')
			.move(-10)
			.type('"')
			.move(null, { to: 'END' })
			.type('" | docker login openregistry')
			.pause(500)
			.type('.dev')
			.pause(400)
			.type(' --username=johndoe')
			.pause(300)
			.type(' --password-stdin')
			.break()
			.pause(1000)
			.options({ speed: 0, instant: true })
			.type('Login Succeeded')
			.break()
			.options({ speed: 0 })
			.type(header(), { delay: 800, instant: true })
			.options({ speed: 50 })
			.type('docker tag alpine;')
			.pause(200)
			.delete(1)
			.pause(200)
			.type(':')
			.pause(200)
			.type('latest openregistry.dev/johndoe/alpine:latest')
			.break()
			.options({ speed: 0 })
			.type(header(), { instant: true })
			.options({ speed: 75 })
			.type('docker push openregistry.dev/johndoe/alpine:latest', { delay: 1000 })
			.break()
			.type('The push refers to repository [openregistry.dev/janedoe/alpine]', {
				instant: true,
				delay: 700
			})
			.break()
			.type('07d3c46c9599: Pushing ', { instant: true })
			.pause(200)
			.options({ speed: 30 })
			.type('[==================================================>]  5.612MB')
			.break()
			.options({ speed: 0 })
			.delete(84, { instant: true })
			.type('07d3c46c9599: Pushed')
			.break()
			.pause(1200)
			.type(
				'latest: digest: sha256:c74f1b1166784193ea6c8f9440263b9be6cae07dfe35e32a5df7a31358ac2060 size: 528',
				{ instant: true }
			)
			.break()
			.options({ speed: 0 })
			.type(header(), { instant: true })
			.options({ speed: 50 })
			.go();
	});
</script>

<div class="w-full min-h-max h-full px-4">
	<div
		class="coding h-full min-h-[400px] inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-brown-900
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
