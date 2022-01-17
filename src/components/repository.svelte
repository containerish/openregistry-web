<script>
	import Copy from '$lib/icons/copy.svelte';
	import Download from '$lib/icons/download.svelte';
	import LockClosed from '$lib/icons/lock-closed.svelte';
	import Star from '$lib/icons/star.svelte';
</script>

<div
	class="hover:shadow-brown-100 shadow-sm drop-shadow-sm w-11/12 px-8 py-2 my-2 mx-auto bg-gray-100 rounded-lg dark:bg-brown-800"
>
	<div class="pt-2">
		<span class="dark:text-gray-50">
			janedoe /
			<span class="font-lato font-semibold">alpine</span>
		</span>
	</div>

	<div class="flex items-center justify-between">
		<span class="text-xs font-light text-gray-500 dark:text-gray-50">
			Last Updated: Mar 10, 2019
		</span>

		<div class="flex gap-4">
			<button class="border-none p-0"><Copy /></button>
			<button class="border-none p-0"><Download /></button>
			<button class="border-none p-0"><Star /></button>
			<button class="border-none p-0"><LockClosed /></button>
		</div>
	</div>

	<div class="mt-2" />
</div>
