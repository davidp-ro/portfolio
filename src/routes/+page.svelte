<script>
  import BackgroundBlob from "$lib/components/backgroundBlob.svelte";
  import Hero from "$lib/components/hero.svelte";
  import Socials from "$lib/components/socials.svelte";
  import Work from "$lib/components/work.svelte";
  import Footer from "$lib/components/footer.svelte";
  import GetInTouch from "$lib/components/getInTouch.svelte";
</script>

<BackgroundBlob />

<main class="absolute top-0 left-0 z-10 w-full h-full">
  <div class="md:max-w-6xl xl:mx-auto lg:mx-48 md:mx-32 sm:mx-24 mx-10">
    <Hero />
    <Socials />

    <Work />
    <GetInTouch />

    <Footer />
  </div>
</main>
