<script>
	import { twMerge } from 'tailwind-merge';
	export let href = '';
</script>

<a
	{href}
	class={twMerge(
		'transition-all flex items-center justify-center border border-slate-800 rounded-sm delay-100 ease-in hover:no-underline hover:shadow-3xl hover:shadow-primary-100 h-20 w-[160px]',
		$$props.class
	)}
>
	<slot />
</a>
