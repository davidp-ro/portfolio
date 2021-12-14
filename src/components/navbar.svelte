<script>
  import { darkMode } from "../stores";

  import NavbarLink from "./navbarLink.svelte";
  import Section from "./section.svelte";

  let showMenu = false;

  const toggleMenu = () => {
    showMenu = !showMenu;
  };

  const toggleDarkTheme = () => {
    darkMode.set(!$darkMode);
    window.localStorage.setItem("theme", $darkMode ? "dark" : "light");
  };
</script>

<Section>
  <nav class="relative z-50 h-24 select-none">
    <div
      class="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 dark:border-neutral-700 md:overflow-visible lg:justify-center sm:px-4 md:px-2"
    >
      <div class="flex items-center justify-start w-1/4 h-full pr-4">
        <a href="/" class="inline-block py-4 md:py-0">
          <span
            class="p-1 text-xl font-black leading-none text-gray-900 dark:text-gray-200"
          >
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
          class="flex-col w-full h-auto overflow-hidden bg-white dark:bg-neutral-900 rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row"
        >
          <a
            href="#_"
            class="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 dark:text-gray-200 md:hidden"
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
            <button
              class="inline-flex items-center w-full md:rounded-full px-6 py-3 md:mr-3 text-sm font-medium leading-4 text-white bg-gray-500 md:px-3 md:w-auto lg:px-5 hover:bg-gray-600 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-gray-700"
              on:click={toggleDarkTheme}
            >
              <!-- Icon -->
              {#if $darkMode}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="w-4 h-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m494.2 221.9-59.8-40.5 13.7-71A40.6 40.6 0 0 0 437 74c-9.6-9.5-23.2-13.7-36.2-11.1l-70.9 13.7-40.4-59.9c-15.1-22.3-51.9-22.3-67 0l-40.4 59.9-70.8-13.7A40.3 40.3 0 0 0 75 74.1a40.41 40.41 0 0 0-11.1 36.3l13.7 71-59.8 40.5C6.6 229.5 0 242 0 255.5s6.7 26 17.8 33.5l59.8 40.5-13.7 71A40.33 40.33 0 0 0 75 436.8c9.5 9.5 22.9 13.7 36.3 11.1l70.8-13.7 40.4 59.9a40.36 40.36 0 0 0 67 .1l40.4-59.9 70.9 13.7a39.9 39.9 0 0 0 36.3-11.1 40.6 40.6 0 0 0 11.1-36.3l-13.7-71 59.8-40.5a40.52 40.52 0 0 0 17.8-33.5c-.1-13.6-6.7-26.1-17.9-33.7zm-112.9 85.6 17.6 91.2-91-17.6L256 458l-51.9-77-90.9 17.6 17.6-91.2-76.8-52 76.8-52-17.6-91.2 91 17.6L256 53l51.9 76.9 91-17.6-17.6 91.1 76.8 52-76.8 52.1zM256 152c-57.3 0-104 46.7-104 104s46.7 104 104 104 104-46.7 104-104-46.7-104-104-104zm0 160c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
                  />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="w-4 h-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.13 512c78.76 0 150.99-35.8 198.85-94.78 28.27-34.83-2.56-85.72-46.25-77.4-82.35 15.69-158.27-47.26-158.27-130.79A133.1 133.1 0 0 1 340.89 93.2c38.75-22.05 29-80.8-15.02-88.92A257.94 257.94 0 0 0 279.13 0c-141.36 0-256 114.58-256 256 0 141.36 114.58 256 256 256zm0-464c12.99 0 25.7 1.2 38.02 3.48-54.76 31.16-91.7 90.04-91.7 157.55 0 113.85 103.65 199.2 215.26 177.95C402.57 433.96 344.37 464 279.14 464c-114.88 0-208-93.13-208-208s93.12-208 208-208z"
                  />
                </svg>
              {/if}
              <!-- END:Icon -->

              <span class="md:hidden ml-2">
                {#if $darkMode}
                  Switch to Light Mode
                {:else}
                  Switch to Night Mode
                {/if}
              </span>
            </button>
            <a
              href="/doc/David_Pescariu-CV.pdf"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-gradient-to-br from-pink-700 to-pink-500 hover:from-pink-600 hover:to-pink-400 md:px-3 md:w-auto md:rounded-full lg:px-5 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-pink-700"
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
