<script>
	import { twMerge } from 'tailwind-merge';
</script>

<button
	on:click
	class={twMerge(
		'flex justify-center items-center w-full bg-transparent border-none py-2 px-6 text-lg text-slate-700 min-w-max',
		$$props.class
	)}>
	<slot />
</button>
