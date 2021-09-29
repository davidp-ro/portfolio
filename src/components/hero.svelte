<script>
import Section from "./section.svelte";

</script>

<Section id="home">
    <div
      class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center"
    >
      <h1
        class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl"
      >
        <span class="inline md:block"> Hi there! </span>
        <span
          class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-pink-700 to-pink-600 md:inline-block"
        >
          I'm David Pescariu
        </span>
      </h1>
      <div
        class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg"
      >
        Student & Developer based in Cluj-Napoca, Romania.
      </div>
      <div class="flex flex-col items-center mt-12 text-center">
        <span class="relative inline-flex w-full md:w-auto">
          <a
            href="#contact"
            type="button"
            class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-pink-700 border border-transparent rounded-full md:w-auto hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-700"
          >
            Let's talk!
          </a>
        </span>
      </div>
    </div>
</Section>
