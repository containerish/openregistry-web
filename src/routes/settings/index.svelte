<script context="module" lang="ts">
	export async function load({ session }) {
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}

		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/card.svelte';
	import UserIcon from '$lib/icons/user.svelte';
	import type { User } from '../../apis/auth';
	export let user: User;
</script>

<svelte:head>
	<title>User|Open Registry</title>
</svelte:head>

{#if user}
	<div class="min-h-[93vh] bg-cream-50">
		<div
			class="flex gap-5 space-x-10 min-w-full justify-start items-center py-28 my-20 px-20 bg-brown-500"
		>
			<div class="px-4" />
			<div>
				<UserIcon styles="h-24 w-24" />
			</div>
			<div class="flex-initial">
				<h1 class="text-4xl font-medium">{user.name}</h1>
				<div class="flex mt-3">
					<UserIcon styles="h-6 w-6" />
					<span class="text-lg mr-5">Community User</span>
					<span class="text-lg"> Joined Today</span>
				</div>
			</div>
		</div>
		<Card>
			<div class="rounded-xl flex flex-col w-3/4 flex bg-brown-400 px-20 py-8">
				<h1 class="text-2xl font-medium">Email Address</h1>
				<div>
					<input
						id="email"
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md placeholder-gray-400
                    text-gray-700 bg-white border rounded-md sm:mr-5 focus:border-brown-800
                    focus:outline-none focus:ring focus:ring-brown-700 focus:ring-opacity-40"
						disabled
						placeholder={user.email}
					/>

					<button
						class="px-6 py-2 text-lg font-medium tracking-wide text-gray-200 capitalize transition-colors
                     duration-200 transform bg-brown-800 rounded-md sm:mx-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
					>
						Edit
					</button>
				</div>
			</div>
		</Card>

		<Card>
			<div class="rounded-xl flex flex-col w-3/4 flex bg-brown-400 px-20 py-8 mt-5">
				<h1 class="text-2xl font-medium">Change Password</h1>
				<div class="flex flex-col">
					<input
						type="password"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                     sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                     focus:ring-opacity-40"
						placeholder="current password"
					/>

					<input
						type="password"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                     sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700 focus:ring-opacity-40"
						placeholder="new password"
					/>

					<input
						type="password"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                     sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                     focus:ring-opacity-40"
						placeholder="confirm password"
					/>

					<a class="text-brown-900 mt-2 text-lg" href="/home"><u>I forgot my password </u></a>
					<button
						class="w-32 px-6 py-2 mt-5 -ml-1.5 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
					>
						Save
					</button>
				</div>
			</div>
		</Card>

		<Card>
			<div class="rounded-xl flex flex-col w-3/4 flex bg-brown-400 px-20 py-8 mt-5 mb-20">
				<h1 class="text-2xl font-medium">Account Information</h1>
				<div class="flex flex-col">
					<span class="mt-2 text-brown-800 text-md"
						>This information will be public and visible to all users of OpenRegistry</span
					>
					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						placeholder="Full Name"
					/>

					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						placeholder="Company"
					/>

					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						placeholder="Location"
					/>

					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						placeholder="Profile Url"
					/>

					<input
						type="text"
						class="w-1/2 mt-5 px-4 py-3 -ml-1.5 text-md text-gray-700 bg-white border rounded-md
                    sm:mr-5 focus:border-brown-800 focus:outline-none focus:ring focus:ring-brown-700
                    focus:ring-opacity-40"
						placeholder="Github"
					/>

					<button
						class="w-32 px-6 py-2 mt-5 -ml-1.5 text-lg font-medium tracking-wide text-white capitalize
                    transition-colors duration-200 transform bg-brown-800 rounded-md sm:mr-2 hover:bg-brown-700 focus:outline-none focus:bg-brown-700"
					>
						Save
					</button>
				</div>
			</div>
		</Card>
	</div>
{/if}
