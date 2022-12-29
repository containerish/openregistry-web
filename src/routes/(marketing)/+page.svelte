<script lang="ts">
	import { Hero, Overview, HowToIntro, HighLevelArchitecture } from '$lib/components';
	import Navbar from '$lib/navbar.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!-- <Navbar openSignInModal={false} form={{ data: form?.data, errors: form?.errors }} /> -->
<Hero />
<HowToIntro />
<Overview />
<HighLevelArchitecture />
