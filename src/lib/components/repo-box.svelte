<script>
	export let styles = '';
	export let href = '';
</script>

<!-- lg:h-24 lg:w-[170px] -->
<a
	{href}
	class="{styles} transition-all flex items-center justify-center border border-slate-800 rounded-sm delay-100 ease-in
	hover:no-underline hover:shadow-3xl hover:shadow-primary-100 h-20 w-[160px] lg:h-24 lg:w-[170px]"
>
	<slot />
</a>
