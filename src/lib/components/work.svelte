<script>
  import Visibility from "$lib/components/visibility.svelte";
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

  <h2 class="mt-4 font-serif font-bold sm:text-3xl text-2xl">
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
  >
    <ul class="ml-8 list-disc sm:max-w-[50vw]">
      <li>
        Manage our development team & implement the Prisma App (Flutter), Prisma
        Websites & Platforms (Svelte/SvelteKit) and all backend infrastructure -
        public and private facing REST APIs.
      </li>
      <li>
        Develop caching systems using HiveDB to decrease the mobile app's
        startup time by 5 times.
      </li>
      <li>
        Implement billing services with Stripe and authentication flows using
        Auth0.
      </li>
      <li>
        Handle CI / CD of our platforms - Front facing platforms on Netlify and
        backend infra on Heroku / Functions and Firebase or Supabase.
      </li>
    </ul>
  </WorkCard>

  <WorkCard
    title="Freelance Web Developer"
    company="Freelancing"
    period="Nov 2020 - Mar 2021"
  >
    <ul class="ml-8 list-disc">
      <li>
        Design & Implement mobile-first web experiences using Svelte suited to
        my client's needs.
      </li>
      <li>
        Increased traffic to their platforms by up to 80%, thus improving their
        long-term revenue and reach.
      </li>
      <li>Constantly engaged with my customers to ensure satisfaction.</li>
    </ul>
  </WorkCard>

  <!-- END:Professional Experience -->

  <!-- Projects -->

  <h2 class="mt-8 font-serif font-bold sm:text-3xl text-2xl">
    Open Source Projects
  </h2>

  <a
    class="resume-button"
    href="https://github.com/davidp-ro"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        fill="currentColor"
        d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
      />
    </svg>
    <span class="ml-2"> View GitHub Profile </span>
  </a>

  <!-- END:Projects -->
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
