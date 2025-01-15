<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<svg
	aria-label="clock icon"
	class={twMerge('h-4 w-4', $$props.class)}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
	stroke-width="2"
>
	<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
