<script>
	import Card from '$lib/card.svelte';
	import { pulseStore } from './pulse';
</script>

{#if $pulseStore.status === 'LOADING'}
	<Card styles="w-full min-h-[90vh] m-w-[70vw] py-8 h-max bg-cream-50">
		<div class="animate-pulse grid grid-cols-3 rounded-md p-4 w-full mx-auto min-h-[80vh] gap-5 ">
			<div class="rounded-lg col-span-1 min-h-full flex justify-center items-center">
				<div class="flex-1 space-y-10 p-10">
					<div class="h-5 w-3/5 bg-brown-400 rounded" />
					<div class="h-4 bg-brown-400 rounded" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-brown-400 rounded col-span-2" />
							<div class="h-4 bg-brown-400 rounded col-span-1" />
						</div>
						<div class="h-4 bg-brown-400 rounded" />
					</div>
					<div class="h-4 bg-brown-400 rounded" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-brown-400 rounded col-span-2" />
						</div>
						<div class="h-4 bg-brown-400 rounded" />
					</div>
					<div class="h-4 bg-brown-400 rounded" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-brown-400 rounded col-span-2" />
						</div>
						<div class="h-4 bg-brown-400 rounded" />
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-brown-400 rounded col-span-2" />
							<div class="h-4 bg-brown-400 rounded col-span-1" />
						</div>
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-brown-400 rounded col-span-2" />
							<div class="h-4 bg-brown-400 rounded col-span-1" />
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-14 rounded-lg col-span-2 min-h-full p-8 justify-center">
				<div class="h-10 w-32 bg-brown-400 rounded-lg" />
				<div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl" />
				<div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl" />
				<div class="min-w-80 bg-brown-400 min-h-[10%] rounded-xl" />
			</div>
		</div>
	</Card>
{:else}
	<slot />
{/if}
