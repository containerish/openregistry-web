<script lang="ts">
	import { createSwitch, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let label: string;
	export let disabled = false;
	export let checked: boolean | undefined = false;

	const checkedStore = writable(checked);
	const dispatcher = createEventDispatcher();
	const handleSwitchToggle: ChangeFn<boolean> = ({ next }) => {
		dispatcher('change', next);
		return next;
	};

	const {
		elements: { root, input },
	} = createSwitch({
		onCheckedChange: handleSwitchToggle,
		checked: checkedStore,
		disabled,
	});
</script>

<form>
	<div class="flex items-center">
		<label
			class="pr-4 leading-none text-sm {disabled ? 'text-slate-500' : 'text-primary-500'}"
			for="openregistry-toggle"
			id="openregistry-toggle-label"
		>
			{label}
		</label>
		<button
			use:melt={$root}
			class="relative h-5 cursor-default rounded-full border border-primary-100 transition-colors data-[state=checked]:bg-emerald-100"
			id="openregistry-toggle"
			aria-labelledby="openregistry-toggle-label"
		>
			<span class="thumb block rounded-full bg-primary-200 transition" />
		</button>
		<input use:melt={$input} />
	</div>
</form>

<style>
	button {
		--w: 2.5rem;
		--padding: 0.1rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.1rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
