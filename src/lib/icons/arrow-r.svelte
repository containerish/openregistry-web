<script lang="ts">
	import { twMerge } from "tailwind-merge";
</script>

<svg
	class={twMerge("h-6 w-6 transition-transform", $$props.class)}
	viewBox="0 0 24 24"
	stroke="currentColor"
	aria-label="arrow"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M14 5l7 7m0 0l-7 7m7-7H3"
	/>
</svg>
