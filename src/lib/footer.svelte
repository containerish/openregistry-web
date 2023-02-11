<script>
	import { GithubIcon, DiscordIcon, TwitterIcon } from './icons';
	import Logo from './components/logo.svelte';
</script>

<footer class="bg-primary-700">
	<div class="container px-10 pb-8 pt-12 mx-auto half:px-0">
		<div class="flex justify-center">
			<div class="w-full -mx-6">
				<div class="px-6 flex justify-between pb-8">
					<div>
						<div
							on:keydown={() => {}}
							on:click={() => goto('/')}
							class="cursor-pointer flex items-center half:ml-5"
						>
							<Logo type="light" />
						</div>
						<p class="max-w-md mt-2 text-lg desktop:text-[16px] antialiased text-slate-200">
							Join us and become a part of <br />the decentralised future of internet
						</p>
					</div>
					<div />
				</div>

				<div class="mt-6 lg:mt-0 lg:flex-1 px-6">
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 desktop:text-sm">
						<div>
							<span class="text-white pb-2 font-semibold uppercase">About</span>
							<a
								href="https://blog.openregistry.dev"
								target="_blank"
								class="block mt-2 text-gray-600 hover:underline text-slate-400"
								rel="noreferrer">Blog</a
							>
							<a
								href="https://github.com/containerish"
								target="_blank"
								class="block mt-2 text-gray-100 hover:underline cursor-pointer text-slate-400"
								rel="noreferrer">Containerish</a
							>
						</div>

						<div>
							<span class="text-white pb-2 uppercase font-semibold">Developers</span>
							<a
								href="https://blog.openregistry.dev"
								target="_blank"
								class="block mt-2 hover:underline text-slate-400"
								rel="noreferrer">Docs</a
							>
							<a
								href="https://github.com/containerish/OpenRegistry/discussions"
								target="_blank"
								class="block mt-2 hover:underline text-slate-400"
								rel="noreferrer">Github Discussions</a
							>
						</div>

						<div>
							<span class="text-white pb-2 uppercase font-semibold">Community</span>
							<span
								on:click={() => window.open('https://ipfs.tech', '_blank')}
								on:keypress={() => window.open('https://ipfs.tech', '_blank')}
								class="block mt-2 text-slate-400 hover:underline cursor-pointer">IPFS</span
							>
							<span
								on:click={() => window.open('https://akash.network', '_blank')}
								on:keypress={() => window.open('https://akash.network', '_blank')}
								class="block mt-2 text-slate-400 hover:underline cursor-pointer">Akash Network</span
							>
						</div>

						<div>
							<span class="text-white pb-2 uppercase font-semibold">Contact Us</span>
							<span class="block mt-2 text-slate-400 hover:underline">team@openregistry.dev</span>
							<div class="flex justify-start items-center mt-4 -mx-2">
								<a
									href="https://twitter.com/containerish"
									target="_blank"
									class="mx-2 text-white hover:text-gray-500"
									aria-label="Twitter"
									rel="noreferrer"
								>
									<TwitterIcon styles='desktop:w-7'/>
								</a>
								<a
									href="https://github.com/containerish/OpenRegistry.git"
									target="_blank"
									class="mx-2 text-white hover:text-gray-500"
									aria-label="Github"
									rel="noreferrer"
								>
									<GithubIcon styles="w-11 h-11 desktop:w-8" />
								</a>
								<a
									href="https://discord.gg/Mx8HAazrHc"
									target="_blank"
									class="mx-2 text-white hover:text-gray-500"
									aria-label="Discord"
									rel="noreferrer"
								>
									<DiscordIcon styles='desktop:w-7'/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<hr class="h-px my-6 bg-gray-300 border-none" />

		<div>
			<p class="text-center text-primary-700">
				<a
					class="text-primary-700"
					href="https://github.com/containerish"
					target="_blank"
					rel="noreferrer"
				>
					© Containerish {new Date().getFullYear()}
				</a>
				- All rights reserved
			</p>
		</div>
	</div>
</footer>
