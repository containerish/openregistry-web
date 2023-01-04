<script lang="ts">
	export let onClick: Function = () => {};
	export let isLoading = false;
	export let disabled = false;
	export let styles = '';
</script>

<button
	{disabled}
	on:click={() => onClick()}
	class="{isLoading ? 'px-2' : 'px-4'} 
	{styles} transition ease-in-out duration-200
	flex space-x-2 justify-center items-center max-w-[48rem] min-w-[144px] desktop:min-w-[120px] border-2 border-primary-200 text-primary-400 
	rounded-md bg-transparent capitalize text-lg font-medium hover:shadow-primary-100 hover:shadow-3xl py-3 laptop:py-1.5 desktop:text-base 
	desktop:border-[1.5px] disabled:bg-slate-200 disabled:hover:rounded-md"
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
