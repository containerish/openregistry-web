<script lang="ts">
	export let onClick: Function = () => {};
	export let isLoading = false;
	export let disabled = false;
</script>

<button
	{disabled}
	on:click={() => onClick()}
	class="{isLoading ? 'px-0' : 'px-4'} 
	transition ease-in-out duration-300
	max-w-[48rem] w-36 border-2 border-brown-800 rounded-md bg-transparent text-lg font-medium 
	hover:bg-brown-700 hover:text-white">
	{#if isLoading}
		<svg
			class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-50"
			fill="none"
			viewBox="0 0 24 24"
		>
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
		<slot></slot>
	{/if}
</button>
