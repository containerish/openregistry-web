<script lang="ts">
	import { Check, ExternalLinkIcon, GitBranchIcon } from "$lib/icons";
</script>

<div class="bg-white py-6 px-4 grid grid-cols-7 items-center">
	<div
		class="rounded-full bg-slate-300 text-sm max-w-fit px-3 py-0.5 text-slate-600 items-start"
	>
		preview
	</div>
	<div class="flex flex-col col-span-2 mr-6">
		<div class="flex gap-2 items-center">
			<GitBranchIcon class="h-4 w-4" />
			<span>main</span>
			<a href="#" class="underline text-sm">bfg34578</a>
		</div>
		<p class=" text-sm text-slate-700 antialiased truncate">
			Merge pull request #45 from openregistry/awesomeness/whatnots
		</p>
	</div>
	<div class="flex gap-2 col-span-2 text-slate-700 text-sm">
		<span>sdljfhas.openregistry.dev</span>
		<ExternalLinkIcon class="h-4 w-4 text-primary-400" />
	</div>
	<div class="flex gap-2 items-center">
		<Check class="h-4 w-4 text-emerald-600" />
		<span class="text-sm text-slate-600">just now</span>
	</div>
	<a href="#" class=" underline text-sm">view details</a>
</div>
