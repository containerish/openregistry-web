<script lang="ts">
	import { navigating } from "$app/stores";
	import { Loader } from "$lib/components";
	import { pulseStore } from "$lib/components/pulse";
	import type { PageData } from "./$types";

	export let data: PageData;
	$: {
		pulseStore.setPulseState(!$navigating && !!data.projects);
	}
</script>

<Loader>
	<div
		class="flex justify-center items-start w-full h-full min-w-max min-h-max py-8"
	>
		<div
			class="justify-start flex flex-col gap-4 items-start w-full h-full max-w-[3000px]"
		>
			{#each data.projects as project}
				<div
					class="border gap-2 flex w-full bg-primary-100 border-primary-700"
				>
					<code>
						{JSON.stringify(project.buildSettings)}
					</code>
				</div>
			{/each}
		</div>
	</div>
</Loader>
