<script>
	import { Check, ExternalLinkIcon, GitBranchIcon, RecycleIcon } from '$lib/icons';
</script>

<!-- the values are added just for design purposes, must cahnge them with dynamic values once APIs are in place -->
<div
	class="flex flex-col bg-white rounded-sm  min-h-max border-2 border-primary-100 my-6 
	border-l-4 border-l-green-600 border-opacity-100 shadow-2xl gap-3 px-6 py-6"
>
	<div class="flex justify-between">
		<span class="text-lg text-slate-700">Production</span>
		<button class="flex justify-center items-center gap-1 bg-transparent border-0 p-0 m-0">
			<span class="underline underline-offset-4 text-slate-600">visit site</span>
			<ExternalLinkIcon styles="h-4 w-4 text-slate-700" />
		</button>
	</div>
	<div class="flex gap-3 justify-start items-center">
		<RecycleIcon class="h-4 w-4 text-slate-700" />
		<span class="text-slate-800 text-sm antialiased">Automatic deployments enabled</span>
	</div>
	<div>
		<span class="text-sm font-medium text-slate-700"> Domains: </span>
		<a href="#">opneregistry.dev, somethingelse.dev</a>
	</div>
	<hr class="-mx-6 border-b-1 border-slate-300" />
	<div class="flex justify-between">
		<div class="flex gap-6 items-center">
			<div
				class="rounded-full bg-emerald-200 text-emerald-800 max-w-fit text-sm px-3 py-0.5 antialiased tracking-wide"
			>
				production
			</div>
			<div class="flex gap-1 items-center antialiased">
				<GitBranchIcon styles="h-4 w-4" />
				<span class="text-sm font-semibold text-slate-800">release-main</span>
			</div>
			<a href="#" class="underline">2345678</a>
			<div class="flex gap-2 items-center">
				<a href="#" class="text-slate-600 text-sm antialiased">123458.openregistry-is-awesome.dev</a
				>
				<ExternalLinkIcon styles="h-4 w-4 text-primary-500" />
			</div>
		</div>
		<div class="flex gap-2 items-center">
			<Check class="h-5 w-5 text-green-600" />
			<span class="text-sm text-slate-600">Just now</span>
			<a href="#" class="underline text-sm">view details</a>
		</div>
	</div>
</div>
