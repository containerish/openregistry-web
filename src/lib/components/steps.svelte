<script>
	import Card from '$lib/card.svelte';
	import { CloudIcon, ConfirmIcon, LaboratoryIcon, LayersIcon } from '$lib/icons';
</script>

<div class="bg-contain" style="background-image: url('/mesh.png');">
	<Card class="px-9 py-20">
		<div
			class="flex flex-col items-center md:items-end gap-12 md:grid md:grid-cols-4 w-full md:gap-6"
		>
			<div class="col-span-4 text-center flex flex-col gap-1 lg:gap-3 mb-10 lg:mb-20">
				<span
					class="text-primary-500 text-center whitespace-nowrap text-3xl
					font-semibold"
				>
					How does it work?
				</span>
				<span class="text-sm lg:text-base self-center text-slate-600 w-96 md:w-full px-3"
					>A step by step description on how a layer is pushed to OpenRegistry</span
				>
			</div>

			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 1</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 2</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 3</span>
			<span class="hidden md:flex text-3xl font-medium text-primary-500 ml-3">Step 4</span>

			<div class="col-span-4">
				<img src="/steps-line.png" alt="steps" class="hidden md:flex" />
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]
             bg-slate-50/50"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 1 </span>
				<span class=" text-slate-600">
					The container image submitted by user is divided into one or more layers depending on a
					few factors like size.
				</span>
				<div
					class="rounded bg-primary-700 shadow-2xl shadow-slate-300 flex justify-center p-3 w-full mr-6"
				>
					<LaboratoryIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]
                bg-slate-50/50"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 2 </span>
				<span class=" text-slate-600 px-1">
					The layers are further divided into blobs and sequentially uploaded to the storage backend
					of user's preference like IPFS or Storj.
				</span>
				<div
					class="rounded bg-primary-700 shadow-2xl shadow-slate-300 flex justify-center p-3 w-full mr-6"
				>
					<LayersIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]
                bg-slate-50/50"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 3 </span>
				<span class=" text-slate-600 px-1">
					A resolver component uploads the blobs to IPFS/Stoj and brings back the content hash which
					is mapped to the container image.
				</span>
				<div
					class="rounded bg-primary-700 shadow-2xl shadow-slate-300 flex justify-center p-3 w-full mr-6"
				>
					<CloudIcon />
				</div>
			</div>

			<div
				class="px-3 flex flex-col justify-between py-6 items-center text-sm gap-3 md:gap-6 max-w-[360px]
                bg-slate-50/50"
			>
				<span class="text-3xl font-medium text-primary-500 md:hidden self-start"> Step 4 </span>
				<span class=" text-slate-600 px-1">
					Once all the blobs for a layer are recieved,a digest is calculated which is used with
					content hash while retrival of the layer.
				</span>
				<div
					class="rounded bg-primary-700 shadow-2xl shadow-slate-300 flex justify-center p-3 w-full mr-6"
				>
					<ConfirmIcon />
				</div>
			</div>
		</div>
	</Card>
</div>
