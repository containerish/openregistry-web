<script>
  let defaultStyles = " h-full w-full bg-gray-100 px-16 py-8 flex justify-center items-center"
  export let styles = ""
</script>
<section class={styles + defaultStyles}>
  <slot />
</section>
