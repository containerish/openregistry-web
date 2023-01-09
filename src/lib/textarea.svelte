<script lang="ts">
	export let styles = '';
	export let placeholder = '';
	export let name = '';
	export let rows = 3;
	export let onInput = (e: any, key: string) => {};
</script>

<div class="{styles} my-2 xl:w-full">
	<textarea
		class="placeholder-slate-500 form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white 
		bg-clip-padding border-solid border-primary-100 transition ease-in-out m-0 focus:text-slate-700 focus:bg-white border 
		rounded-md focus:border-primary-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500"
		id="FormControlTextarea"
		{rows}
		maxlength="300"
		on:input={(e) => onInput(e, name)}
		{name}
		{placeholder}
	/>
</div>
