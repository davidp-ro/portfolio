<script lang="ts">
  import Navbar from "./components/navbar.svelte";
  import Hero from "./components/hero.svelte";
  import Intro from "./components/intro.svelte";
  import Work from "./components/work.svelte";
  import Footer from "./components/footer.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { darkMode } from "./stores";

  onMount(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains("show-on-scroll-long")) {
          // Delayed animation
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animation-long");
          } else {
            entry.target.classList.remove("scroll-animation-long");
          }
        } else {
          // Normal animation
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animation");
          } else {
            entry.target.classList.remove("scroll-animation");
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback);
    const targets = [
      ...document.querySelectorAll(".show-on-scroll"),
      ...document.querySelectorAll(".show-on-scroll-long"),
    ];

    targets.forEach((target) => {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
  });
</script>

<main class="{$darkMode ? 'dark' : ''}" transition:fade>
  <Navbar />
  <Hero />
  <Intro />
  <Work />
  <Footer />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
