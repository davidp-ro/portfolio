<script>
  import "../app.postcss";

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  // Vercel Analytics
  inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<svelte:head>
  <title>David Pescariu</title>

  <!-- General Metas -->
  <link rel="canonical" href="https://davidpescariu.com/" />
  <meta name="title" content="David Pescariu - Portfolio" />
  <meta
    name="description"
    content="Hello! 👋 I'm a full-stack developer, student, co-founder & volunteer from Cluj-Napoca, Romania."
  />
  <meta name="author" content="David Pescariu" />

  <!-- Open Graph -->
  <meta property="og:title" content="David Pescariu - Portfolio" />
  <meta
    property="og:description"
    content="Hello! 👋 I'm a full-stack developer, student, co-founder & volunteer from Cluj-Napoca, Romania."
  />
  <meta property="og:url" content="https://davidpescariu.com/" />
  <meta property="og:image" content="https://davidpescariu.com/og-img.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://davidpescariu.com/" />
  <meta property="twitter:title" content="David Pescariu - Portfolio" />
  <meta
    property="twitter:description"
    content="Hello! 👋 I'm a full-stack developer, student, co-founder & volunteer from Cluj-Napoca, Romania."
  />
  <meta
    property="twitter:image"
    content="https://davidpescariu.com/og-img.png"
  />
</svelte:head>

<style global lang="postcss">
  body {
    @apply antialiased bg-base text-white selection:bg-accent-200 selection:text-base-800;
  }
</style>
