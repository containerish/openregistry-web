<script>
	export let label = '';
	export let styles = '';
</script>

<div class="block">
	<div class="mt-2">
		<label class="inline-flex items-center">
			<input disabled type="checkbox" style="" class="{styles} w-6 h-6 desktop:w-4 desktop:h-4 rounded-sm" />
			<span class="ml-2 mb-2">{label}</span>
		</label>
	</div>
</div>
