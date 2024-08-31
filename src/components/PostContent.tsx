import { Post } from "@/lib/posts";
import BlurFade from "./magicui/blur-fade";
import ArticleCodeCopy from "./ArticleCodeCopy";

type PostContentProps = { post: Post; delay: number };
export default function PostContent({ post, delay }: PostContentProps) {
  const articleElementId = Math.random().toString(36).substring(2, 12);

  return (
    <>
      <BlurFade delay={delay}>
        <article
          id={articleElementId}
          className="prose dark:prose-invert max-w-none prose-a:text-orange-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </BlurFade>
      <ArticleCodeCopy articleId={articleElementId} />
    </>
  );
}
