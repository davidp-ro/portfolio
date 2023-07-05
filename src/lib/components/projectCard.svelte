<script lang="ts" context="module">
  export type Tag =
    | "OpenAI"
    | "Web"
    | "Mobile"
    | "Python"
    | "Embedded"
    | "Library";
</script>

<script lang="ts">
  import ProjectCardButtons from "./projectCardButtons.svelte";

  export let title: string;
  export let description: string;
  export let image: string;
  export let demoLink: string | null;
  export let repoLink: string;
  export let tags: Tag[];

  const getClassesForTag = (tag: Tag) => {
    switch (tag) {
      case "OpenAI":
        return "bg-red-50 text-red-600";
      case "Web":
        return "bg-orange-50 text-orange-600";
      case "Mobile":
        return "bg-lime-50 text-lime-600";
      case "Python":
        return "bg-cyan-50 text-cyan-600";
      case "Embedded":
        return "bg-teal-50 text-teal-600";
      case "Library":
        return "bg-violet-50 text-violet-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };
</script>

<article
  class="flex mx-2 md:mx-0 my-8 rounded-lg bg-[#070a0d] bg-opacity-60 shadow"
>
  <div class="flex flex-col md:w-[21rem]">
    <img
      src={image}
      class="aspect-video object-cover rounded-t-lg pointer-events-none"
      alt={title}
    />
    <div class="p-4 flex flex-col grow justify-between">
      <div>
        <h3 class="text-xl font-medium text-gray-100">
          {title}
        </h3>
        <p class="mt-1 text-gray-300">
          {description}
        </p>
      </div>

      <div>
        <div class="my-4 flex gap-2">
          {#each tags as tag}
            <span class="tag {getClassesForTag(tag)}">
              {tag}
            </span>
          {/each}
        </div>

        <ProjectCardButtons {repoLink} {demoLink} />
      </div>
    </div>
  </div>
</article>

<style lang="postcss">
  .tag {
    @apply inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold;
  }
</style>
