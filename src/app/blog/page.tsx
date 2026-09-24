import { listPublishedBlogPosts } from "@/content/server";
import { BlogCollection } from "@/features/blog/blog-collection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Product Design & UX Thoughts",
  "Articles and practical thoughts on product design, useful design feedback, and solving the right user problems by Yogesh Raya.",
  "/blog",
);
export default function Page() {
  return <BlogCollection posts={listPublishedBlogPosts()} />;
}
