<script>
import { darkMode } from "../stores";

  import Section from "./section.svelte";
</script>

<Section id="about">
  <div class="show-on-scroll flex flex-wrap items-center sm:-mx-3">
    <div class="w-full md:w-1/2 md:px-3">
      <div
        class="w-full mt-10 md:mt-20 pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
      >
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          <span class="block xl:inline"> Who am I? </span>
        </h1>
        <p
          class="mx-auto text-base text-gray-600 dark:text-gray-400 sm:max-w-md lg:text-xl md:max-w-3xl"
        >
          I'm a high school student in Cluj-Napoca, and the head of development
          at <a class="font-semibold" href="https://prisma-safety.netlify.app/">
            Prisma.
          </a>
        </p>
        <p
          class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-l md:max-w-3xl"
        >
          I'm also quite a big fan of Hackathons and ❤️ Open Source
        </p>
      </div>
    </div>

    <div class="overflow-hidden rounded-full {$darkMode ? 'shadow-lg shadow-gray-700' : 'shadow-2xl'} w-60 m-auto md:mt-20">
      <img src="assets/profile.jpg" alt="Profile" />
    </div>
  </div>
</Section>
