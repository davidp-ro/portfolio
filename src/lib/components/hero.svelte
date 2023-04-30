<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { sineIn } from "svelte/easing";
  import constants from "$lib/constants";
  
  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

<section class="mt-32 md:mt-64">
  {#if ready}
    <div
      transition:fade={{
        delay: constants.animations.heroDelaysMs[0],
        duration: constants.animations.heroDurationMs,
        easing: sineIn,
      }}
      class="font-bold uppercase sm:text-lg text-md text-accent-300"
    >
      Hi there! I'm David 👋
    </div>
    <div
      transition:fade={{
        delay: constants.animations.heroDelaysMs[1],
        duration: constants.animations.heroDurationMs,
        easing: sineIn,
      }}
      class="font-serif font-bold sm:text-8xl text-6xl"
    >
      I create digital products.
    </div>
    <p
      transition:fade={{
        delay: constants.animations.heroDelaysMs[2],
        duration: constants.animations.heroDurationMs,
        easing: sineIn,
      }}
      class="mt-10 font-light sm:text-2xl text-xl"
    >
      I'm a developer, student, <a
        href="https://www.prisma-safety.com/"
        target="_blank"
        rel="noopener noreferer"
      >
        co-founder
      </a> & volunteer from Cluj, 🇷🇴. Not necessarily in that order.
    </p>
  {/if}
</section>

<style lang="postcss">
  a {
    @apply font-normal;
  }
  a:hover {
    @apply transition-colors text-transparent bg-clip-text bg-gradient-to-r from-accent-100 to-accent-500;
  }
</style>
