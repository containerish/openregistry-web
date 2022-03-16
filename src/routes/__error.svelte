<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="bg-brown-200 flex-col w-full h-full flex justify-center items-center">
	<img class="w-4/6" src="/404-not-found.svg" alt="" />
</div>
