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
        I'm David — Founding Software Engineer building systems powering $40M+
        in monthly client revenue.
      </BlurFade>

      <BlurFade
        className="mt-6 text-muted-foreground"
        delay={baseDelay + NOMINAL_DELAY * 2}
      >
        <span>
          I specialize in production-grade backend infrastructure, booking &
          scheduling systems, and modern frontend applications, with a focus on
          scalability, reliability, performance, and product quality.
        </span>
      </BlurFade>
    </header>
  );
}
