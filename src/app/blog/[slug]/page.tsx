import "./hljs.css";

import PostContent from "@/components/PostContent";
import PostFooter from "@/components/PostFooter";
import PostHeader from "@/components/PostHeader";
import { NOMINAL_DELAY } from "@/lib/constants";
import { getPostFile, getPostsSlugs, Post, PostData } from "@/lib/posts";

import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const getPostData = async (slug: string) => {
  const file = getPostFile(slug);

  // Parse with gray-matter to extract the data section
  const matterResult = matter(file.fileContents);

  // Convert markdown to HTML and process with plugins
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "prepend",
      properties: {
        ariaLabel: "Link to section",
        className: [
          "anchor-link",
          "text-muted-foreground!",
          "no-underline!",
          "mr-1.5",
          "font-normal",
          "hover:text-orange-600!",
        ],
      },
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: ["anchor-icon"],
          ariaHidden: "true",
        },
        children: [{ type: "text", value: "#" }],
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

  return {
    slug: file.slug,
    ...(matterResult.data as PostData),
    content: processed.toString(),
  } satisfies Post;
};

type PostPageParams = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params;
  const post = await getPostData(slug);
  return (
    <main className="h-screen w-full max-w-4xl mx-auto p-4">
      <PostHeader post={post} />
      <PostContent post={post} delay={NOMINAL_DELAY * 2} />
      <PostFooter post={post} delay={NOMINAL_DELAY * 3} />
    </main>
  );
}

export async function generateMetadata({ params }: PostPageParams) {
  const { slug } = await params;
  const post = await getPostData(slug);
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

export async function generateStaticParams() {
  return getPostsSlugs().map((slug) => ({ slug }));
}
