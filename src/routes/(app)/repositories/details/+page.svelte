<script>
	import Card from '$lib/card.svelte';
	import Globe from '$lib/icons/globe.svelte';
</script>

<div>
	<Card class="w-full min-h-max m-w-[70vw] py-8 bg-white">
		<div class="flex w-full h-full max-w-[3000px]">
			<div class="flex space-x-10 w-full">
				<div>
					<Globe class="h-20 w-20" />
				</div>
				<div class="w-full">
					<h1 class="text-4xl font-medium">janedoe/openregistry</h1>
					<div class="flex mt-3">
						<span class="text-md">by janedoe</span>
					</div>
				</div>
			</div>
			<div>
				<div class="flex flex-col flex-initial w-80">
					<h1 class="text-2xl font-medium">Docker Commands</h1>
					<span class="text-lg">to push a new image to this repository</span>
					<span class="bg-gray-400 text-gray-900 px-8 py-2">
						docker push cntr.sh/janedoe/openregistry:tagname</span
					>
				</div>
			</div>
		</div>
	</Card>
</div>
