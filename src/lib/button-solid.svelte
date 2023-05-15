<script lang="ts">
	export let isLoading = false;
	export let disabled = false;
	import { twMerge } from 'tailwind-merge';
</script>

<button
	aria-label="primary button"
	{disabled}
	on:click
	class={twMerge(
		`flex justify-center space-x-2 items-center border-2 bg-primary-300 border-primary-700 
		text-primary-800 rounded font-medium bg-opacity-80 hover:shadow-primary-600 hover:shadow-3xl 
		disabled:bg-slate-300 disabled:shadow-none transition-all duration-200 disabled:text-slate-400 
		gap-1 px-3 min-w-[120px] h-11 lg:text-base`,
		$$props.class
	)}
>
	{#if isLoading}
		<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-50" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
				5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
		Loading
	{:else}
		<slot />
	{/if}
</button>
