import "./hljs.css";

import PostContent from "@/components/PostContent";
import PostFooter from "@/components/PostFooter";
import PostHeader from "@/components/PostHeader";
import { NOMINAL_DELAY } from "@/lib/constants";
import { getPostFile, getPostsSlugs, Post, PostData } from "@/lib/posts";

import type { Element, Nodes as HastNodes, Root as HastRoot } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import matter from "gray-matter";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { rehypeMdxElements } from "rehype-mdx-elements";
import rehypeSlug from "rehype-slug";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { MDX_COMPONENTS } from "./mdxComponents";

// Tags whose direct children must never be wrapped in a <p>. remark-rehype
// wraps inline JSX (mdxJsxTextElement) siblings in a paragraph — when the
// parent's HTML content model forbids <p> as a direct child, that produces
// invalid HTML (e.g. `<table><p><caption>`, `<ul><p><li>`) and triggers
// hydration errors.
const NO_P_WRAPPER_TAGS = new Set([
  // Table structure
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  // Lists
  "ul",
  "ol",
  "dl",
]);

/**
 * Rehype transform: unwrap any <p> that is a direct child of an element
 * whose content model forbids <p> children, by replacing it with its own
 * children.
 */
const rehypeUnwrapInvalidPs = () => (tree: HastRoot) => {
  visit(tree, "element", (node: Element) => {
    if (!NO_P_WRAPPER_TAGS.has(node.tagName)) return;
    node.children = node.children.flatMap((child) =>
      child.type === "element" && child.tagName === "p"
        ? child.children
        : child,
    );
  });
};

const getPostData = async (slug: string): Promise<Post> => {
  const file = getPostFile(slug);

  // Parse with gray-matter to extract the data section
  const matterResult = matter(file.fileContents);

  // Parse markdown (+ MDX JSX) into a hast tree with MDX JSX nodes preserved
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype, {
      passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
    })
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
    .use(rehypeMdxElements)
    .use(rehypeUnwrapInvalidPs);

  const mdast = processor.parse(matterResult.content);
  const hast = (await processor.run(mdast)) as HastNodes;

  // Render the hast tree to React elements, wiring up our custom components
  const content = toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: MDX_COMPONENTS,
  });

  return {
    slug: file.slug,
    ...(matterResult.data as PostData),
    content,
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
