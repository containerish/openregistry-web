<script>
	let defaultStyles =
		' w-full px-16 flex justify-center items-center';
	export let styles = '';
	export let id='';
</script>

<section id={id} class={styles + defaultStyles}>
	<slot />
</section>
