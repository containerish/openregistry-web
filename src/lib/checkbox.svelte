<script>
	export let label = '';
	import { twMerge } from 'tailwind-merge';
</script>

<div class="block">
	<div class="mt-2">
		<label class="inline-flex items-center">
			<input type="checkbox" class={twMerge("w-4 h-4 rounded-sm accent-primary-400", $$props.class)}  />
			<span class="ml-2 mb-2">{label}</span>
		</label>
	</div>
</div>
