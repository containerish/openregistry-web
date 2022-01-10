<script lang="ts">
  import Card from '$lib/card.svelte';
import Terminal from '$lib/terminal.svelte';
  import { setContext } from 'svelte';

  import Register from '../components/register.svelte';
  import Button from '../lib/button.svelte';

  let showRegisterForm = false;
  let isLoading = false;

  function toggleRegisterForm() {
    showRegisterForm = !showRegisterForm
  }

  const onClickRegister = () => {
    console.log('clicked register')
    isLoading = true
    setTimeout(() => {
      toggleRegisterForm()
      isLoading = false
    }, 3000)
  }

  setContext('onClickRegister', onClickRegister)

</script>

<style>
  .padding-y {
    padding: 2% 0%;
  }
  .padding-x {
    padding: 0% 2%;
  }
</style>

<div class="container uw:py-44 apple:py-8">
  <Terminal />
  <div class="h-full w-full mx-16 uw:mx-32">
  <div class="items-center lg:flex">

    <div class="w-full min-w-100 z-30">
      <div class="2xl:max-w-2xl ml-8 mt-20">
        <h2 class="font-poppins text-left text-black dark:text-gray-50 whitespace-nowrap font-bold text-7xl">A Decentralised</h2>
        <h2 class="font-poppins text-left text-black dark:text-gray-50 whitespace-nowrap font-bold text-7xl">Container Registry</h2>
        <p class="font-poppins text-left text-gray-700 dark:text-gray-200 text-xl mt-4 mb-20">Store, Download, and Share your container images with decentralized Container Registry
        </p>

        {#if showRegisterForm}
          <div class="flex">
            <Register {isLoading} />
          </div>
        {/if}

        {#if !showRegisterForm}
          <Button onClick={toggleRegisterForm} styles="px-8 opacity-75 float-left py-5 text-lg font-medium leading-5 text-center text-gray-50 transition-colors duration-200 transform bg-black rounded-md md:w-auto no-underline" label="Register for Beta"/>
        {/if}
      </div>
    </div>

    <div class="flex right-48 items-center relative justify-center z-0 mr-20 w-11/12 lg:mt-0 lg:w-1/2">
      <img class="h-11/12 mr-28 lg:max-w-4xl" src="/hero.svg" alt="OpenRegistry-dev.svg">
    </div>
  </div>
  </div>
</div>

<Card styles="bg-brown-200">
  <div class="h-full w-full flex flex-col justify-center items-center">

    <div class="flex justify-between items-center py-4">
      <div class="w-1/2 mx-8 flex justify-center">
        <picture>
          <img src="operations.svg" alt="Operations" />
        </picture>
      </div>
      <div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
        <h3 class="font-poppins text-center dark:text-gray-800 whitespace-nowrap font-normal pb-4 text-4xl">Operations</h3>
        <p class="font-lato text-center font-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center py-4">
      <div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
        <h3 class="font-poppins text-center dark:text-gray-800 whitespace-nowrap font-normal pb-4 text-4xl">Collaborations</h3>
        <p class="font-lato text-center font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>
      </div>
      <div class="w-1/2">
        <picture>
          <img src="collaborations.svg" alt="Collaborations" />
        </picture>
      </div>
    </div>

    <div class="flex justify-between items-center py-4">
      <div class="w-1/2 mx-8">
        <picture>
          <img src="storage.svg" alt="Storage" />
        </picture>
      </div>
      <div class="w-1/2 mx-8 flex justify-center flex-col lg:max-w-2xl">
        <h3 class="font-poppins text-center dark:text-gray-800 whitespace-nowrap font-normal pb-4 text-4xl">Storage</h3>
        <p class="font-lato text-center font-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        </p>
      </div>
    </div>

  </div>
</Card>

<Card styles="bg-brown-400">
  <div class="h-full w-full flex flex-col justify-center items-center">

    <div class="pt-16 w-1/2">
      <h3 class="font-poppins text-center dark:text-gray-800 whitespace-nowrap font-normal pb-4 text-5xl">
        High Level Architecture
      </h3>
        <p class="font-lato text-center font-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        </p>
    </div>

    <div>
      <picture>
        <img src="/high-level-arch.png" alt="OpenRegistry High Level Architecture Diagram" />
      </picture>
    </div>

  </div>
</Card>
