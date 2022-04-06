<script context="module" lang="ts">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script lang="ts">
	export let title: string;
</script>

<div
	class="bg-brown-200 text-center min-h-[70vh] py-8 2xl:py-16 flex-col w-full h-full flex justify-center items-center"
>
	<img class="w-4/6" src="/404-not-found.svg" alt="" />
	<div class="w-full h-full">
		<span class="text-brown-900 text-xl">{title}</span>
	</div>
</div>
