<script>
	let defaultStyles = ' w-full flex justify-center items-center';
	import { twMerge } from 'tailwind-merge';
	export let id = '';
</script>

<section on:mouseenter {id} class={twMerge(defaultStyles, $$props.class)}>
	<slot />
</section>
