<!-- This wrapps each section -->
<script lang="typescript">
  export let id: string;
  export let hasIsometricBackground = false;
</script>

<section
  {id}
  class="w-full px-6 pb-12 antialiased bg-gray-100 dark:bg-neutral-900 {hasIsometricBackground
    ? 'isometric'
    : ''}"
>
  <div class="mx-auto max-w-7xl">
    <slot />
  </div>
</section>

<style>
  .isometric {
    background-image: url("/assets/background.png");
    background-blend-mode: color-burn;
  }
</style>
