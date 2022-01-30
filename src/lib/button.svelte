<script>
	export let label = '';
	export let onClick = () => {};
	export let styles = '';
	export let isLoading = false;
	export let type ='';
</script>

<button
	{type}
	on:click={onClick}
	class="{styles} border-none tracking-wider btn items-center px-4 py-2 font-normal leading-6 text-md shadow rounded-md transition ease-in-out duration-150"
>
	{label}
</button>

<style>
	.btn {
		background-color: #55443a;
	}
</style>
