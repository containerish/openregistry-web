<script>
	export let styles = '';
</script>

<button on:click class="{styles} flex justify-center items-center w-full bg-transparent border-none py-2 px-6 text-lg 
text-slate-700 min-w-max">
	<slot />
</button>
