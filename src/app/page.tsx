import BlogPosts from "@/components/BlogPosts";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NOMINAL_DELAY } from "@/lib/constants";

export default function Home() {
  return (
    <main className="h-screen w-full max-w-4xl mx-auto p-4">
      <Header baseDelay={0} />
      <Experience baseDelay={NOMINAL_DELAY * 5} />
      <BlogPosts />
      <Footer />
    </main>
  );
}
