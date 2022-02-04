<script>
	import Discord from '$lib/icons/discord.svelte';
	import Github from '$lib/icons/github.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
</script>

<footer class="bg-gray-50 dark:bg-brown-800 dark:opacity-70">
	<div class="container px-10 pb-8 pt-12 mx-auto half:px-0">
		<div class="flex justify-center">
			<div class="w-full -mx-6">
				<div class="px-6 flex justify-between pb-8">
					<div>
						<picture>
							<source srcset="/logo-light.svg" media="(prefers-color-scheme: dark)" />
							<img class="lg:max-w-4xl" src="/logo.svg" alt="OpenRegistry-Logo" />
						</picture>
						<p class="max-w-md mt-2 text-gray-500 dark:text-gray-300">
							Join us and become a part of <br />the decentralised future of internet
						</p>
					</div>
					<div />
				</div>

				<div class="mt-6 lg:mt-0 lg:flex-1 px-6">
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
						<div>
							<h3 class="text-gray-700 pb-2 font-semibold uppercase dark:text-white">About</h3>
							<a
								href="https://blog.openregistry.dev"
								target="_blank"
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline">Blog</a
							>
							<a
								href="https://github.com/containerish"
								target="_blank"
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
								>Containerish</a
							>
							<a
								href="#"
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
								>Brand Assets</a
							>
						</div>

						<div>
							<h3 class="text-gray-700 pb-2 uppercase font-semibold dark:text-white">Developers</h3>
							<a
								href="https://blog.openregistry.dev"
								target="_blank"
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline">Docs</a
							>
							<a
								href="https://github.com/containerish/OpenRegistry/discussions"
								target="_blank"
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
								>Github Discussions</a
							>
						</div>

						<div>
							<h3 class="text-gray-700 pb-2 uppercase font-semibold dark:text-white">Community</h3>
							<span
								on:click={() => window.open('https://siasky.net/developers', '_blank')}
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
								>Skynet</span
							>
							<span
								on:click={() => window.open('https://akash.network', '_blank')}
								class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
								>Akash Network</span
							>
						</div>

						<div>
							<h3 class="text-gray-700 pb-2 uppercase font-semibold dark:text-white">Contact Us</h3>
							<span class="block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
								>team@openregistry.dev</span
							>
							<div class="flex mt-4 -mx-2">
								<a
									href="https://twitter.com/containerish"
									target="_blank"
									class="mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
									aria-label="Twitter"
								>
									<Twitter />
								</a>
								<a
									href="https://github.com/containerish/OpenRegistry.git"
									target="_blank"
									class="mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
									aria-label="Github"
								>
									<Github />
								</a>
								<a
									href="https://discord.gg/Mx8HAazrHc"
									target="_blank"
									class="mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
									aria-label="Discord"
								>
									<Discord />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<hr class="h-px my-6 bg-gray-300 border-none dark:bg-brown-50" />

		<div>
			<p class="text-center text-gray-800 dark:text-white">
				© Containerish 2022 - All rights reserved
			</p>
		</div>
	</div>
</footer>
