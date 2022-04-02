<script>
	import Card from '$lib/card.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Github from '$lib/icons/github.svelte';
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>

<Card styles="bg-brown-400">
	<div class="flex flex-col w-full min-h-[90vh] m-w-[70vw] mx-10 half:mx-4 my-20">
		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-0 rounded-xl">
			<h1 class="text-5xl font-semibold text-brown-900">Decentralisation is the Future!</h1>
			<h1 class="text-5xl font-semibold text-brown-900 mb-8 ">
				and we want to play a role in making it better
			</h1>
			<span class="text-lg text-black">
				Our Vision is derived and powered by the principals of Web 3.0 and Dworld of Dapps. With
				increasing awareness and adaption of distributed network, the worlds are moving towards a
				better future for everyone. OpenRegistry is an effort to bring a change with community's own
				container registry which is Open and Free to use. A true decentralised entity with promise
				of scalability, reliability and transparency.
			</span>
			<div>
				<h1 class="text-3xl font-semibold text-brown-900 mt-4 mb-2">
					Help build an Open Source World with us
				</h1>
				<span class="text-lg text-black">
					We started off as a fun project which eventually opened many doors for us. Although we are
					a small team, we are Passionate about what we do. We have learned, built and evolved our
					careers with help of OpenSource projects. With OpenRegistry, we want to built yet another
					project for public good.
				</span>
			</div>
			<h1 class="text-5xl font-semibold text-brown-900 mt-14">Get to know our Team</h1>
		</div>
		<div class="flex flex-row items-center">
			<section class="bg-brown-400 rounded-xl mx-4">
				<div class="container px-6 half:px-0 py-89 mx-auto">
					<div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
						<div
							class="px-12 py-8 half:px-5 transition-colors duration-200 transform border-none bg-brown-500 rounded-xl
						hover:border-transparent group hover:bg-brown-700"
						>
							<div class="flex flex-col sm:-mx-4 sm:flex-row">
								<img
									class="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-brown-900"
									src="https://avatars.githubusercontent.com/u/10788442?v=4"
									alt=""
								/>

								<div class="mt-4 sm:mx-4 sm:mt-0">
									<h1
										class="text-xl font-semibold text-brown-900 capitalize md:text-2xl group-hover:text-white"
									>
										Jasdeep Singh
									</h1>

									<p class="mt-2 text-brown-800 capitalize group-hover:text-cream-50">Engineer</p>
								</div>
							</div>

							<p class="mt-4 text-brown-900 group-hover:text-cream-50">
								Loves developing Developer Tools. Digs Kernel development, Raspberry Pi Projects and
								Building Keyboards, in that order. Reads a lot of books(mostly/only Manga)
							</p>

							<div class="flex mt-4">
								<a
									href="https://twitter.com/_jsdp"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									target="_blank"
								>
									<Twitter styles="h-6 w-6" />
								</a>

								<a
									href="https://github.com/jay-dee7"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Github"
									target="_blank"
								>
									<Github styles="h-6 w-6" />
								</a>
							</div>
						</div>

						<div
							class="px-12 py-8 half:px-5 transition-colors duration-200 transform border-none bg-brown-500 rounded-xl
						hover:border-transparent group hover:bg-brown-700"
						>
							<div class="flex flex-col sm:-mx-4 sm:flex-row">
								<img
									class="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-cream-50"
									src="https://avatars.githubusercontent.com/u/68041753?v=4"
									alt=""
								/>

								<div class="mt-4 sm:mx-4 sm:mt-0">
									<h1
										class="text-xl font-semibold text-brown-900 capitalize md:text-2xl group-hover:text-white "
									>
										Gunjan Valecha
									</h1>

									<p class="mt-2 text-brown-800 capitalize group-hover:text-cream-50">
										Also Engineer
									</p>
								</div>
							</div>

							<p class="mt-5 mb-8 text-brown-900 group-hover:text-cream-50">
								Can do a little bit of everything kind of Developer. Loves to design and develop
								web-apps as well as merchandise
							</p>

							<div class="flex mt-4 -mx-2">
								<a
									href="https://twitter.com/guacaemole"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									target="_blank"
								>
									<Twitter styles="h-6 w-6" />
								</a>

								<a
									href="https://github.com/guacamole"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Github"
									target="_blank"
								>
									<Github styles="h-6 w-6" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</Card>
