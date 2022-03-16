<script lang="ts">
	import TW from 'svelte-typewriter';

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

	export let CommandList: Command[] = [
		{ Name: 'ls', Output: 'main.go' },
		{ Name: 'pwd', Output: '/home/jane' }
	];
</script>

<p class="flex-1 typing items-center pl-2">
	{#each CommandList as command}
		<TW scrambleSlowdown={true} cursor="#fff" cascade={true} interval={[80, 50, 20]}>
			{@html renderCommand(command.Name, `<div>${command.Output}</div>`)}
			<span class="text-green-400">jane@openregistry:~$ </span>
		</TW>
	{/each}
</p>
