<script lang="ts">
	// throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	/** @type {import('./$types').LayoutData} */
	import { LayoutData } from './$types';

	/** @type {import('./$types').PageData} */
	export let data;

	
	// import type {User} from '../apis/auth';
	// import '../app.css';
	// import Footer from '$lib/footer.svelte';
	// import Navbar from '$lib/navbar.svelte';
	// import { userStore } from '$lib/userStore';
	// export let signinPath: string;
	// export let openSignInModal: boolean;
	// export let user: User;
	// export let authenticated: boolean = true;

	$: {
		LayoutData.userStore.setUser(LayoutData.user, LayoutData.authenticated);
	}
</script>

<main
	class="prose lg:w-screen uw:min-w-[55vw] uw:max-w-[50vw] flex justify-center flex-col selection:bg-brown-800
      selection:text-cream-50"
>
	<Navbar pathname={LayoutData.signinPath} {LayoutData.openSignInModal} />
	<slot />
	<Footer />
</main>
