<script lang="ts">
	let defaultStyles = ' w-full flex justify-center items-center';
	import { twMerge } from 'tailwind-merge';
	export let id: string = crypto.randomUUID();
</script>

<section tabindex={1} on:mouseenter {id} class={twMerge(defaultStyles, $$props.class)}>
	<slot />
</section>
