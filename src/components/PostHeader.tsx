import { NOMINAL_DELAY } from "@/lib/constants";
import { Post } from "@/lib/posts";
import Link from "next/link";
import BlurFade from "./magicui/blur-fade";

export default function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mt-24 mb-12">
      <BlurFade>
        <h1 className="font-bold text-left text-4xl md:text-5xl">
          {post.title}
        </h1>
      </BlurFade>
      <BlurFade className="mt-4" delay={NOMINAL_DELAY}>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US")}
        </time>
        ,{" "}
        <Link className="hover:underline" href="/">
          {post.author}
        </Link>
      </BlurFade>
    </header>
  );
}
