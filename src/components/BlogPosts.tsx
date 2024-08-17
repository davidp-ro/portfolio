import AnimatedGradientText from "./magicui/animated-gradient-text";
import BlurFade from "./magicui/blur-fade";

export default function BlogPosts() {
  return (
    <BlurFade className="mt-56" inView>
      <h2 className="text-lg font-medium mb-2">Blog Posts</h2>
      <AnimatedGradientText>
        ✨ <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
          Coming Soon - I'm working on a few articles!
        </span>
      </AnimatedGradientText>
    </BlurFade>
  );
}
