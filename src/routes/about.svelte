<script context="module">
	import { browser, dev } from '$app/env';
	import Card from '$lib/card.svelte';
	import Circle from '$lib/icons/circle.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Github from '$lib/icons/github.svelte';
	import Reddit from '$lib/icons/reddit.svelte';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>About|Open Registry</title>
</svelte:head>

<Card styles="bg-brown-400">
	<div class="flex flex-col w-full min-h-[90vh] m-w-[70vw] mx-10 my-20">
		<div class="bg-brown-400 justify-start items-center px-10 py-10 mx-5 my-0 rounded-xl">
			<h1 class="text-5xl font-semibold text-brown-900 mb-8 ">
				Decentralisation is the Future! and we want to play a role in making it better
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
				<div class="container px-6 py-89 mx-auto">
					<div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
						<div
							class="px-12 py-8 transition-colors duration-200 transform border-none bg-brown-500 cursor-pointer rounded-xl
						hover:border-transparent group hover:bg-brown-700"
						>
							<div class="flex flex-col sm:-mx-4 sm:flex-row">
								<img
									class="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-cream-50"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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
								Building Keyboards in that order. Reads a lot of books(mostly/only Manga)
							</p>

							<div class="flex mt-4">
								<a
									href="#"
									class="-mt-0.5 mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Reddit"
								>
									<Reddit styles="h-10 w-10" />
								</a>

								<a
									href="https://twitter.com/_jsdp"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
								>
									<Twitter styles="h-6 w-6" />
								</a>

								<a
									href="https://github.com/jay-dee7"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Github"
								>
									<Github styles="h-6 w-6" />
								</a>
							</div>
						</div>

						<div
							class="px-12 py-8 transition-colors duration-200 transform border-none bg-brown-500 cursor-pointer rounded-xl
						hover:border-transparent group hover:bg-brown-700"
						>
							<div class="flex flex-col sm:-mx-4 sm:flex-row">
								<img
									class="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-cream-50"
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
									alt=""
								/>

								<div class="mt-4 sm:mx-4 sm:mt-0">
									<h1
										class="text-xl font-semibold text-brown-900 capitalize md:text-2xl group-hover:text-white"
									>
										Gunjan Valecha
									</h1>

									<p class="mt-2 text-brown-800 capitalize group-hover:text-cream-50">
										Also Engineer
									</p>
								</div>
							</div>

							<p class="mt-4 mb-8 text-brown-900 group-hover:text-cream-50">
								Can do a little bit of everything kind of Developer. Loves to design and develop
								web-apps as well as merchandise
							</p>

							<div class="flex mt-4 -mx-2">
								<a
									href="#"
									class="-mt-0.5 mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Reddit"
								>
									<svg
										class="w-7 h-7 fill-current"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											class="fill-brown-900"
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z"
										/>
									</svg>
								</a>

								<a
									href="https://twitter.com/guacaemole"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
								>
									<Twitter styles="h-6 w-6" />
								</a>

								<a
									href="https://github.com/guacamole"
									class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white"
									aria-label="Github"
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
