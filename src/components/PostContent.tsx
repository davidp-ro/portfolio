import { Post } from "@/lib/posts";
import BlurFade from "./magicui/blur-fade";

type PostContentProps = { post: Post; delay: number };
export default function PostContent({ post, delay }: PostContentProps) {
  return (
    <BlurFade delay={delay}>
      <article
        className="prose dark:prose-invert max-w-none prose-a:text-orange-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </BlurFade>
  );
}
