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
			.type('echo Qwerty@123 | docker login openregistry.dev --username=johndoe --password-stdin', {
				delay: 2000
			})
			.break()
			.options({ speed: 0, instant: true })
			.type('Login Succeeded')
			.break()
			.options({ speed: 0 })
			.type(header(), { delay: 800, instant: true })
			.options({ speed: 50 })
			.type('docker tag alpine:latest openregistry.dev/johndoe/alpine:latest', { delay: 300 })
			.break()
			.options({ speed: 0 })
			.type(header(), { instant: true })
			.options({ speed: 75 })
			.type('docker push openregistry.dev/johndoe/alpine:latest', { delay: 1000 })
			.break()
			.options({ speed: 0 })
			.type('The push refers to repository [openregistry.dev/janedoe/alpine]', {
				instant: true,
				delay: 700
			})
			.break()
			.options({ speed: 30 })
			.type('07d3c46c9599: Pushing [==================================================>]  5.612MB')
			.break()
			.options({ speed: 0 })
			.delete(84, { instant: true })
			.type('07d3c46c9599: Pushed', { delay: 1200 })
			.break()
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

<span id="typewriter" class="font-jetbrains-mono" />
