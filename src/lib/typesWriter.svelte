<script lang="ts">
	import Typewriter from 'typewriter-effect/dist/core';

	Typewriter.typeString('hellop workd')
		.pauseFor(2500)
		.deleteAll()
		.pauseFor(500)
		.changeCursor('$')
		.typeString('This is a new cursor')
		.pauseFor(2500)
		.start();

	const renderCommand = (cmd: string, output?: string) => {
		if (!output) {
			return `
      <div><span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span><span class="font-jetbrains-mono">${cmd}</span></div> `;
		}

		return `<div><span data-static class="text-green-500 font-semibold font-jetbrains-mono">jane@openregistry:~$ </span><span class="font-jetbrains-mono">${cmd}</span></div>${output}`;
	};

	type Command = {
		Name: string;
		Output?: string;
		Static?: boolean;
	};

	// @ts-ignore
	export const CommandList: Command[] = [
		{ Name: 'ls', Output: 'main.go' },
		{ Name: 'pwd', Output: '/home/jane' }
	];
</script>

<div id="typewriter" />
