import { NOMINAL_DELAY } from "@/lib/constants";
import CallButton from "./CallButton";
import BlurFade from "./magicui/blur-fade";
import WordPullUp from "./magicui/word-pull-up";

/** Header component with my name and some basic info */
export default function Header({ baseDelay }: { baseDelay: number }) {
  return (
    <header className="mt-36 mb-12">
      <WordPullUp
        className="font-bold text-left text-6xl md:text-7xl"
        words="Hi there! 👋"
      />
      <BlurFade className="mt-6 text-xl" delay={baseDelay + NOMINAL_DELAY}>
        I'm David - a software engineer that strives for perfection while
        building products that scale alongside your business.
      </BlurFade>
      <BlurFade
        className="mt-6 text-muted-foreground"
        delay={baseDelay + NOMINAL_DELAY * 2}
      >
        <span>
          <b>About:</b> Born and raised in beautiful Romania, I've been coding
          since I was 13.
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

      <BlurFade className="mt-6" delay={baseDelay + NOMINAL_DELAY * 3}>
        <CallButton variant="header" />
      </BlurFade>
    </header>
  );
}
