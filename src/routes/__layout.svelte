<script lang="ts">
	import Footer from '$lib/footer.svelte';
  import Navbar from '$lib/navbar.svelte';
	import '../app.css';
</script>

<main class="dark:bg-gradient-to-tl dark:from-brown-900 dark:to-brown-800 bg-gradient-to-tl from-brown-100 to-brown-300  w-full flex justify-center flex-col">
  <Navbar />
	<slot />
  <Footer />
</main>
