<script>
	import { twMerge } from 'tailwind-merge';
	export let href = '';
</script>

<a
	{href}
	aria-label="popular repositories read more about {href}"
	class={twMerge(
		`transition-all flex items-center justify-center bg-slate-50/80 border border-slate-400 rounded-sm delay-100 
		ease-in hover:no-underline hover:shadow-3xl hover:shadow-slate-400/80 h-[75px] w-[150px]`,
		$$props.class
	)}
>
	<slot />
</a>
