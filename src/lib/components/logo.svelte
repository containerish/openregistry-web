<script>
	export let type = 'light';
</script>

{#if (type == 'light')}
	<picture class="flex items-center gap-2">
		<img
			class="w-[40px] apple:w-[60px] half:w-[40px] lg:max-w-4xl"
			src="/logo-light.png"
			alt="OpenRegistry-Logo"
		/>
		<span class="text-xl apple:text-3xl font-semibold text-white"> OpenRegistry</span>
	</picture>
{/if}

{#if (type == 'dark')}
	<picture class="flex items-center gap-2">
		<img
			class="w-[40px] apple:w-[60px] half:w-[40px] lg:max-w-4xl"
			src="/logo-new.png"
			alt="OpenRegistry-Logo"
		/>
		<span class="text-xl apple:text-3xl font-semibold text-primary-500"> OpenRegistry</span>
	</picture>
{/if}
