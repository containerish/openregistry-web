<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let label: string;
</script>

<div
	class={twMerge(
		"border tracking-wide border-primary-300 bg-primary-100/80 rounded antialiased px-3 text-sm",
		$$props["class"],
	)}
>
	{label}
</div>
