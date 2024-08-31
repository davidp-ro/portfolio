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

export async function generateMetadata({ params }: PostPageParams) {
  const post = await getPostData(params.slug);
  return {
    metadataBase: new URL("https://davidpescariu.com"),
    title: `${post.title} - David Pescariu`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "David Pescariu", url: "https://davidpescariu.com" }],
    robots: "index, follow",
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://davidpescariu.com",
      title: `${post.title} - David Pescariu`,
      description: post.description,
      siteName: "David Pescariu",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "David Pescariu - Portfolio",
        },
      ],
    },
    twitter: {
      creator: "@DPescariu",
      card: "summary_large_image",
      description: `${post.title} - David Pescariu`,
      images: [{ url: "/og.jpg", alt: "David Pescariu - Portfolio" }],
    },
  };
}
