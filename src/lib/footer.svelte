<script>
	import Logo from './components/logo.svelte';
</script>

<footer class="bg-primary-700 p-10 z-50">
	<div class=" mx-auto">
		<div class="flex items-center justify-between gap-12 lg:gap-0">
			<div class="mb-0 flex flex-col gap-2 lg:flex-row lg:-mb-16 lg:gap-4">
				<a
					href="/about"
					target="_blank"
					rel="noreferrer"
					class="text-3xl lg:text-4xl tracking-tight text-slate-100 hover:text-primary-100 hover:no-underline"
				>
					About,
				</a>
				<a
					href="/faq"
					target="_blank"
					rel="noreferrer"
					class="text-3xl lg:text-4xl tracking-tight text-slate-100 hover:text-primary-100 hover:no-underline"
				>
					FAQs,
				</a>
				<a
					href="https://github.com/containerish/openregistry"
					target="_blank"
					rel="noreferrer"
					class="text-3xl lg:text-4xl tracking-tight text-slate-100 hover:text-primary-100 hover:no-underline"
				>
					Github,
				</a>
				<a
					href="https://twitter.com/containerish"
					target="_blank"
					rel="noreferrer"
					class="text-3xl lg:text-4xl tracking-tight text-slate-100 hover:text-primary-100 hover:no-underline"
				>
					Twitter,
				</a>
				<a
					href="https://discord.gg/Mx8HAazrHc"
					target="_blank"
					rel="noreferrer"
					class="text-3xl lg:text-4xl tracking-tight text-slate-100 hover:text-primary-100 hover:no-underline"
				>
					Discord
				</a>
			</div>

			<div class="md:ml-5">
				<Logo type="light" />
				<p class="mt-2 max-w-md text-slate-200 antialiased lg:text-lg ml-5 md:ml-0">
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
