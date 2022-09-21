<script>
	let defaultStyles =
		' w-full px-16 flex justify-center items-center';
	export let styles = '';
</script>

<section class={styles + defaultStyles}>
	<slot />
</section>
