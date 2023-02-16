<script>
	import { TwitterIcon, GithubIcon } from '$lib/icons';
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>

<div class="flex bg-primary-50 ">
	<div
		class="flex flex-col w-full min-h-[1500px] desktop:min-h-max laptop:min-h-max half:min-h-max justify-start items-center mx-10 half:mx-4 my-20 
		desktop:mx-10 desktop:my-2 laptop:my-2 half:my-2 relative max-w-[2000px] mx-auto"
	>
		<div
			class="flex flex-col gap-8 laptop:gap-1 half:gap-1 justify-start min-h-[1000px] items-center text-center px-10 
			py-20 mx-5 my-10 desktop:my-1 laptop:max-w-[600px] half:max-w-[500px] laptop:py-2 half:py-4"
		>
			<div>
				<h1 class="text-5xl laptop:text-3xl half:text-3xl font-semibold text-primary-600">
					Decentralisation is the Future!
				</h1>
				<h1 class="text-5xl laptop:text-3xl half:text-3xl font-semibold text-primary-600 mb-8 ">
					and we want to play a role in making it better
				</h1>
				<span class="text-lg laptop:text-base half:text-base text-slate-700">
					Our Vision is derived and powered by the principals of Web 3.0 and Dworld of Dapps. With
					increasing awareness and adaption of distributed network, the worlds are moving towards a
					better future for everyone. OpenRegistry is an effort to bring a change with community's
					own container registry which is Open and Free to use. A true decentralised entity with
					promise of scalability, reliability and transparency.
				</span>
			</div>
			<div>
				<span class="text-lg laptop:text-base half:text-base text-slate-700">
					We started off as a fun project which eventually opened many doors for us. Although we are
					a small team, we are Passionate about what we do. We have learned, built and evolved our
					careers with help of OpenSource projects. With OpenRegistry, we want to built yet another
					project for public good.
				</span>
			</div>
			<span class="text-[40px] font-semibold text-primary-500 mt-14 laptop:text-3xl"
				>Get to know our Team</span
			>
			<div class="flex flex-col gap-20 mt-8 xl:mt-16 w-full">
				<div class="flex justify-center">
					<div
						class="flex flex-col gap-4 px-12 half:px-4 py-8 bg-white rounded-sm shadow-3xl mr-32 laptop:mr-0 half:mr-0 desktop:mr-0"
					>
						<div class="flex flex-col">
							<span
								class="text-xl font-semibold text-slate-700 capitalize min-w-[800px] half:min-w-max"
							>
								Jasdeep Singh
							</span>

							<p class=" text-slate-700 capitalize">Engineer</p>
						</div>

						<p class="text-center text-base half:text-sm text-slate-700">
							Incharge of backend development at OpenRegistry Loves developing Developer Tools.<br
							/>
							Digs Kernel development, Raspberry Pi Projects and Building Keyboards.
							<br />Reads a lot of books(mostly/only Manga)
						</p>

						<div class="flex justify-center z-50">
							<a
								href="https://twitter.com/_jsdp"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								target="_blank"
							>
								<TwitterIcon styles="h-10 w-10 mt-0.5" />
							</a>

							<a
								rel="noreferrer"
								href="https://github.com/jay-dee7"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon styles="h-12 w-12" />
							</a>
						</div>
					</div>
					<div class="w-1/2 absolute top-[35%] left-0 laptop:invisible half:invisible">
						<img src="about-1.svg" alt="about us" width="500px" />
					</div>
				</div>

				<div class="flex justify-center">
					<div
						class="flex flex-col gap-4 px-12 half:px-4 py-8 bg-white rounded-sm shadow-3xl ml-32 desktop:ml-0 laptop:ml-0 half:ml-0"
					>
						<div class="flex flex-col">
							<span
								class="text-xl font-semibold text-slate-700 capitalize min-w-[800px] half:min-w-max"
							>
								Gunjan Valecha
							</span>
							<p class="text-slate-700 capitalize">Engineer</p>
						</div>

						<p class=" text-slate-700 text-base half:text-sm text-center">
							Incharge of developer experience at OpenRegistry. Works mostly on UI/UX and <br
							/>frontend development. Loves illustrating, animating and designing merchandise
						</p>

						<div class="flex justify-center">
							<a
								href="https://twitter.com/guacaemole"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								target="_blank"
							>
								<TwitterIcon styles="h-10 w-10 mt-0.5" />
							</a>

							<a
								href="https://github.com/guacamole"
								rel="noreferrer"
								class="mx-2 text-primary-300 hover:text-primary-400"
								aria-label="Github"
								target="_blank"
							>
								<GithubIcon styles="h-12 w-12" />
							</a>
						</div>
					</div>

					<div
						class="w-1/2 absolute top-[60%] right-[-22%] desktop:right-[-18%] laptop:invisible half:invisible"
					>
						<img src="about-2.svg" alt="about us" width="500px" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
