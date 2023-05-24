<script>
	import Card from '$lib/card.svelte';
	import { CloudIcon, ConfirmIcon, LaboratoryIcon, LayersIcon } from '$lib/icons';
</script>

<div
	class="flex flex-col bg-slate-50/70 shadow-2xl items-center md:items-end gap-12 md:grid md:grid-cols-4 w-full md:gap-6
		rounded-lg px-12 py-16"
>
	<div class="col-span-4 md:pb-9 text-center flex flex-col gap-3">
		<span
			class="text-primary-500 text-center whitespace-nowrap text-3xl
					font-semibold"
		>
			How does it work?
		</span>
		<span class="text-sm self-center text-slate-600 w-96 md:w-full px-3"
			>A step by step description on how a layer is pushed to OpenRegistry</span
		>
	<hr class=" border-b border-primary-100/50">
	</div>
	<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 1</span>
	<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 2</span>
	<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 3</span>
	<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 4</span>

	<div class="col-span-4">
		<img src="/steps-line.png" alt="steps" class="hidden md:flex" />
	</div>

	<div class="px-3 flex flex-col justify-between items-center text-sm gap-3 md:gap-6 max-w-[360px]">
		<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 1 </span>
		<span class=" text-slate-600">
			The container image submitted by user is divided into one or more layers depending on a few
			factors like size.
		</span>
		<div
			class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
		>
			<LaboratoryIcon />
		</div>
	</div>

	<div class="px-3 flex flex-col justify-between items-center text-sm gap-3 md:gap-6 max-w-[360px]">
		<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 2 </span>
		<span class=" text-slate-600 px-1">
			The layers are further divided into blobs and sequentially uploaded to the storage backend of
			user's preference like IPFS or Storj.
		</span>
		<div
			class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
		>
			<LayersIcon />
		</div>
	</div>

	<div class="px-3 flex flex-col justify-between items-center text-sm gap-3 md:gap-6 max-w-[360px]">
		<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 3 </span>
		<span class=" text-slate-600 px-1">
			A resolver component uploads the blobs to IPFS/Stoj and brings back the content hash which is
			mapped to the container image.
		</span>
		<div
			class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
		>
			<CloudIcon />
		</div>
	</div>

	<div class="px-3 flex flex-col justify-between items-center text-sm gap-3 md:gap-6 max-w-[360px]">
		<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 4 </span>
		<span class=" text-slate-600 px-1">
			Once all the blobs for a layer are recieved,a digest is calculated which is used with content
			hash while retrival of the layer.
		</span>
		<div
			class="rounded bg-primary-100/30 shadow-2xl shadow-primary-100 flex justify-center p-3 w-full mr-6"
		>
			<ConfirmIcon />
		</div>
	</div>
</div>
