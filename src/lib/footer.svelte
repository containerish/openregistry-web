<script>
	import Logo from './components/logo.svelte';
</script>

<footer class="bg-primary-700 p-10">
	<div class="container px-10 mx-auto half:px-0">
		<div class="flex items-center justify-between">
			<div class="flex gap-4 -mb-16">
				<a
					href="https://docs.openregistry.dev"
					target="_blank"
					rel="noreferrer"
					class="hover:no-underline hover:text-slate-300 text-3xl lg:text-6xl text-slate-100 tracking-tight"
				>
					Docs,
				</a>
				<a
					href="https://github.com/containerish/openregistry"
					target="_blank"
					rel="noreferrer"
					class="hover:no-underline hover:text-slate-300 text-3xl lg:text-6xl text-slate-100 tracking-tight"
				>
					Github,
				</a>
				<a
					href="https://twitter.com/containerish"
					target="_blank"
					rel="noreferrer"
					class="hover:no-underline hover:text-slate-300 text-3xl lg:text-6xl text-slate-100 tracking-tight"
				>
					Twitter,
				</a>
				<a
					href="https://discord.gg/Mx8HAazrHc"
					target="_blank"
					rel="noreferrer"
					class="hover:no-underline hover:text-slate-300 text-3xl lg:text-6xl text-slate-100 tracking-tight"
				>
					Discord
				</a>
			</div>

			<div class="ml-5">
				<a href="#top" class="cursor-pointer flex items-center hover:no-underline hover:opacity-80">
					<Logo type="light" />
				</a>
				<p class="max-w-md  mt-2 text-base lg:text-lg antialiased text-slate-200">
					Join us and become a part of <br />the decentralised future of internet
				</p>
			</div>
		</div>
	</div>

	<hr class="my-9 bg-gray-100" />

	<div>
		<p class="text-center text-slate-100">
			<a
				class="text-slate-100"
				href="https://github.com/containerish"
				target="_blank"
				rel="noreferrer"
			>
				© Containerish {new Date().getFullYear()}
			</a>
			- All rights reserved
		</p>
	</div>
</footer>
