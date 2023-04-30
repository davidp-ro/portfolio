<script lang="ts">
  import { onMount } from "svelte";

  let el: HTMLElement;

  const registerListener = () => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      el?.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    });
  };

  onMount(() => {
    registerListener();
  });
</script>

<div aria-hidden="true" tabindex="-1" bind:this={el} class="blob" />
<div aria-hidden="true" tabindex="-1" class="blur" />

<style lang="postcss">
  /* Z-Indexes */
  .blob {
    z-index: 1;
  }

  .blur {
    z-index: 2;
  }

  /* Classes */

  .blob {
    @apply invisible md:visible h-80 w-80 opacity-30 rounded-full
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500;

    animation: scaling 5s infinite ease-in-out;
  }

  .blur {
    @apply invisible md:visible h-full w-full fixed;
    backdrop-filter: blur(5vmax);
  }

  /* Animation */

  @keyframes scaling {
    from {
      scale: 100%;
    }

    50% {
      scale: 110%;
    }

    to {
      scale: 100%;
    }
  }
</style>
