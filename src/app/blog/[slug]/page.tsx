import "./hljs.css";

import PostContent from "@/components/PostContent";
import PostFooter from "@/components/PostFooter";
import PostHeader from "@/components/PostHeader";
import { NOMINAL_DELAY } from "@/lib/constants";
import { Post, PostData, POSTS_DIR } from "@/lib/posts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const getPostData = async (slug: string) => {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(file, "utf8");

  // Parse with gray-matter to extract the data section
  const matterResult = matter(fileContents);

  // Convert markdown to HTML and process with plugins
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

  return {
    slug,
    ...(matterResult.data as PostData),
    content: processed.toString(),
  } satisfies Post;
};

type PostPageParams = { params: { slug: string } };
export default async function PostPage({ params }: PostPageParams) {
  const post = await getPostData(params.slug);
  return (
    <main className="h-screen w-full max-w-4xl mx-auto p-4">
      <PostHeader post={post} />
      <PostContent post={post} delay={NOMINAL_DELAY * 2} />
      <PostFooter post={post} delay={NOMINAL_DELAY * 3} />
    </main>
  );
}
