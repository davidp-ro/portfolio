import { PostDataWithSlug } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function BlogPostCard({ post }: { post: PostDataWithSlug }) {
  return (
    <Card className="mb-4 group">
      <CardHeader className="pt-4 px-4">
        <CardTitle className="group-hover:underline">{post.title}</CardTitle>
        <CardDescription>
          {new Date(post.date).toLocaleDateString("en-US")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <p>{post.description}</p>
      </CardContent>
    </Card>
  );
}
