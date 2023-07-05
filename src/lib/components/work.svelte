<script>
  import Visibility from "$lib/components/visibility.svelte";
  import Projects from "./projects.svelte";
  import WorkCard from "./workCard.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;
</script>

<div class="sm:mt-[75vh] mt-[50vh]" aria-hidden="true">
  <Visibility
    bind:hasObserverSupport
    visibilityUpdate={(state) => {
      // Only update one time (once visible)
      if (!hasChanged && state !== false) {
        hasChanged = true;
        isVisible = state;
      }
    }}
  />
</div>

<section
  class="custom-transition {!hasObserverSupport || isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">My Work</h1>

  <!-- Professional Experience -->

  <h2 class="mt-10 font-serif font-bold sm:text-3xl text-2xl">
    Professional Experience
  </h2>

  <a
    class="resume-button"
    href="/David Pescariu - Resume.pdf"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        fill="currentColor"
        d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
      />
    </svg>
    <span class="ml-2"> Download Résumé </span>
  </a>

  <WorkCard
    title="Co-Founder & (Lead) Full-Stack Developer"
    company="Prisma Safety"
    period="Apr 2021 - Present"
    bullets={[
      `Manage our development team & implement the Prisma App (Flutter), Prisma
        Websites & Platforms (Svelte/SvelteKit) and all backend infrastructure -
        public and private facing REST APIs.`,
      `Develop caching systems using HiveDB to decrease the mobile app's
        startup time by 5 times.`,
      `Implement billing services with Stripe and authentication flows using
        Auth0.`,
      `Handle CI / CD of our platforms - Front facing platforms on Netlify and
        backend infra on Heroku / Functions and Firebase or Supabase.`,
    ]}
  />

  <WorkCard
    title="Freelance Web Developer"
    company="Freelancing"
    period="Nov 2020 - Mar 2021"
    bullets={[
      `Design & Implement mobile-first web experiences using Svelte suited to
        my client's needs.`,
      `Increased traffic to their platforms by up to 80%, thus improving their
        long-term revenue and reach.`,
      `Constantly engaged with my customers to ensure satisfaction.`,
    ]}
  />

  <!-- END:Professional Experience -->

  <!-- Projects -->

  <h2 class="mt-24 font-serif font-bold sm:text-3xl text-2xl">
    Open Source Projects
  </h2>

  <Projects />

</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .resume-button {
    @apply flex flex-row w-min whitespace-nowrap mt-8 text-accent-300
      cursor-pointer select-none;
  }

  .resume-button:hover {
    @apply transition-colors text-accent-200;
  }
</style>
