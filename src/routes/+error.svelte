<script lang="ts">
	import { page } from '$app/stores';
	const { status, error } = $page;
</script>

<div
	class="bg-brown-200 text-center min-h-[70vh] py-8 2xl:py-16 flex-col w-full h-full flex justify-center items-center"
>
	{#if status === 400 || status === 401}
		<img class="w-4/6" src="/unauthorised.svg" alt="" />
	{:else}
		<img class="w-4/6" src="/404-not-found.svg" alt="" />
	{/if}
	<div class="w-full h-full">
		<span class="text-brown-900 text-xl">Status Code: {status} {error}</span>
	</div>
</div>
