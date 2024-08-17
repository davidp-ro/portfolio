import { NOMINAL_DELAY } from "@/lib/constants";
import CallButton from "./CallButton";
import BlurFade from "./magicui/blur-fade";
import WordPullUp from "./magicui/word-pull-up";

/** Header component with my name and some basic info */
export default function Header({ baseDelay }: { baseDelay: number }) {
  return (
    <header className="mt-36 mb-12">
      <WordPullUp
        className="text-6xl font-bold dark:text-white md:text-7xl md:leading-[5rem] text-left"
        words="Hi there! 👋"
      />
      <BlurFade
        className="mt-6 text-xl"
        delay={baseDelay + NOMINAL_DELAY}
        inView
      >
        I'm David - a software engineer that strives for perfection while
        building software that scales alongside your business.
      </BlurFade>
      <BlurFade
        className="mt-6 text-muted-foreground"
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

      <BlurFade className="mt-6" delay={baseDelay + NOMINAL_DELAY * 3} inView>
        <CallButton />
      </BlurFade>
    </header>
  );
}
