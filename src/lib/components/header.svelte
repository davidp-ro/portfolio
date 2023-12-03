<script lang="ts">
  let menuOpen = false;
</script>

<header
  class="mt-10 mb-6 bg-base rounded-full px-10 py-5 text-xl bg-opacity-50 backdrop-blur-sm"
>
  <div class="inline-flex items-end">
    <span>david pescariu</span>
    <div class="ml-0.5 mb-1.5 rounded-full w-1 h-1 bg-accent-500" />
  </div>
</header>

{#if menuOpen}
  menu
{/if}
