<script lang="ts">
	import TypesWriter from '$lib/typesWriter.svelte';

	const dockerPushOutput = `
<div>The push refers to repository [openregistry.dev/janedoe/alpine]</div>
<div>07d3c46c9599: Pushing [==================================================>]  5.612MB</div>
<div>07d3c46c9599: Pushed</div>
<div>latest: digest: sha256:c74f1b1166784193ea6c8f9440263b9be6cae07dfe35e32a5df7a31358ac2060 size: 528</div>
`;
	const renderCommand = (cmd: string, output?: string) => {
		if (!output) {
			return `
      <div><span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span><span class="font-jetbrains-mono">${cmd}</span></div> `;
		}

		return `<div><span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span><span class="font-jetbrains-mono">${cmd}</span></div>${output}`;
	};
</script>

<div class="w-full h-full px-4">
	<div
		class="coding h-full inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-900
      pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
	>
		<div class="top mb-2 flex">
			<div class="h-3 w-3 bg-red-500 rounded-full" />
			<div class="ml-2 h-3 w-3 bg-orange-300 rounded-full" />
			<div class="ml-2 h-3 w-3 bg-green-500 rounded-full" />
		</div>
		<div class="mt-4 flex">
			<TypesWriter>"some"</TypesWriter>
		</div>
	</div>
</div>

<style>
	.will-change {
		will-change: transform;
	}
	.cursor::after {
		display: block;
		content: '';
		position: absolute;
		width: 4px;
		height: 100%;
		background-color: #fff;
		animation: cursor 0.6s linear infinite alternate;
		will-change: opacity;
	}

	@keyframes cursor {
		0%,
		40% {
			opacity: 1;
		}

		60%,
		100% {
			opacity: 0;
		}
	}
</style>
