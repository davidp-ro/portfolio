import fs from "fs";
import path from "path";

export interface PostsStaticReadFile {
  slug: string;
  fileName: string;
  fileContents: string;
}

export interface PostData {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

export interface PostDataWithSlug extends PostData {
  slug: string;
}

export interface Post extends PostDataWithSlug {
  content: string;
}

export const POSTS_DIR = path.join(process.cwd(), "posts");

export const getPostsFiles = (): string[] => {
  return fs.readdirSync(POSTS_DIR);
};

export const getPostsSlugs = (): string[] => {
  console.log(
    "slugs",
    getPostsFiles().map((file) => file.replace(/\.md$/, ""))
  );
  return getPostsFiles().map((file) => file.replace(/\.md$/, ""));
};

export const getPostFile = (slug: string): PostsStaticReadFile => {
  const files = fs.readdirSync(POSTS_DIR);
  const readFiles = files.map(
    (file) =>
      ({
        slug: file.replace(/\.md$/, ""),
        fileName: file,
        fileContents: fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
      } satisfies PostsStaticReadFile)
  );
  const file = readFiles.find((file) => file.slug === slug);

  if (!file) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  return file;
};
