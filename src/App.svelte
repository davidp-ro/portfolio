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

    // Set dark mode and watch for updates in the 'prefers-color-scheme' prop.
    // Firstly checks local storage for user preference
    if (
      window.localStorage.getItem("theme") == "dark" ||
      (window.localStorage.getItem("theme") == null &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      darkMode.set(true);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        darkMode.set(e.matches);
        window.localStorage.setItem("theme", e.matches ? "dark" : "light");
      });
  });
</script>

<main class={$darkMode ? "dark" : ""} transition:fade>
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
