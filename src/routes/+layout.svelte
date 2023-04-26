<script>
  import "../app.postcss";
</script>

<slot />

<style global lang="postcss">
  body {
    @apply antialiased bg-base text-white selection:bg-accent-200 selection:text-base-800;
  }
</style>
