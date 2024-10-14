<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<button
	aria-label="repository"
	on:click
	class={twMerge(
		`text-slate-700 text-sm lg:text-base rounded border-2 gap-2 border-primary-100
    flex justify-center items-center py-2 lg:py-3 hover:shadow-2xl`,
		$$props.class
	)}
>
	<slot />
</button>
