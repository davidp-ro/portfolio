<!-- This wrapps each section -->

<script lang="typescript">
  export let id: string;
</script>

<section id={id} class="w-full px-6 pb-12 antialiased bg-gray-100">
  <div class="mx-auto max-w-7xl">
    <slot></slot>
  </div>
</section>
