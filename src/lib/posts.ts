import path from "path";

export interface PostData {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

export interface Post extends PostData {
  slug: string;
  content: string;
}

export const POSTS_DIR = path.join(process.cwd(), "posts");
