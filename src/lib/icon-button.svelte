<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let disabled = false;
</script>

<button
	on:click|preventDefault
	aria-label="icon button"
	{disabled}
	class={twMerge(
		`flex justify-center items-center w-full bg-transparent border-none py-2 px-6 text-lg text-slate-700 
		min-w-max hover:bg-primary-100/50 transition-colors duration-300`,
		$$props.class
	)}
>
	<slot />
</button>
