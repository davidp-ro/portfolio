import path from "path";

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
