<section class="mt-32 md:mt-64">
  <div class="hero-name custom-fade-in anim-delay-100">
    Hi there! I'm David 👋
  </div>

  <div class="hero-title custom-fade-in anim-delay-500">
    I create digital products.
  </div>

  <p class="hero-subtitle custom-fade-in anim-delay-900">
    Full Stack Development & Consultancy for Startups & SMEs.
  </p>

  <p class="hero-subtitle-2 custom-fade-in anim-delay-1300">
    Eng. student, <a
      href="https://www.prisma-safety.com/"
      target="_blank"
      rel="noopener noreferer"
    >
      ex co-founder
    </a>
    & volunteer from Cluj, <span class="ro-flag">Romania</span>.
  </p>
</section>

<style lang="postcss">
  .hero-name {
    @apply font-bold uppercase sm:text-lg text-accent-300;
  }

  .hero-title {
    @apply font-serif font-bold sm:text-8xl text-6xl;
  }

  .hero-subtitle {
    @apply mt-10 font-light sm:text-2xl text-xl;
  }

  .hero-subtitle-2 {
    @apply mt-5 font-light sm:text-xl text-lg;
  }

  a {
    @apply font-normal;
  }
  a:hover {
    @apply transition-colors text-transparent bg-clip-text bg-gradient-to-r from-accent-100 to-accent-500;
  }

  .ro-flag:hover {
    @apply transition-all text-transparent;
    background: linear-gradient(
      90deg,
      rgba(239, 68, 68, 1) 0%,
      rgba(239, 68, 68, 1) 29%,
      rgba(234, 179, 8, 1) 30%,
      rgba(234, 179, 8, 1) 69%,
      rgba(59, 130, 246, 1) 70%,
      rgba(59, 130, 246, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Transitions */

  .custom-fade-in {
    animation: fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: both;
  }

  .anim-delay-100 {
    animation-delay: 100ms;
  }

  .anim-delay-500 {
    animation-delay: 500ms;
  }

  .anim-delay-900 {
    animation-delay: 900ms;
  }

  .anim-delay-1300 {
    animation-delay: 1300ms;
  }

  @keyframes fade-in-animation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100%;
    }
  }
</style>
