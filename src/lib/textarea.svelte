<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let placeholder = '';
	export let name = '';
	export let rows = 5;
	export let cols = 10;
	export let value = '';
</script>

<div class={twMerge('my-2 xl:w-full', $$props.class)}>
	<textarea
		aria-hidden="true"
		aria-label="text area"
		class="placeholder-slate-500 form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white
		bg-clip-padding border-solid border-primary-100 transition ease-in-out m-0 focus:text-slate-700 focus:bg-white border
		rounded-md focus:border-primary-100 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-500 resize-none"
		id="FormControlTextarea"
		{rows}
		wrap="hard"
		{cols}
		maxlength="300"
		on:input
		on:change
		on:focus
		on:keypress
		value={value ?? ''}
		{name}
		{placeholder}
	/>
</div>
