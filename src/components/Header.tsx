import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import BlurFade from "./magicui/blur-fade";
import WordPullUp from "./magicui/word-pull-up";
import { NOMINAL_DELAY } from "@/lib/constants";

/** Header component with my name and some basic info */
export default function Header({ baseDelay }: { baseDelay: number }) {
  return (
    <header className="mt-36 mb-12">
      <WordPullUp
        className="text-6xl font-bold dark:text-white md:text-7xl md:leading-[5rem] text-left"
        words="Hi there! 👋"
      />
      <BlurFade
        className="mt-6 text-xl flex flex-wrap items-center gap-1"
        delay={baseDelay + NOMINAL_DELAY}
        inView
      >
        I'm David - a software engineer that strives for perfection while
        building software that scales alongside your business.
      </BlurFade>
      <BlurFade
        className="mt-6 text-muted-foreground flex flex-wrap items-center gap-1"
        delay={baseDelay + NOMINAL_DELAY * 2}
        inView
      >
        <span>
          <b>About:</b> Born and raised in beautiful Romania, I've been coding
          since I was 14.
          <span className="ml-1 hidden sm:inline">
            I have worked with everything from small microcontrollers to
            large-scale web applications, which is where I currently focus.
          </span>
          <span className="ml-1">
            I'm personally passionate about helping up-and-coming startups get
            off the ground and scale their product.
          </span>
        </span>
      </BlurFade>

      <BlurFade
        className="mt-6 text-muted-foreground flex flex-wrap items-center gap-1"
        delay={baseDelay + NOMINAL_DELAY * 3}
        inView
      >
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>🪄</span>
            <span className="ml-1 hidden sm:inline">Can I help your team?</span>
            <span className="ml-1">Let's jump on a call</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </BlurFade>
    </header>
  );
}
