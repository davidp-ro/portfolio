<script>
import NavbarLink from "./navbarLink.svelte";
import Section from "./section.svelte";

  let showMenu = false;

  const toggleMenu = () => {
    showMenu = !showMenu;
  };
</script>

<Section>
  <nav class="relative z-50 h-24 select-none">
    <div
      class="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2"
    >
      <div class="flex items-center justify-start w-1/4 h-full pr-4">
        <a href="/" class="inline-block py-4 md:py-0">
          <span class="p-1 text-xl font-black leading-none text-gray-900">
            <span> David Pescariu </span>
          </span>
        </a>
      </div>
      <div
        class="top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex {showMenu
          ? 'flex fixed'
          : 'hidden'}"
      >
        <div
          class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row"
        >
          <a
            href="#_"
            class="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
          >
            <span> David Pescariu </span>
          </a>
          <div
            class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center"
          >
            <NavbarLink isActive={true} href="#" text="About Me" />
            <NavbarLink isActive={false} href="#" text="My Work" />
            <NavbarLink isActive={false} href="#" text="Contact" />
          </div>
          <div
            class="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0"
          >
            <a
              href="#_"
              class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-pink-700 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-pink-600 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-pink-700"
            >
              Hire Me!
            </a>
          </div>
        </div>
      </div>
      <div
        class="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer md:hidden hover:bg-gray-200"
        on:click={toggleMenu}
      >
        {#if showMenu}
          <svg
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <svg
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </div>
    </div>
  </nav>
</Section>
