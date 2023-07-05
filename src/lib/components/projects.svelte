<script lang="ts" context="module">
  import type { ComponentProps } from "svelte";
  export type ProjectProps = ComponentProps<ProjectCard>;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import ProjectCard from "./projectCard.svelte";

  const projects: ProjectProps[] = [
    {
      title: "fling - Your Smart Dashboard",
      description: `
        This was built for the Techsylvania Genezio Challenge (& won 1st place 🎉).
        Meant to help you with day-to-day tasks - like building regexes!
      `,
      image:
        "https://raw.githubusercontent.com/davidp-ro/techsylvania_genezio_challenge/main/GithubBanner.png",
      tags: ["Web", "OpenAI"],
      repoLink: "https://github.com/davidp-ro/techsylvania_genezio_challenge",
      demoLink: "https://fling-dash.vercel.app/",
    },
    {
      title: "Event Ticket Generator",
      description: `
        Software used in the generating & validating of paper based prom tickets
        for my high school.
      `,
      image:
        "https://opengraph.githubassets.com/cce533a74934cb259dafff2fcfe11afa7baf54e9919f115780130b016a18d153/davidp-ro/LiceulBlagaCluj-JuniorProm",
      tags: ["Web", "Mobile"],
      repoLink: "https://github.com/davidp-ro/LiceulBlagaCluj-JuniorProm",
      demoLink: null,
    },
    {
      title: "Open Reports",
      description: `
        Have you ever felt unsafe while walking home? Open Reports is a platform
        built by us @ Prisma to collect data about these incidents.
      `,
      image: "https://reports.prisma-safety.com/og-image.png",
      tags: ["Web"],
      repoLink: "https://github.com/prisma-ro/prisma-open-reports",
      demoLink: "https://reports.prisma-safety.com/",
    },
    {
      title: "Self Driving Car",
      description: `
        I built a model car - (1:10 scale) that would drive itself around a small
        course, fully autonomously.
      `,
      image:
        "https://opengraph.githubassets.com/3179b7a073146aca3bb7c67240b0f13bb55955ffc6aee3883c30270e6fea50fb/davidp-ro/self-driving-car",
      tags: ["Python", "Embedded"],
      repoLink: "https://github.com/davidp-ro/LiceulBlagaCluj-JuniorProm",
      demoLink: null,
    },
    {
      title: "License Generator",
      description: `
        Small tool to generate an "OSS licenses" page for your project, following
        a given template.
      `,
      image:
        "https://opengraph.githubassets.com/38ba17e84d8ebed67425a2ffcfd12450df61039029bd3e4507b63a7892e1ffeb/prisma-ro/licenses-generator",
      tags: ["Python", "Library"],
      repoLink: "https://github.com/prisma-ro/licenses-generator",
      demoLink: null,
    },
  ];

  // --- List scrolling:

  let list: HTMLElement;
  let scrollState = { listX: 0, clientX: 0 };

  const onMouseDown = (e: MouseEvent) => {
    list.style.cursor = "grabbing";
    list.style.userSelect = "none";

    // Update the current scroll position
    scrollState = {
      listX: list.scrollLeft,
      clientX: e.clientX,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    // Update the scroll position on the list
    const dx = e.clientX - scrollState.clientX;
    list.scrollLeft = scrollState.listX - dx;
  };

  const onMouseUp = (e: MouseEvent) => {
    list.style.cursor = "grab";
    list.style.removeProperty("user-select");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  onMount(() => {
    list.addEventListener("mousedown", onMouseDown);
  });
</script>

<div
  class="flex flex-col md:flex-row overflow-x-auto no-scrollbar md:gap-8 cursor-grab"
  bind:this={list}
>
  {#each projects as project}
    <ProjectCard {...project} />
  {/each}
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
