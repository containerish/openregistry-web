<script>
	import { TwitterIcon, GithubIcon } from '$lib/icons';
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>

<div class="flex flex-col xl:flex-row bg-primary-50/30 justify-center items-center">
	<!-- <div class="flex xl:absolute xl:flex top-[40%] justify-between w-full max-w-[1700px] mx-auto">
		<div class="">
			<img src="about-1.svg" alt="about us" width="500px" />
		</div>
		<div class="xl:mt-52">
			<img src="about-2.svg" alt="about us" width="500px" />
		</div>
	</div> -->
	<div
		class="flex flex-col w-full justify-start items-center my-2 lg:my-9 max-w-[1600px] mx-auto z-20 relative"
	>
		<div
			class="flex flex-col gap-1 lg:gap-8 justify-start min-h-[1000px] items-center text-center md:px-9
			py-6 mx-5 my-3 max-w-[600px] lg:max-w-max"
		>
			<div class="max-w-5xl">
				<h1 class="text-4xl font-semibold text-primary-600">
					Decentralisation is the Future!
				</h1>
				<h1 class="text-4xl font-semibold text-primary-600 mb-8">
					and we want to play a role in making it better
				</h1>
				<span class="text-base text-slate-800">
					Our Vision is derived and powered by the principals of Web 3.0 and Dworld of Dapps. With
					increasing awareness and adaption of distributed network, the worlds are moving towards a
					better future for everyone. OpenRegistry is an effort to bring a change with community's
					own container registry which is Open and Free to use. A true decentralised entity with
					promise of scalability, reliability and transparency.
				</span>
			</div>
			<div class="max-w-5xl">
				<span class="text-base text-slate-800">
					We started off as a fun project which eventually opened many doors for us. Although we are
					a small team, we are Passionate about what we do. We have learned, built and evolved our
					careers with help of OpenSource projects. With OpenRegistry, we want to built yet another
					project for public good.
				</span>
			</div>

			<span class="text-3xl font-semibold text-primary-600 mt-14">
				Get to know our Team
			</span>
			<div class="flex flex-col gap-20 mt-8 w-full">
				<div class="flex flex-col md:flex-row justify-center items-center">
					<div class="flex xl:absolute xl:flex top-[40%] left-0 -z-50">
						<div class="">
							<img src="about-1.svg" alt="about us" class="w-[300px] md:w-[500px]" />
						</div>
					</div>

					<div class="flex flex-col gap-4 px-4 lg:px-12 py-8 bg-white/90 rounded-sm shadow-3xl">
						<div class="flex flex-col">
							<span class="text-xl font-semibold text-primary-500 capitalize"> Jasdeep Singh </span>

							<p class=" text-slate-700 capitalize">Engineer</p>
						</div>

						<p class="text-center text-sm lg:text-base text-slate-700">
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
								<TwitterIcon class="h-5 w-5 lg:h-10 lg:w-10 mt-0.5" />
							</a>

							<a
								rel="noreferrer"
								href="https://github.com/jay-dee7"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon class="h-6 w-6 lg:h-12 lg:w-12" />
							</a>
						</div>
					</div>
				</div>

				<div class="flex flex-col-reverse lg:flex-row justify-center items-center">
					<div class="flex flex-col gap-4 px-4 lg:px-12 py-8 bg-white/90 rounded-sm shadow-3xl">
						<div class="flex flex-col">
							<span class="text-xl font-semibold text-primary-500 capitalize"> Gunjan Valecha </span>
							<p class="text-slate-700 capitalize">Engineer</p>
						</div>

						<p class=" text-slate-700 text-sm lg:text-base text-center">
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
								<TwitterIcon class="h-5 w-5 lg:h-10 lg:w-10 mt-0.5" />
							</a>

							<a
								href="https://github.com/guacamole"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon class="h-6 w-6 lg:h-12 lg:w-12" />
							</a>
						</div>
					</div>
					<div class="flex xl:absolute xl:flex top-[41%] right-0 justify-end items-center -z-50">
						<div class="xl:mt-52 justify-self-end">
							<img src="about-2.svg" alt="about us" class="w-[300px] md:w-[500px]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
