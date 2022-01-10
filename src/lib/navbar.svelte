<script lang="ts">
	import Signin from "../components/signin.svelte";
	import Button from "./button.svelte";
	import Modal from "./modal.svelte";
  import Signup from "../components/signup.svelte";

	import { setContext } from 'svelte';

	let isLoading = false;
	let showSignInForm = false;
	let showSignUpForm = false;

	const toggleSignInForm = () => {
		showSignInForm = !showSignInForm
			console.log(showSignInForm)
	}

	const toggleSignUpForm = () => {
		showSignInForm = !showSignInForm
		showSignUpForm = !showSignUpForm
		console.log(showSignInForm, showSignUpForm)
	}

	setContext('toggleSignInForm', toggleSignInForm)
	setContext('toggleSignUpForm', toggleSignUpForm)

</script>

<header>
  <nav class="mx-10 apple:mx-16 uw:mx-28">
    <div class="container px-6 py-3 mx-auto uw:px-12">
      <div class="flex flex-col sm:flex-row md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <picture>
              <img class="lg:max-w-4xl" src="/logo.svg" alt="OpenRegistry-Logo">
            </picture>

            <!-- Search input on desktop screen -->
            <div class="hidden mx-10 lg:block">
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex sm:hidden">
            <button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div class="items-center sm:flex">
          <div class="flex flex-col mt-2 sm:flex-row md:mt-0 md:mx-1">
            <a class="my-1 border-b-2 border-black no-underline hover:no-underline font-poppins text-sm leading-5 text-brown-900 duration-500 transform dark:text-gray-100 md:mx-4 md:my-0 uw:text-xl uw:leading-10" href="#">Blog</a>
            <a class="my-1 border-b-2 border-black no-underline hover:no-underline text-sm leading-5 font-poppins text-[#241d19] duration-500 transform dark:text-gray-100 md:mx-4 md:my-0 uw:text-xl uw:leading-10" href="#">About</a>
            <a class="my-1 text-sm border-b-2 border-black no-underline hover:no-underline font-poppins leading-5 text-[#241d19] duration-500 transform dark:text-gray-100 md:mx-4 md:my-0 uw:text-xl uw:leading-10" href="#">Github</a>
          </div>

          <div class="flex items-center py-2 -mx-1 sm:mx-0 uw:py-4">
            <Button onClick={() => toggleSignInForm()} styles="text-gray-50" label="Sign In"/>
          </div>

          {#if showSignInForm}
            <Modal>
              <Signin />
            </Modal>
          {/if}

          {#if showSignUpForm}
            <Modal>
              <Signup />
            </Modal>
          {/if}

          <!-- Search input on mobile screen -->
          <div class="mt-3 sm:hidden">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>

              <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search">
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>


<style>
</style>
