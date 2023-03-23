<script>
	export let styles = '';
    export let href = '';
</script>

<!-- lg:h-24 lg:w-[170px] -->
<a
	href={href}
	class="{styles} flex items-center justify-center border border-slate-800 rounded-sm delay-100 ease-in-out 
	hover:no-underline hover:shadow-2xl hover:shadow-primary-200 h-20 w-[160px] lg:h-24 lg:w-[170px]"
>
	<slot />
</a>
