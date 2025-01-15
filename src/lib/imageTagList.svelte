<script lang="ts" context="module">
	import type { Tag } from '$apis/registry';

	export type TableData = {
		headers: string[];
		content: Tag[];
		imageTag: string;
	};
</script>

<script lang="ts">
	import CopyIcon from './icons/copy.svelte';

	export let tableData: TableData;
	export let namespace: string;
</script>

{#if tableData}
	<div class="w-full p-4 bg-gray-50 rounded-md">
		<div class="flex py-2 items-center justify-between">
			<div>
				<span class="text-lg font-semibold text-brown-600">
					Tag: <span class="font-normal">{tableData.imageTag}</span>
				</span>
			</div>
			<div class="px-2 py-1 rounded-sm bg-cream-50">
				<span class="cursor-pointer inline-flex items-center gap-2 justify-center">
					docker pull {namespace}
					<CopyIcon />
				</span>
			</div>
		</div>

		<div class="table w-full">
			<div class="table-header-group">
				<div class="w-full table-row">
					{#each tableData.headers as header}
						<div class="table-cell text-left">{header}</div>
					{/each}
				</div>
			</div>
			<div class="table-row-group">
				{#each tableData.content as row}
					<div class="table-row">
						<div class="table-cell text-ellipsis max-w-xs">{row.digest.slice(0, 20)}</div>
						<div class="table-cell">{row.sky_link}</div>
						<div class="table-cell">{row.updated_at}</div>
						<div class="table-cell">{row.size}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
