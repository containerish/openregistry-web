<script>
	export let label = '';
	export let value = '';
</script>

<div class="form-check cursor-pointer form-check-inline">
	<input
		class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-slate-400
		 bg-white checked:bg-primary-200 checked:border-slate-600 focus:outline-none transition duration-200 
		 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
		type="radio"
		name="inlineRadioOptions"
		id="inlineRadio1"
		{value}
	/>
	<label
		class="text-lg form-check-label flex gap-1 text-gray-800"
		for="inlineRadio10"
	>
		{label}
		<slot />
	</label>
</div>
