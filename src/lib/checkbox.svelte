<script>
	export let label = '';
	export let styles = '';
</script>

<div class="block">
	<div class="mt-2">
		<label class="inline-flex items-center">
			<input type="checkbox" style="" class="{styles} w-4 h-4 rounded-sm accent-primary-400" />
			<span class="ml-2 mb-2">{label}</span>
		</label>
	</div>
</div>
