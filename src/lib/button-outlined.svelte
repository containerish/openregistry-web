<script lang="ts">
	export let isLoading = false;
	export let disabled = false;
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button';
	import { twMerge } from 'tailwind-merge';
</script>

<button
	{type}
	aria-label="secondary button"
	{disabled}
	on:click|preventDefault
	class={twMerge(
		`transition ease-in-out duration-200 flex justify-center gap-1 items-center border-2 rounded-lg 
		font-medium text-primary-400 bg-transparent border-primary-200 tracking-wide px-6 min-w-[140px] h-12
		 hover:shadow-primary-100 hover:shadow-3xl disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-500
		  disabled:border-slate-300 text-sm lg:text-base antialiased`,
		$$props.class
	)}
>
	{#if isLoading}
		Loading
		<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-300" fill="none" viewBox="0 0 24 24">
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
