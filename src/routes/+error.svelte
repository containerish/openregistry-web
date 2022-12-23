<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="bg-brown-200 text-center min-h-[70vh] py-8 2xl:py-16 flex-col w-full h-full flex justify-center items-center"
>
	{#if $page.status === 400 || $page.status === 401}
		<img class="w-4/6" src="/unauthorised.svg" alt="" />
	{:else}
		<img class="w-4/6" src="/404-not-found.svg" alt="" />
	{/if}
	<div class="w-full h-full">
		<span class="text-brown-900 text-xl">Status Code: {$page.status} {JSON.stringify($page.error)}</span>
	</div>
</div>
