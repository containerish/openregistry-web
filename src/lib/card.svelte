<script>
	let defaultStyles = ' w-full flex justify-center items-center';
	export let styles = '';
	export let id = '';
</script>

<section {id} class={styles + defaultStyles}>
	<slot />
</section>
