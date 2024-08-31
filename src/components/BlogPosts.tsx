import { PostData, PostDataWithSlug, POSTS_DIR } from "@/lib/posts";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import BlogPostCard from "./BlogPostCard";
import BlurFade from "./magicui/blur-fade";

const getPostsDetails = () => {
  const files = fs.readdirSync(POSTS_DIR);
  const postsDetails: PostDataWithSlug[] = [];

  // Extract the data section from each markdown file
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);

    postsDetails.push({
      slug: file.replace(/\.md$/, ""),
      ...(matterResult.data as PostData),
    } satisfies PostDataWithSlug);
  }

  // Sort by the date in descending order
  postsDetails.sort((a, b) => (a.date < b.date ? 1 : -1));

  return postsDetails;
};

export default function BlogPosts() {
  const posts = getPostsDetails();

  return (
    <BlurFade className="mt-56" inView>
      <h2 className="text-lg font-medium mb-2">Blog Posts</h2>
      <section className="py-2 px-2 md:px-6 max-h-[500px] overflow-auto">
        {posts.map((post, idx) => (
          <Link key={`post-${idx}`} href={`/blog/${post.slug}`}>
            <BlogPostCard post={post} />
          </Link>
        ))}
      </section>
    </BlurFade>
  );
}
