<script>
	import Card from '$lib/card.svelte';
	import { pulseStore } from './pulse';
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import SpinnerCircle from '$lib/icons/spinner-circle.svelte';
</script>

{#if $pulseStore.status === 'LOADING'}
	<Card class="w-full py-8">
		<!-- <div class="animate-pulse grid grid-cols-3 rounded-sm p-4 w-full mx-auto min-h-[80vh] gap-5 ">
			<div class="rounded-sm col-span-1 min-h-full flex justify-center items-center">
				<div class="flex-1 space-y-10 p-10">
					<div class="h-5 w-3/5 bg-primary-100/50 rounded-sm" />
					<div class="h-4 bg-primary-100/50 rounded-sm" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-2" />
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-1" />
						</div>
						<div class="h-4 bg-primary-100/50 rounded-sm" />
					</div>
					<div class="h-4 bg-primary-100/50 rounded-sm" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-2" />
						</div>
						<div class="h-4 bg-primary-100/50 rounded-sm" />
					</div>
					<div class="h-4 bg-primary-100/50 rounded-sm" />
					<div class="space-y-10">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-2" />
						</div>
						<div class="h-4 bg-primary-100/50 rounded-sm" />
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-2" />
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-1" />
						</div>
						<div class="grid grid-cols-3 gap-4">
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-2" />
							<div class="h-4 bg-primary-100/50 rounded-sm col-span-1" />
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-14 rounded-sm col-span-2 min-h-full p-8 justify-center">
				<div class="h-10 w-32 bg-primary-100/50 rounded-sm" />
				<div class="min-w-80 bg-primary-100/50 min-h-[10%] rounded-md" />
				<div class="min-w-80 bg-primary-100/50 min-h-[10%] rounded-md" />
				<div class="min-w-80 bg-primary-100/50 min-h-[10%] rounded-md" />
			</div>
		</div> -->
		<div class="flex w-[700px] h-full min-w-max min-h-max py-20">
			<SpinnerCircle class="text-primary-100 h-20 w-20"/>
		</div>
	</Card>
{:else}
	<slot />
{/if}
