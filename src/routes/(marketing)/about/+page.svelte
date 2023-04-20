<script>
	import { TwitterIcon, GithubIcon } from '$lib/icons';
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>

<div class="flex bg-primary-50 justify-center items-center relative">
	<div class="absolute hidden xl:flex top-[40%] justify-between w-full max-w-[1700px] mx-auto">
		<div class="">
			<img src="about-1.svg" alt="about us" width="500px" />
		</div>
		<div class="mt-52">
			<img src="about-2.svg" alt="about us" width="500px" />
		</div>
	</div>
	<div
		class="flex flex-col w-full justify-start items-center my-2 lg:my-20 max-w-[2000px] mx-auto z-20"
	>
		<div
			class="flex flex-col gap-1 lg:gap-8 justify-start min-h-[1000px] items-center text-center px-10
			py-6 mx-5 my-3 max-w-[600px] lg:max-w-max"
		>
			<div class="max-w-5xl">
				<h1 class="text-3xl lg:text-5xl font-semibold text-primary-600">
					Decentralisation is the Future!
				</h1>
				<h1 class="text-3xl lg:text-5xl font-semibold text-primary-600 mb-8">
					and we want to play a role in making it better
				</h1>
				<span class="text-base lg:text-lg text-slate-800">
					Our Vision is derived and powered by the principals of Web 3.0 and Dworld of Dapps. With
					increasing awareness and adaption of distributed network, the worlds are moving towards a
					better future for everyone. OpenRegistry is an effort to bring a change with community's
					own container registry which is Open and Free to use. A true decentralised entity with
					promise of scalability, reliability and transparency.
				</span>
			</div>
			<div class="max-w-5xl">
				<span class="text-base lg:text-lg text-slate-800">
					We started off as a fun project which eventually opened many doors for us. Although we are
					a small team, we are Passionate about what we do. We have learned, built and evolved our
					careers with help of OpenSource projects. With OpenRegistry, we want to built yet another
					project for public good.
				</span>
			</div>

			<span class="text-3xl lg:text-4xl font-semibold text-primary-600 mt-14">
				Get to know our Team
			</span>
			<div class="flex flex-col gap-20 mt-8 w-full">
				<div class="flex justify-center">
					<div class="flex flex-col gap-4 px-4 lg:px-12 py-8 bg-white rounded-sm shadow-3xl">
						<div class="flex flex-col">
							<span class="text-xl font-semibold text-primary-500 capitalize"> Jasdeep Singh </span>

							<p class=" text-slate-700 capitalize">Engineer</p>
						</div>

						<p class="text-center text-base text-slate-700">
							Incharge of backend development at OpenRegistry Loves developing Developer Tools.<br
							/>
							Digs Kernel development, Raspberry Pi Projects and Building Keyboards.
							<br />Reads a lot of books(mostly/only Manga)
						</p>

						<div class="flex justify-center">
							<a
								aria-label="twitter link"
								href="https://twitter.com/_jsdp"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								target="_blank"
							>
								<TwitterIcon class="h-10 w-10 mt-0.5" />
							</a>

							<a
								rel="noreferrer"
								href="https://github.com/jay-dee7"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon class="h-12 w-12" />
							</a>
						</div>
					</div>
				</div>

				<div class="flex justify-center">
					<div class="flex flex-col gap-4 px-4 lg:px-12 py-8 bg-white rounded-sm shadow-3xl">
						<div class="flex flex-col">
							<span class="text-xl font-semibold text-primary-500 capitalize"> Gunjan Valecha </span>
							<p class="text-slate-700 capitalize">Engineer</p>
						</div>

						<p class=" text-slate-700 text-base text-center">
							Incharge of developer experience at OpenRegistry. Works mostly on UI/UX and <br
							/>frontend development. Loves illustrating, animating and designing merchandise
						</p>

						<div class="flex justify-center">
							<a
								aria-label="twitter link"
								href="https://twitter.com/guacaemole"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								target="_blank"
							>
								<TwitterIcon class="h-10 w-10 mt-0.5" />
							</a>

							<a
								href="https://github.com/guacamole"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon class="h-12 w-12" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
