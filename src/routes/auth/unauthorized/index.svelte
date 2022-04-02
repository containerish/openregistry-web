<script context="module">
	import { Auth } from '../../../apis/auth';
	const auth = new Auth();
	export async function load({}) {
		const { data } = await auth.GetUserWithSession();

		// send user back if they were here after good auth
		if (data) {
			return {
				status: 301,
				redirect: '/repositories'
			};
		}

		return {};
	}
</script>

<div class="bg-brown-200 flex-col w-full h-full flex justify-center items-center">
	<img class="w-4/6" src="/unauthorised.svg" alt="" />
</div>
