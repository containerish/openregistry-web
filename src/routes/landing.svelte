<script lang="ts">
	import { setContext } from 'svelte';
	import Hero from '../components/hero.svelte';
	import Overview from '../components/overview.svelte';
	import HowToIntro from '../components/how-to-intro.svelte';
	import HighLevelArchitecture from '../components/high-level-architecture.svelte';

	let showRegisterForm = false;
	let isLoading = false;

	function toggleRegisterForm() {
		showRegisterForm = !showRegisterForm;
	}

	const onClickRegister = () => {
		console.log('clicked register');
		isLoading = true;
		setTimeout(() => {
			toggleRegisterForm();
			isLoading = false;
		}, 3000);
	};

	/* <Overview /> */

	/* <HighLevelArchitecture /> */
	setContext('onClickRegister', onClickRegister);
</script>

<Hero />
<HowToIntro />
<Overview />
<HighLevelArchitecture />
