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
        I'm David - Founding software engineer with 4+ years of experience
        working on systems that power $200M+ in monthly revenue.
      </BlurFade>
      <BlurFade
        className="mt-6 text-muted-foreground"
        delay={baseDelay + NOMINAL_DELAY * 2}
      >
        <span>
          Experienced in architecting production-grade backend infrastructure,
          booking & scheduling systems, and modern frontend applications with a
          strong focus on scalability, reliability, performance, and product
          quality.
        </span>
      </BlurFade>

      <BlurFade className="mt-6" delay={baseDelay + NOMINAL_DELAY * 3}>
        <CallButton variant="header" />
      </BlurFade>
    </header>
  );
}
