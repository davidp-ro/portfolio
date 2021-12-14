<script>
import { darkMode } from "../stores";

  import Section from "./section.svelte";
</script>

<Section id="home" hasIsometricBackground={true}>
  <div class="fullheight select-none">
    <div
      class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center"
    >
      <h1
        class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 dark:text-gray-300 md:text-center sm:leading-none md:text-6xl lg:text-7xl"
      >
        <span class="inline md:block"> Hi there! </span>
        <span
          class="text-6xl md:text-7xl lg:text-8xl relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-pink-700 md:inline-block"
        >
          I'm David Pescariu
        </span>
        
      </h1>
      <div
        class="mx-auto mt-5 text-gray-500 dark:text-gray-400 md:mt-12 md:max-w-lg md:text-center lg:text-lg"
      >
        Student & Developer based in Cluj-Napoca, Romania.
      </div>
      <div class="flex flex-col items-center mt-12 text-center">
        <span class="relative inline-flex w-full md:w-auto">
          <a
            href="#contact"
            type="button"
            class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-gradient-to-br from-purple-700 to-pink-700 hover:from-purple-700 hover:to-pink-600 shadow {$darkMode ? 'shadow-fuchsia-500' : 'shadow-slate-500'} border border-transparent rounded-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-700"
          >
            Let's talk!
          </a>
        </span>
        <span class="floaty relative inline-flex w-5 mt-10 text-pink-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M143 256.3 7 120.3a23.9 23.9 0 0 1 0-33.9l22.6-22.6a23.9 23.9 0 0 1 33.9 0l96.4 96.4 96.4-96.4a23.9 23.9 0 0 1 33.9 0L313 86.3a23.9 23.9 0 0 1 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192 136-136a23.9 23.9 0 0 0 0-33.9l-22.6-22.6a23.9 23.9 0 0 0-33.9 0L160 352.1l-96.4-96.4a23.9 23.9 0 0 0-33.9 0L7 278.3a23.9 23.9 0 0 0 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</Section>

<style>
  .fullheight {
    height: 80vh;
  }

  .floaty {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-15px);
    }
    100% {
      transform: translatey(0px);
    }
  }
</style>
