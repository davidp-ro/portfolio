import { Post } from "@/lib/posts";
import BlurFade from "./magicui/blur-fade";

type PostFooterProps = { post: Post; delay: number };
export default function PostFooter({ post, delay }: PostFooterProps) {
  return (
    <>
      <BlurFade delay={delay}>
        <footer className="mt-12 text-muted-foreground">
          <p>
            <b>Tags:</b> {post.tags.join(", ")}
          </p>
          <p className="mt-12 text-center text-sm">
            &copy; {new Date().getFullYear()} David Pescariu
          </p>
        </footer>
      </BlurFade>
      <div className="h-24" />
    </>
  );
}
