<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let isLoading = false;
	export let disabled = false;
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'submit';
</script>

<button
	aria-label="primary button"
	{disabled}
	on:click
	{type}
	class={twMerge(
		`flex justify-center space-x-2 items-center border-2 bg-primary-300 border-primary-600 cursor-pointer
		text-primary-800 rounded font-medium lg:text-base tracking-wide bg-opacity-80 hover:shadow-primary-600 
		hover:shadow-3xl disabled:bg-slate-200 disabled:border-slate-300 disabled:shadow-none transition-all 
		duration-200 disabled:text-slate-400 gap-2 px-3 min-w-[120px] h-10 md:h-11 text-sm antialiased`,
		$$props.class
	)}
>
	{#if isLoading}
		Loading
		<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-800" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
		5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{:else}
		<slot />
	{/if}
</button>
