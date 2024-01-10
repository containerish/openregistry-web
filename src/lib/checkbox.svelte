<script lang="ts">
	export let label = '';
	import { twMerge } from 'tailwind-merge';
	export let checked = false;
</script>

<div class="block">
	<div class="mt-2">
		<label class="inline-flex items-center">
			<input
				type="checkbox"
				bind:checked
				on:change
				on:input
				on:click
				class={twMerge('w-4 h-4 rounded-sm accent-primary-400', $$props.class)}
			/>
			<span class="ml-2 mb-2">{label}</span>
		</label>
	</div>
</div>
