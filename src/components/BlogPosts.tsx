import {
  getPostFile,
  getPostsSlugs,
  PostData,
  PostDataWithSlug,
  PostsStaticReadFile,
} from "@/lib/posts";
import matter from "gray-matter";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";
import BlurFade from "./magicui/blur-fade";

const getPostsDetails = (readFiles: PostsStaticReadFile[]) => {
  const postsDetails: PostDataWithSlug[] = [];

  // Extract the data section from each markdown file
  for (const file of readFiles) {
    const matterResult = matter(file.fileContents);

    postsDetails.push({
      slug: file.slug,
      ...(matterResult.data as PostData),
    } satisfies PostDataWithSlug);
  }

  // Sort by the date in descending order
  postsDetails.sort((a, b) => (a.date < b.date ? 1 : -1));

  return postsDetails;
};

export default function BlogPosts() {
  const posts = getPostsDetails(
    getPostsSlugs().map((slug) => getPostFile(slug))
  );

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
