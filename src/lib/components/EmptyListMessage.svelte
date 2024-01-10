<script lang="ts">
	export let description: string;
	export let title: string;
</script>

<div class="py-4 px-8 bg-primary-50 flex flex-col justify-center items-center gap-2 border-primary-100 border">
	<span class="text-slate-700 py-2 text-lg font-semibold">{@html title}</span>
	<span class="text-slate-700 py-2 text-center"> {@html description} </span>
</div>
