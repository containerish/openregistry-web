<script lang="ts">
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
</script>

{#if browser}
	<div class="max-w-[230px]">
		<Carousel arrows={false} dots={false} autoplay autoplayDuration={5000}>
			<slot />
		</Carousel>
	</div>
{/if}
