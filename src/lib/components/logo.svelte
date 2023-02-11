<script>
	export let type = 'light';
</script>

{#if type == 'light'}
	<picture class="flex items-center gap-2">
		<img
			class="w-[60px] desktop:w-[40px] laptop:w-[40px] half:w-[40px] lg:max-w-4xl"
			src="/logo-light.png"
			alt="OpenRegistry-Logo"
		/>
		<span class="text-3xl desktop:text-xl laptop:text-xl half:text-xl font-semibold text-white">
			OpenRegistry</span
		>
	</picture>
{/if}

{#if type == 'dark'}
	<picture class="flex items-center gap-2">
		<img
			class="w-[60px] desktop:w-[40px] laptop:w-[40px] half:w-[40px] lg:max-w-4xl"
			src="/logo-new.png"
			alt="OpenRegistry-Logo"
		/>
		<span
			class="text-3xl desktop:text-xl laptop:text-xl half:text-xl font-semibold text-primary-500"
		>
			OpenRegistry</span
		>
	</picture>
{/if}
