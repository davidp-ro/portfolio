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
          className="prose dark:prose-invert max-w-none prose-a:text-orange-600 prose-code:before:content-none prose-code:after:content-none [&_tbody_td:first-child]:ps-2 [&_tbody_td:last-child]:pe-2 [&_tfoot_td:first-child]:ps-2 [&_tfoot_td:last-child]:pe-2"
        >
          {post.content}
        </article>
      </BlurFade>
      <ArticleCodeCopy articleId={articleElementId} />
    </>
  );
}
