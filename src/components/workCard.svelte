<script lang="typescript">
  export let title: string;
  export let company: string;
  export let location: string;
  export let fromTo: string;
</script>

<div
  class="w-full px-6 py-6 mx-auto mt-10 bg-white dark:bg-neutral-800 border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3"
>
  <h3 class="text-lg font-bold text-pink-700 sm:text-xl md:text-2xl">
    {title}
    <span class="text-gray-700 dark:text-gray-300 sm:text-base md:text-xl">
      {company ? `- ${company}` : ''}{location ? `, ${location}` : ''}
    </span>
  </h3>
  <h5 class="text-gray-400 dark:text-gray-500">
    {fromTo ?? ''}
  </h5>
  <p class="mt-2 text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-normal">
    <slot />
  </p>
</div>
