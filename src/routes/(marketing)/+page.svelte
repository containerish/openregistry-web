<script lang="ts">
	import { Hero, Overview, HowToIntro, HighLevelArchitecture } from '$lib/components';
	import Steps from '$lib/components/steps.svelte';
</script>

<svelte:head>
	<title>OpenRegistry | Home</title>
</svelte:head>

<Hero />
<HowToIntro />
<Overview />
<Steps/>
<HighLevelArchitecture />
